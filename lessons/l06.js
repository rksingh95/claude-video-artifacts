L({id:'l06',n:6,title:'Motion graphics from plain HTML',tool:'HyperFrames',os:'open',license:'Apache-2.0',licenseUrl:'https://github.com/heygen-com/hyperframes/blob/main/LICENSE',version:'latest on npm: 0.9.20. Our tests: 0.9.9 to 0.9.13',minutes:30,status:'partial',
outcome:'You understand how a web page becomes a video, what rules keep it from breaking, and how to check it before you render.',
verified:['Licence: Apache-2.0 (LICENSE file and npm metadata read on 7 Nov 2026)','Rules, flags and block names below come from our own lab notes and the tool\'s documentation, tested on versions 0.9.9 to 0.9.13'],
unverified:['We have not re-run HyperFrames on the newest version (0.9.20) for this lesson','HDR iPhone clips and Docker renders were never tested','Some catalog blocks were only listed, not rendered; the table says which'],
sources:[['HyperFrames on GitHub','https://github.com/heygen-com/hyperframes'],['HyperFrames docs','https://hyperframes.heygen.com']],
beginner:[
 {p:'HyperFrames turns a web page into a video. You describe what appears and when in HTML and CSS, an animation library moves things, and HyperFrames records every frame to an MP4. Claude can write that HTML for you. You review pictures, not code.'},
 {step:['1','Describe the scene to Claude','Say what appears, when, and the exact words. Real numbers only.',[{prompt:['Prompt to Claude','Use HyperFrames to make a 1080x1920 portrait scene, 6 seconds, 30 fps. A big headline "77 SECONDS" slams in at 0.3 s, then "29" at 2.0 s. Do not invent any number: use only these two. Lint it, take a snapshot frame at 1 s and 3 s, show me both, and do not render until I say yes.']}]]},
 {step:['2','Look at frames before you render','HyperFrames can write single frames. That is faster than rendering the whole video, and it catches most problems.']},
 {step:['3','Render, then check the file','Rendering writes the MP4. Lesson 12 shows how to check the result.']},
 {box:['check','Check it worked','You can read every word at phone size, nothing overlaps a face, and the file is 1080x1920 at 30 fps. Look at frames, not only the lint result.']},
 {box:['mistake','Common mistake','Using an illustrated Claude chat screen as proof. HyperFrames has a ready-made chat-screen block. It looks great, and it is an illustration. Never present it as a real AI answer. Our rule: real screen recordings for results, blocks for decoration only.']},
 {h:'Ready-made pieces'},
 {p:'HyperFrames ships a catalog of about 450 blocks and components (we counted 448). You install one with <code>npx hyperframes add &lt;name&gt;</code> and search with <code>npx hyperframes catalog --query "..."</code>. What we actually tested:'}
 ,{table:[['Piece','Our result'],[['<code>claude-exchange</code> (chat screen)','Rendered, looked good. Must override every default text. Illustration only'],['<code>headline-slam</code>','Works, but renders small in portrait (about 60 px): edit the font size'],['<code>count-up</code>','Works; its colour came out pure blue, edit the colour in the file'],['<code>caption-pill-karaoke</code>','Works after we ported it to word-synced timing'],['<code>device-frame-stage</code>','Phone frame with an empty white screen: needs your own screen content'],['<code>whip-pan-cut</code>, <code>camera-shake</code>, <code>grain-overlay</code>, lower thirds','Installed or listed only, not rendered by us']]]}
],
under:[
 {h:'The contract (from the docs, tested in our lab)'},
 {ul:['Every timed element has <code>class="clip"</code>, <code>data-start</code> and <code>data-duration</code> in seconds','One paused animation timeline per composition, registered as <code>window.__timelines["your-id"] = tl</code>','No <code>Date.now()</code>, no unseeded <code>Math.random()</code>, no network fetches, no endless repeats: renders must be the same every time','Silent video clips need <code>muted</code>; a clip with sound needs <code>data-has-audio="true"</code>; every <code>&lt;audio&gt;</code> needs an <code>id</code>','Time a video or its wrapper, never both (the linter reports <code>video_nested_in_timed_element</code>)']},
 {h:'Commands we used'},
 {table:[['Command','What for'],[['<code>npx hyperframes init --resolution portrait</code>','new 1080x1920 project'],['<code>npx hyperframes lint</code>','check the rules above'],['<code>npx hyperframes snapshot</code>','write single frames to look at'],['<code>npx hyperframes render ...</code>','write the MP4']]]},
 {box:['note','Syntax trap','The CLI needs <code>--flag=value</code>, not <code>--flag value</code>. In our test <code>--quality draft</code> was rejected.']},
 {h:'Delivery settings that passed our Instagram spec check'},
 {prompt:['Terminal','npx hyperframes render --crf=12 --keyframe-interval=0.5 --max-bitrate=25M -o out.mp4']},
 {p:'Never use <code>--quality=draft</code> for the file you deliver. Cloud rendering is a paid HeyGen feature and is not part of this course: everything renders on your own computer. HyperFrames is open source under Apache-2.0; the cloud features around it are separate.'},
 {p:'Pending: a fresh install and render on the newest version, so every command above is re-confirmed. Until then this lesson is marked partial.'}
],
carousel:[['Lesson 6','A web page becomes your video','HyperFrames, free and open (Apache-2.0)'],['Idea','HTML + animation = frames = MP4'],['Step 1','Describe the scene, exact words only'],['Step 2','Look at frames before rendering'],['Mistake','A pretty chat screen is not proof'],['Full lesson','Link in bio']]});
