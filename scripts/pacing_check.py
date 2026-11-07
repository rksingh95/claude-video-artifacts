#!/usr/bin/env python3
"""pacing_check.py - read-only visual-change pacing report for a Reel MP4 (added 2026-11-05).

Measures (does not judge): visual-change events per 5 s window for the first N seconds (default 30),
the longest gap with no change event, windows flagged when the gap exceeds --max-gap (default 2.5 s),
and a motion-energy estimate (mean absolute luma difference between frames, 0-255 scale at 108x192).
Optional --srt adds caption-cue starts per window (a cue start counts as a text change, reported separately).
It is a FLAG, never an approval. LIMITS: scene detection (ffmpeg 'scene' score) misses slow zooms, small
overlays and caption changes; the default threshold is UNCALIBRATED; jump cuts that punch 100->114% can
score low. Use --threshold 0.08..0.30 to see sensitivity. Never modifies the input.
Usage: python3 scripts/pacing_check.py file.mp4 [--srt file.srt] [--seconds 30] [--max-gap 2.5]
       [--threshold 0.12] [--fps 15] [--json]
"""
import argparse, json, re, subprocess, sys

def run_scores(path, seconds, fps):
    base = ["ffmpeg", "-v", "error", "-t", str(seconds), "-i", path, "-an"]
    p1 = subprocess.run(base + ["-vf", f"fps={fps},scale=108:192,format=gray,select='gte(scene,0)',metadata=print:key=lavfi.scene_score:file=-", "-f", "null", "-"],
                        capture_output=True, text=True)
    p2 = subprocess.run(base + ["-vf", f"fps={fps},scale=108:192,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-", "-f", "null", "-"],
                        capture_output=True, text=True)
    def parse(txt, key):
        out, t = [], None
        for line in txt.splitlines():
            m = re.search(r"pts_time:([0-9.]+)", line)
            if m: t = float(m.group(1)); continue
            if key in line and t is not None:
                out.append((t, float(line.split("=")[1])))
        return out
    return parse(p1.stdout, "scene_score"), parse(p2.stdout, "YAVG")

def srt_starts(path):
    starts = []
    for m in re.finditer(r"(\d+):(\d+):(\d+)[,.](\d+)\s*-->", open(path, encoding="utf-8").read()):
        h, mi, s, ms = map(int, m.groups()); starts.append(h * 3600 + mi * 60 + s + ms / 1000)
    return starts

def main():
    ap = argparse.ArgumentParser(description="Read-only pacing report: when the picture changes and the longest still stretch. A flag, never an approval.")
    ap.add_argument("mp4", help="video to measure (never modified)"); ap.add_argument("--srt", help="optional captions: counts caption starts per 5 s window")
    ap.add_argument("--seconds", type=float, default=30, help="analyse only the first N seconds (default 30)")
    ap.add_argument("--max-gap", type=float, default=2.5, help="flag windows with a still stretch longer than this (default 2.5 s)")
    ap.add_argument("--threshold", type=float, default=0.12, help="scene-change score that counts as a change (default 0.12, uncalibrated)")
    ap.add_argument("--fps", type=int, default=15, help="frames per second analysed (default 15)"); ap.add_argument("--json", action="store_true", help="print JSON")
    a = ap.parse_args()
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.mp4],
                               capture_output=True, text=True).stdout.strip() or 0)
    end = min(a.seconds, dur)
    scores, motion = run_scores(a.mp4, end, a.fps)
    if not scores:
        print("UNAVAILABLE: no frames analysed"); sys.exit(2)
    events = []
    for t, s in scores:
        if t > 0.2 and s >= a.threshold and (not events or t - events[-1] >= 0.3):
            events.append(round(t, 2))
    caps = [c for c in (srt_starts(a.srt) if a.srt else []) if c < end]
    # gaps measured from t=0 through events to end
    pts = [0.0] + events + [end]
    gaps = [(pts[i], pts[i + 1], pts[i + 1] - pts[i]) for i in range(len(pts) - 1)]
    longest = max(gaps, key=lambda g: g[2])
    over = [(round(s, 1), round(e, 1), round(d, 1)) for s, e, d in gaps if d > a.max_gap]
    wins = []
    w = 0
    while w < end:
        w2 = min(w + 5, end)
        ev = [e for e in events if w <= e < w2]
        me = [v for t, v in motion if w <= t < w2]
        gapw = [(max(s, w), min(e, w2)) for s, e, d in gaps if e > w and s < w2]
        wg = max((b - a_ for a_, b in gapw), default=0)
        wins.append({"window": f"{w:g}-{w2:g}s", "change_events": len(ev), "longest_still_s": round(wg, 1),
                     "motion_energy": round(sum(me) / len(me), 2) if me else None,
                     "caption_cues": sum(1 for c in caps if w <= c < w2) if a.srt else None,
                     "flag": "NO-CHANGE>%gs" % a.max_gap if wg > a.max_gap else ""})
        w = w2
    res = {"file": a.mp4, "analysed_s": round(end, 1), "threshold": a.threshold, "max_gap_s": a.max_gap,
           "events": events, "first_event_s": events[0] if events else None,
           "events_first_8s": sum(1 for e in events if e < 8), "longest_still": {"from": round(longest[0], 1), "to": round(longest[1], 1), "s": round(longest[2], 1)},
           "windows": wins, "gaps_over_max": over,
           "limits": "scene score misses zooms/captions/overlays; threshold uncalibrated; flag only, never approval"}
    if a.json: print(json.dumps(res, indent=1)); return
    print(f"{a.mp4}  analysed {res['analysed_s']} s  threshold {a.threshold}  events {len(events)}  first event {res['first_event_s']}  in first 8 s: {res['events_first_8s']}")
    print(f"longest still stretch: {longest[2]:.1f} s ({longest[0]:.1f}-{longest[1]:.1f})")
    print("window      events  longest_still  motion  caps  flag")
    for x in wins:
        print(f"{x['window']:<11} {x['change_events']:>5}  {x['longest_still_s']:>11}  {str(x['motion_energy']):>6}  {str(x['caption_cues']):>4}  {x['flag']}")
    print("event times:", events)
    print("NOTE: flag only, not an approval. Misses slow zooms, captions and overlays; threshold uncalibrated.")
if __name__ == "__main__":
    main()
