#!/usr/bin/env python3
"""Check an MP4 against the Instagram Reel specs we read on Instagram's help pages and Graph API notes
(recorded 4 Nov 2026 in the studio repo's playbooks/instagram-reels-specs-validated.md; Instagram can change them). Read-only.
Usage: python3 scripts/spec_check.py <file.mp4>   (exit 1 if any FAIL, 2 if the file has no video stream)
Each line: PASS/FAIL/INFO + the source label. Things we cannot measure are listed as NOT CHECKED (never assumed).
Added 7 Nov 2026 for the course: square pixels / display shape and rotation-tag checks, because a 4:3 clip scaled with
scale=1080:1920 stores 1080x1920 pixels but DISPLAYS as 4:3 (sample aspect ratio 64:27), and passed the size check alone."""
import argparse, json, os, struct, subprocess, sys
_ap = argparse.ArgumentParser(description='Check an MP4 against Instagram CONFIRMED Reel specs. Read-only; exit 1 if any FAIL.')
_ap.add_argument('file', help='MP4 file to check')
f = _ap.parse_args().file
pr = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', f]))
v = next((s for s in pr['streams'] if s['codec_type'] == 'video'), None)
au = next((s for s in pr['streams'] if s['codec_type'] == 'audio'), None)
if v is None:
    print('FAIL no video stream found'); sys.exit(2)
fmt = pr['format']; size = os.path.getsize(f); dur = float(fmt.get('duration', 0))
res = []
def chk(name, ok, detail, src='IG help/Graph API'): res.append(('PASS' if ok else 'FAIL', name, detail, src))
chk('container mp4/mov', 'mp4' in fmt.get('format_name', ''), fmt.get('format_name'))
# moov before mdat
def atoms(path):
    out = []; 
    with open(path, 'rb') as fh:
        pos = 0; total = os.path.getsize(path)
        while pos < total and len(out) < 12:
            fh.seek(pos); h = fh.read(8)
            if len(h) < 8: break
            sz, t = struct.unpack('>I4s', h); t = t.decode('latin1')
            if sz == 1: sz = struct.unpack('>Q', fh.read(8))[0]
            if sz == 0: sz = total - pos
            out.append(t); pos += sz
    return out
at = atoms(f); chk('moov atom before mdat (faststart)', 'moov' in at and 'mdat' in at and at.index('moov') < at.index('mdat'), ' '.join(at[:6]))
chk('video codec H.264', v and v['codec_name'] == 'h264', v and v['codec_name'])
chk('profile High', v and v.get('profile') == 'High', v and v.get('profile'), 'IG help (High profile)')
chk('pixel format 4:2:0', v and v.get('pix_fmt') == 'yuv420p', v and v.get('pix_fmt'))
chk('1080x1920 (9:16)', v and (v['width'], v['height']) == (1080, 1920), v and f"{v['width']}x{v['height']}", 'IG recommends 9:16, 1080 wide; max width 1920')
sar = v.get('sample_aspect_ratio', '1:1')
chk('square pixels (stored size = shown size)', sar in ('1:1', '0:1', 'N/A'), f"SAR {sar}, displays as {v.get('display_aspect_ratio') or 'stored size'}", 'our check: 9:16 must be what players show')
rot = [sd.get('rotation') for sd in v.get('side_data_list', []) if 'rotation' in sd]
chk('no rotation tag (picture stored upright)', not any(r not in (0, None) for r in rot), f"rotation {rot[0]}" if rot else 'none', 'our check: a tag means players turn the picture')
num, den = (v['r_frame_rate'].split('/') + ['1'])[:2]; fps = float(num) / float(den)
chk('30 fps constant (>=30 per IG help, 23-60 per API)', abs(fps - 30) < 0.01 and v.get('r_frame_rate') == v.get('avg_frame_rate'), f"r={v['r_frame_rate']} avg={v.get('avg_frame_rate')}")
vbr = int(v.get('bit_rate') or 0) or (int(fmt.get('bit_rate', 0)) - int((au or {}).get('bit_rate') or 0))
chk('video bitrate <= 25 Mbps', 0 < vbr <= 25_000_000, f"{vbr/1e6:.1f} Mbps", 'Graph API VBR max 25 Mbps')
res.append(('INFO', 'video bitrate level', f"{vbr/1e6:.1f} Mbps ({'HIGH quality target >=12' if vbr >= 12e6 else 'LOW for our high-quality goal (<12 Mbps)'})", 'our measurement'))
chk('file size <= 300 MB', size <= 300 * 1024 * 1024, f"{size/1e6:.1f} MB", 'Graph API 300 MB')
chk('duration 3 s to 3 min (recommended window)', 3 <= dur <= 180, f"{dur:.1f} s", 'creators FAQ: <=3 min recommended')
chk('audio AAC', au and au['codec_name'] == 'aac', au and au['codec_name'])
if au:
    chk('audio stereo', au.get('channels') == 2, au.get('channels'))
    chk('audio 48 kHz', int(au.get('sample_rate', 0)) == 48000, au.get('sample_rate'))
    chk('audio >=128 kbps', int(au.get('bit_rate') or 0) >= 128000, f"{int(au.get('bit_rate') or 0)/1000:.0f} kbps")
# frame structure on the first ~300 frames
fr = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-read_intervals', '%+10', '-show_entries', 'frame=pict_type,key_frame', '-of', 'csv=p=0', f]).decode().split()
types = ''.join(x.split(',')[1] for x in fr); keys = [i for i, x in enumerate(fr) if x.startswith('1,')]
gaps = [b - a_ for a_, b in zip(keys, keys[1:])]
maxb = max((len(x) for x in types.replace('P', ' ').replace('I', ' ').split()), default=0)
chk('keyframe spacing <= 15 frames (closed GOP of half the frame rate; first 10 s)', bool(gaps) and max(gaps) <= 15, f"max gap {max(gaps)}" if gaps else f"only {len(keys)} keyframe(s) in the first 10 s", 'IG help')
chk('<= 2 consecutive B-frames (first 10 s)', maxb <= 2, f"max {maxb}", 'IG help')
for r in res: print(f"{r[0]:4s} {r[1]}: {r[2]}  [{r[3]}]")
print('NOT CHECKED: edit lists absent, closed-GOP flag itself, loudness (use ebur128 QA), captions, content.')
sys.exit(1 if any(r[0] == 'FAIL' for r in res) else 0)
