#!/usr/bin/env python3
"""Single-pass HIGH-QUALITY final export for Instagram Reels (settings measured in the studio repo, playbooks/export-quality-validated.md).
Usage: python3 scripts/hq_export.py <in.mp4|mov> <out.mp4> [--crf 13] [--preset slow] [--audio-from other.mp4]
Why: measured on real footage (2026-11-04): CRF 13 slow = ~13-19 Mbps, VMAF within 0.2 of CRF 12; the old chain (CRF 15 fast -> 17 medium -> 18 fast, ~6 Mbps) scored ~2.8 VMAF lower.
Spec (CONFIRMED from Instagram help + Graph API pages, playbooks/instagram-reels-specs-validated.md): H.264 High 4:2:0 progressive, 30 fps CFR, closed GOP of 15 frames, 2 B-frames, VBR cap 25 Mbps, AAC-LC stereo 48 kHz >=128 kbps, moov first (faststart), no metadata.
Run this ONCE, from the highest-quality intermediate available (never re-encode an already-delivered file)."""
import argparse, subprocess, sys
p = argparse.ArgumentParser(description='One high-quality H.264/AAC export with the Instagram-friendly settings from lesson 13. Writes only dst; never overwrites an approved version on purpose: give each version a new name.')
p.add_argument('src', help='best-quality input (your edit master)'); p.add_argument('dst', help='new output file, e.g. exports/reel-v1.mp4')
p.add_argument('--crf', default='13', help='quality, lower = better and bigger (default 13)'); p.add_argument('--preset', default='slow', help='x264 speed preset (default slow)')
p.add_argument('--audio-from', help='take audio from this file instead of src')
a = p.parse_args()
cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', a.src]
if a.audio_from: cmd += ['-i', a.audio_from, '-map', '0:v:0', '-map', '1:a:0?']
else: cmd += ['-map', '0:v:0', '-map', '0:a:0?']
cmd += ['-vf', 'fps=30', '-c:v', 'libx264', '-crf', a.crf, '-preset', a.preset, '-profile:v', 'high', '-level', '4.2',
        '-bf', '2', '-g', '15', '-keyint_min', '15', '-sc_threshold', '0', '-maxrate', '25M', '-bufsize', '50M', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-ac', '2', '-map_metadata', '-1', '-movflags', '+faststart', a.dst]
sys.exit(subprocess.call(cmd))
