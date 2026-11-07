#!/usr/bin/env python3
"""caption_check.py - read-only caption timing check for a Reel (Claude Video Studio course, lessons 4 and 12).

Compares every caption in an SRT file with the word times from a speech-to-text run (for example
faster-whisper, lesson 3) and reports:
  - start offset of each caption vs the first spoken word it contains (negative = caption is EARLY)
  - the mean offset and the largest offset
  - captions shorter than --min-cue seconds (default 0.3)
  - captions faster than --max-wps words per second (default 3; a FLAG only, fast speakers trip it)

Use the word times of the EXPORTED file's audio, not the raw clip: after cutting, raw times no longer match.
WORDS.json is a list of objects with "word" (or "text"), "start" and "end" in seconds.

Usage: python3 scripts/caption_check.py captions.srt words.json [--max-offset 0.25] [--min-cue 0.3] [--max-wps 3] [--json]
Exit 0 = no caption over --max-offset and none shorter than --min-cue; 1 = at least one; 2 = bad input.
Never modifies a file. It cannot judge spelling or whether the speech-to-text times are right: confirm by eye and ear.
Stdlib only. MIT licence (see LICENSE in this repository).
"""
import argparse, json, re, sys


def secs(h, m, s, ms):
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000


def read_srt(path):
    text = open(path, encoding="utf-8-sig").read().replace("\r\n", "\n")
    cues = []
    for block in re.split(r"\n\s*\n", text.strip()):
        m = re.search(r"(\d+):(\d+):(\d+)[,.](\d+)\s*-->\s*(\d+):(\d+):(\d+)[,.](\d+)", block)
        if not m:
            continue
        after = block[m.end():].strip()
        cues.append({"start": secs(*m.groups()[:4]), "end": secs(*m.groups()[4:]), "text": " ".join(after.split())})
    return cues


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def main():
    ap = argparse.ArgumentParser(description="Read-only caption timing check: SRT vs spoken word times. Exit 1 if a caption is off by more than --max-offset or shorter than --min-cue.")
    ap.add_argument("srt", help="caption file (.srt)")
    ap.add_argument("words", help="JSON list of words with word/text, start, end (seconds)")
    ap.add_argument("--max-offset", type=float, default=0.25, help="largest allowed start offset in seconds (default 0.25)")
    ap.add_argument("--min-cue", type=float, default=0.3, help="shortest allowed caption in seconds (default 0.3)")
    ap.add_argument("--max-wps", type=float, default=3.0, help="flag captions above this many words per second (default 3)")
    ap.add_argument("--json", action="store_true", help="print the full result as JSON")
    a = ap.parse_args()
    try:
        cues = read_srt(a.srt)
        raw = json.load(open(a.words, encoding="utf-8"))
        words = [{"w": norm(str(x.get("word", x.get("text", "")))), "start": float(x["start"])} for x in raw]
        words = [w for w in words if w["w"]]
    except (OSError, ValueError, KeyError, TypeError, AttributeError) as e:
        print(f"BAD INPUT: {e}")
        sys.exit(2)
    if not cues or not words:
        print("BAD INPUT: no captions or no words found")
        sys.exit(2)

    rows, ptr = [], 0
    for i, c in enumerate(cues, 1):
        toks = [norm(t) for t in c["text"].split() if norm(t)]
        dur = c["end"] - c["start"]
        row = {"cue": i, "start": round(c["start"], 3), "dur": round(dur, 3), "text": c["text"],
               "wps": round(len(toks) / dur, 1) if dur > 0 else None, "offset": None}
        if toks:
            # first word of the caption, searched forward from the last match and within 3 s of the cue
            for j in range(ptr, len(words)):
                if words[j]["start"] > c["start"] + 3:
                    break
                if words[j]["w"] == toks[0] and words[j]["start"] >= c["start"] - 3:
                    row["offset"] = round(c["start"] - words[j]["start"], 3)
                    ptr = j + 1
                    break
        rows.append(row)

    matched = [r for r in rows if r["offset"] is not None]
    late_early = [r for r in matched if abs(r["offset"]) > a.max_offset]
    short = [r for r in rows if r["dur"] < a.min_cue]
    fast = [r for r in rows if r["wps"] and r["wps"] > a.max_wps]
    mean = sum(r["offset"] for r in matched) / len(matched) if matched else None
    worst = max(matched, key=lambda r: abs(r["offset"])) if matched else None
    res = {"captions": len(rows), "matched": len(matched),
           "mean_offset_s": round(mean, 3) if mean is not None else None,
           "largest_offset": worst, "over_max_offset": late_early, "shorter_than_min": short,
           "faster_than_max_wps": [r["cue"] for r in fast], "rows": rows}
    if a.json:
        print(json.dumps(res, indent=1))
    else:
        print(f"{a.srt}: {len(rows)} captions, {len(matched)} matched to a spoken word")
        if mean is not None:
            side = "on time" if abs(mean) < 0.01 else ("early" if mean < 0 else "late")
            print(f"mean start offset: {mean:+.2f} s ({side} on average; negative = caption before the word)")
            print(f"largest offset: {worst['offset']:+.2f} s at caption {worst['cue']} '{worst['text']}'")
        shortest = min(rows, key=lambda r: r["dur"])
        print(f"shortest caption: {shortest['dur']:.2f} s (caption {shortest['cue']} '{shortest['text']}')")
        for r in late_early:
            print(f"FAIL offset {r['offset']:+.2f} s > {a.max_offset} s: caption {r['cue']} at {r['start']:.2f} '{r['text']}'")
        for r in short:
            print(f"FAIL caption {r['cue']} lasts {r['dur']:.2f} s < {a.min_cue} s: '{r['text']}'")
        print(f"FLAG {len(fast)} of {len(rows)} captions above {a.max_wps:g} words/s (reading speed; flag only)")
        unmatched = [r["cue"] for r in rows if r["offset"] is None]
        if unmatched:
            print(f"NOT MATCHED (check by hand): captions {unmatched}")
        print("NOT CHECKED: spelling, meaning, whether the speech-to-text times are right. Look and listen.")
    sys.exit(1 if (late_early or short) else 0)


if __name__ == "__main__":
    main()
