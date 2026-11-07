L({id:'l00',n:0,title:'How Claude edits your video',tool:'The loop',os:'none',minutes:6,status:'tested',
outcome:'You know what you film, what Claude does, what gets checked, and where you say yes.',
verified:['The 028 numbers (7 clips, 76.65 s raw, 29.3 s final) come from our own check files','Final file measured on 7 Nov 2026: 1080x1920, 30 fps, H.264/AAC'],
unverified:['Nobody has measured whether this edit gets more views','A human listen and a phone preview are still yours to do'],
sources:[['Reel 028 export, measured with ffprobe and ffmpeg (this course, lessons 2, 9, 12)','#l12']],
beginner:[
 {p:'Claude does not watch a video like a person. It works with files and commands. It turns your clip into a transcript with a time for every word, decides cuts from that text, runs open-source tools to cut, caption and mix, and then measures the result with scripts. You decide what is good and what gets posted.'},
 {step:['1','You film','One clip per idea, on your phone, upright. Talk to one friend. Mistakes and pauses are fine, they get cut.']},
 {step:['2','Claude listens with a tool','A speech-to-text tool writes every word with a start and end time. Claude reads that text, not the sound. (Lesson 3)']},
 {step:['3','Claude edits with open tools','Cut, caption, motion graphics, sound. One tool per lesson. (Lessons 2 to 9)']},
 {step:['4','Claude checks, you approve','Scripts test the exact exported file. You watch and listen. Claude never posts for you. (Lessons 12 and 13)']},
 {h:'A real example'},
 {p:'Reel 028 was edited this way. Seven phone clips, 76.65 seconds of raw talking, became a 29.3 second Reel.'},
 {box:['mistake','The first export failed our own checks','An early export had captions that ran about 0.27 s early on average (31 of 35 captions), and the sound peaked at -1.7 dBTP when our limit is -2.0. We found both with measurements, fixed them, and the final version passed. This is why the course teaches checking, not only editing.']},
 {h:'What "great quality" means here'},
 {ul:['A clear hook in the first words','Captions you can read and that match the speech','Speech louder than music, no clipping','Anything shown as a demo really happened','A file Instagram accepts, checked by tools','A human watch and listen before posting']},
 {box:['mistake','Common mistake','Asking Claude to "make it viral". Nobody can promise that. Ask for things that can be done and measured: "cut the long pauses, add captions, keep speech at about -16 LUFS".']}
],
under:[
 {p:'Our pipeline has seven stages. The script <code>tools/video/reel_pipeline.py</code> in our own studio repo (not published yet) runs them in this order:'},
 {table:[['Stage','What it does','Lesson'],[['prepare','probe and normalise the source clip','2'],['transcribe','local Whisper, word timestamps','3'],['segment','person matte for background effects','5'],['render','video, captions, graphics','4, 6, 7'],['audio','voice chain, music duck, loudness','9'],['export','H.264/AAC MP4','13'],['qa','format and decode checks','12']]]},
 {out:['Final Reel 028 v2, measured with ffprobe','codec_name=h264  width=1080  height=1920  pix_fmt=yuv420p  r_frame_rate=30/1\ncodec_name=aac   sample_rate=48000  channels=2\nduration=29.333333  size=74727193 bytes  bit_rate=20380143']},
 {p:'Export target: 1080x1920, 30 fps, H.264 + AAC, yuv420p, MP4 with the index at the start (faststart). House loudness targets, which are our rules and not Instagram rules: about -16 LUFS integrated, true peak at most -2.0 dBTP.'}
],
carousel:[['Claude Video Studio','Claude can edit your video. Here is how.','Free course. Open-source tools.'],['Step 1','You film one phone clip'],['Step 2','Claude turns speech into timed words'],['Step 3','Open tools cut, caption and mix'],['Step 4','Scripts check the file. You approve.'],['Start free','Link in bio','100 Days of Practical AI']]});
