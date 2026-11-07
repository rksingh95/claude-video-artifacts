L({id:'l00',n:0,title:'How Claude edits your video',tool:'The loop',os:'none',minutes:6,status:'tested',
outcome:'You know what you film, what Claude does, what gets checked, and where you say yes.',
verified:['Reel 028: 7 phone clips, 87.45 s of recording in total (ffprobe on the source clips, 7 Nov 2026), final file 29.3 s','The 76.65 s to 29.2 s edit and the -1.7 dBTP and 0.27 s failures belong to Reel 008, the edit that Reel 028 talks about (our QA files for Reel 008, linked below)','Final file measured on 7 Nov 2026: 1080x1920, 30 fps, H.264/AAC'],
unverified:['Nobody has measured whether this edit gets more views','A human listen and a phone preview are still yours to do'],
sources:[['Reel 028 export, measured with ffprobe and ffmpeg (this course, lessons 2, 9, 12)','#l12'],['Reel 008 QA, version 6 (true peak fixed, captions 0.27 s early) (private studio record)',''],['Reel 028 QA of version 1 and version 2 (private studio record)','']],
beginner:[
 {box:['why','Why this matters','If you know the loop, you know where to look when something goes wrong, and where your yes is needed. Think of Claude as a fast assistant editor: it does the cutting and measuring, you are the director who signs off.']},
 {p:'Claude does not watch a video like a person. It works with files and commands. It turns your clip into a transcript with a time for every word, decides cuts from that text, runs open-source tools to cut, caption and mix, and then measures the result with scripts. You decide what is good and what gets posted.'},
 {step:['1','You film','One clip per idea, on your phone, upright. Talk to one friend. Mistakes and pauses are fine, they get cut.']},
 {step:['2','Claude listens with a tool','A speech-to-text tool writes every word with a start and end time. Claude reads that text, not the sound. (Lesson 3)']},
 {step:['3','Claude edits with open tools','Cut, caption, motion graphics, sound. One tool per lesson. (Lessons 2 to 9)']},
 {step:['4','Claude checks, you approve','Scripts test the exact exported file. You watch and listen. Claude never posts for you. (Lessons 12 and 13)']},
 {h:'A real example'},
 {p:'Reel 028 was edited this way: seven phone clips (87.45 seconds of recording in total) became a 29.3 second Reel. Reel 028 is itself about an earlier edit: Claude cut Reel 008 from 76.65 seconds of raw clips down to 29.2 seconds.'},
 {box:['mistake','Our exports failed our own checks','Reel 008: one export peaked at -1.7 dBTP when our limit is -2.0 (fixed to -3.3), and the next had captions about 0.27 s early on average (31 of 35 captions matched). Reel 028: the first export had captions lagging the speech by 0.7 to 1.3 s between 15.3 and 19.6 s, and two words we meant to cut were still in the sound. Version 2 passed: largest caption offset 0.08 s, true peak -3.1 dBTP. Every one of these was found by measuring, not by watching once. This is why the course teaches checking, not only editing.']},
 {h:'What "great quality" means here'},
 {ul:['A clear hook in the first words','Captions you can read and that match the speech','Speech louder than music, no clipping','Anything shown as a demo really happened','A file Instagram accepts, checked by tools','A human watch and listen before posting']},
 {box:['mistake','Common mistake','Asking Claude to "make it viral". Nobody can promise that. Ask for things that can be done and measured: "cut the long pauses, add captions, keep speech at about -16 LUFS".']},
 {quiz:[['Does Claude listen to your video?','No. A speech-to-text tool turns the sound into words with times (lesson 3). Claude reads that text and measures the file with tools.'],['Who decides that a video is ready to post?','You. Scripts can show that a file passes its checks; only a person can say it is good, and Claude never posts for you.'],['Your first export fails a check. Is the workflow broken?','No, it is working. Both Reels in this course failed checks on the way. A failed check you can see is better than a problem you post.']]}
],
under:[
 {p:'Our pipeline has seven stages. The script <code>tools/video/reel_pipeline.py</code> in our private studio repo runs them in this order:'},
 {table:[['Stage','What it does','Lesson'],[['prepare','probe and normalise the source clip','2'],['transcribe','local Whisper, word timestamps','3'],['segment','person matte for background effects','5'],['render','video, captions, graphics','4, 6, 7'],['audio','voice chain, music duck, loudness','9'],['export','H.264/AAC MP4','13'],['qa','format and decode checks','12']]]},
 {out:['Final Reel 028 v2, measured with ffprobe','codec_name=h264  width=1080  height=1920  pix_fmt=yuv420p  r_frame_rate=30/1\ncodec_name=aac   sample_rate=48000  channels=2\nduration=29.333333  size=74727193 bytes  bit_rate=20380143']},
 {p:'Export target: 1080x1920, 30 fps, H.264 + AAC, yuv420p, MP4 with the index at the start (faststart). House loudness targets, which are our rules and not Instagram rules: about -16 LUFS integrated, true peak at most -2.0 dBTP.'}
],
carousel:[['Claude Video Studio','Claude can edit your video. Here is how.','Free course. Open-source tools.'],['Step 1','You film one phone clip'],['Step 2','Claude turns speech into timed words'],['Step 3','Open tools cut, caption and mix'],['Step 4','Scripts check the file. You approve.'],['Start free','Link in bio','100 Days of Practical AI']]});
