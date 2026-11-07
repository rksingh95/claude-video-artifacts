L({id:'l14',n:14,title:'Capstone: edit one Reel start to finish',tool:'Everything in this course',os:'none',minutes:90,status:'partial',
outcome:'You take one phone clip through all the stages, with a check after each, and end with a file you can approve.',
verified:['The stage order is the one we used for Reel 028: 7 clips, 76.65 s raw, 29.3 s final, the final version passed our checks','Every command in the linked lessons is marked tested or partial on its own lesson page'],
unverified:['A beginner has not yet followed this capstone start to finish: we will test it on a first-time user before launch','Time for you: unknown. We do not know how long a beginner needs','No promise about views or followers'],
sources:[['Lessons 2 to 13 in this course','#home']],
beginner:[
 {p:'This is the whole course on one page. Do it with one short clip, 20 to 40 seconds of you talking. Each step ends with a check you can do yourself.'},
 {step:['1','Set up',null,[{ul:['Folder with <code>raw/</code> and a <code>CLAUDE.md</code> with your rules (lesson 1)','Copy your clip into <code>raw/</code>, never edit it']},{box:['check','Check','Claude names your clip and shows the ffprobe output']}]]},
 {step:['2','Straighten the clip',null,[{ul:['Normalise to 1080x1920, 30 fps (lesson 2)']},{box:['check','Check','ffprobe shows 1080x1920, 30 fps, no rotation tag, and one frame looks upright']}]]},
 {step:['3','Words and cuts',null,[{ul:['Transcribe locally (lesson 3)','Pack into phrases and find pauses, including pauses hidden inside words (lesson 8)','Ask Claude to propose cuts and show them to you before cutting']},{box:['check','Check','You approve the list of kept phrases']}]]},
 {step:['4','Captions',null,[{ul:['Make the SRT, break at phrases, burn in (lesson 4)']},{box:['check','Check','Caption starts within about 0.1 s of speech, no cue under 0.3 s, never over the face']}]]},
 {step:['5','One effect or graphic, only if it helps',null,[{ul:['One effect from lesson 7 or one scene from lesson 6','Render stills first, look at frames']},{box:['check','Check','Face clear, text readable, every word true']}]]},
 {step:['6','Sound',null,[{ul:['Clean the voice, music under it, measure (lesson 9)']},{box:['check','Check','About -16 LUFS, true peak at most -2.0 dBTP']}]]},
 {step:['7','Export and review',null,[{ul:['One export (lesson 13), then every check in lesson 12, then a hash']},{box:['check','Check','The QA report lists what you did NOT check']}]]},
 {step:['8','You decide','Watch it on your phone with sound. Listen once with headphones. You approve, or you ask for version 2. Claude never posts for you.']},
 {box:['real','What happened in our real run','An early export of Reel 028 failed two of our own checks (captions about 0.27 s early on average, sound peak -1.7 dBTP against a -2.0 limit). We fixed both and the final version passed, with the largest caption offset at 0.08 s and the peak at -3.1 dBTP. Expect your first version to fail something. That is the point of the checks.']}
],
under:[
 {p:'File layout we use per video:'},
 {prompt:['Folder layout','my-reel/\n  CLAUDE.md          your rules\n  raw/               originals, never changed\n  work/              normalised clip, WAV, transcripts, stills\n  exports/           reel-v1.mp4, reel-v1.sha256, reel-v1.srt\n  qa/                report for each exported version']},
 {p:'The full stage runner in our own studio repo (not published yet) is <code>tools/video/reel_pipeline.py</code> with the stages prepare, transcribe, segment, render, audio, export and qa. It is built for our own repository. In this course you build the same steps yourself, one lesson at a time, so you know what each does.'}
],
carousel:[['Lesson 14','Edit one Reel start to finish','The whole course in 8 steps'],['Steps 1 to 3','Set up. Straighten. Words and cuts.'],['Steps 4 to 6','Captions. One effect. Sound.'],['Steps 7 and 8','Export. Check. You decide.'],['Expect this','Version 1 will fail something'],['Start free','Link in bio']]});
