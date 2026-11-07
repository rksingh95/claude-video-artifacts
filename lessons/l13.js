L({id:'l13',n:13,title:'Export for Instagram',tool:'FFmpeg (libx264) export',os:'open',license:'FFmpeg/x264: GPL build, see lesson 2',licenseUrl:'https://ffmpeg.org/legal.html',version:'FFmpeg 9.0.2',minutes:20,status:'partial',
outcome:'You export once, with settings that pass the format check, instead of re-compressing again and again.',
verified:['The export command below is the one in our script <code>hq_export.py</code>, and the file it feeds (Reel 028 v2) passed the format check','Measured on the final file: 20.1 Mbps, 74.7 MB, 29.3 s'],
unverified:['We did not export a new file for this lesson','The quality comparison (single pass vs three generations) is our own measurement from 4 Nov 2026 and is not re-run here','Instagram re-compresses what you upload; we cannot see its result'],
sources:[['x264 encoding guide (FFmpeg wiki)','https://trac.ffmpeg.org/wiki/Encode/H.264']],
beginner:[
 {p:'Every time you compress a video, you lose some quality. The best export is one compression, at high quality, from the best source you have. In our tests, three compressions in a row looked worse than one good one.'},
 {step:['1','Run one export',null,[{prompt:['Terminal','python3 scripts/hq_export.py work/edit.mp4 exports/reel-v1.mp4']},{p:'<code>hq_export.py</code> runs FFmpeg with the settings in the next tab. Use a new name for each version (<code>reel-v1</code>, <code>reel-v2</code>) and never overwrite one you have approved.'}]]},
 {step:['2','Run the checks from lesson 12 on that exact file']},
 {step:['3','Write down the hash','A SHA-256 hash is a fingerprint of the file. If the fingerprint changes, the file changed.',[{prompt:['Terminal','shasum -a 256 exports/reel-v1.mp4 > exports/reel-v1.sha256']},{p:'Reel 028 v2 has the fingerprint <code>af40b943…e741f</code>; our QA report names it, so everyone knows which file was checked.'}]]},
 {box:['real','Real numbers','Reel 028 v2: 1080x1920, 30 fps, H.264 High profile, 20.1 Mbps video, AAC 256 kbit/s stereo at 48 kHz, 74.7 MB for 29.3 s.']},
 {box:['mistake','Common mistake','Believing a small file means a good export. File size is a result of quality settings and picture detail. We once compared an older chain (three compressions, about 6 Mbps) with one pass at CRF 13 on the slow preset (about 18 Mbps): the single pass scored about 2.8 VMAF points higher. That is our measurement on our footage, not a law.']}
],
under:[
 {p:'The FFmpeg command inside <code>hq_export.py</code>, written out:'},
 {prompt:['FFmpeg arguments','ffmpeg -i in.mp4 -vf fps=30 -c:v libx264 -crf 13 -preset slow -profile:v high -level 4.2 -bf 2 -g 15 -keyint_min 15 -sc_threshold 0 -maxrate 25M -bufsize 50M -pix_fmt yuv420p -c:a aac -b:a 256k -ar 48000 -ac 2 -map_metadata -1 -movflags +faststart out.mp4']},
 {table:[['Setting','Why'],[['<code>-crf 13 -preset slow</code>','high quality, slower encode'],['<code>-profile:v high -level 4.2</code>','a profile every phone decodes'],['<code>-g 15 -keyint_min 15 -sc_threshold 0</code>','a keyframe every 15 frames (half a second at 30 fps)'],['<code>-bf 2</code>','at most 2 B-frames in a row'],['<code>-maxrate 25M -bufsize 50M</code>','stay under a 25 Mbps ceiling'],['<code>-map_metadata -1</code>','strip metadata, including any location data'],['<code>-movflags +faststart</code>','index at the start so the file starts playing at once']]]},
 {p:'These values mirror what our <code>spec_check.py</code> verifies (lesson 12). They come from our reading of Instagram\'s help pages and API notes, not from a promise by Instagram.'}
],
carousel:[['Lesson 13','Export once, export well','FFmpeg, free and open'],['Rule','Every compression loses quality'],['Step 1','One export, one command'],['Step 2','Check that exact file'],['Step 3','Write its fingerprint'],['Full lesson','Link in bio']]});
