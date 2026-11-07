L({id:'l07',n:7,title:'Effects that follow your face',tool:'claude-video-effects (Vibha pack)',os:'open',license:'MIT',licenseUrl:'https://github.com/Vibha-Ramprakash/claude-video-effects',version:'upstream commit 93140a9 (vendored), 51 effects',minutes:25,status:'tested',
outcome:'You add one purposeful effect that tracks your face, check frames, and avoid fake numbers.',
verified:['Two stills rendered on 7 Nov 2026 from a real clip (images below); the effect list prints 51 effects','MIT licence text read in our copy of the repository ("Copyright (c) 2026 Vibha Ramprakash")','Our guard script accepted the plan'],
unverified:['Upstream repository URL is recorded in our provenance file; we did not re-open it online for this lesson','Full video render of an effect was not run today, only still frames (42 s for two stills on this Mac)'],
sources:[['Upstream pack (credit: Vibha Ramprakash)','https://github.com/Vibha-Ramprakash/claude-video-effects']],
beginner:[
 {p:'This free pack gives Claude 51 ready-made effects that find your face in the video and move with it: brackets that lock on, a giant word behind you, a quick punch-in on one word. It is made by Vibha Ramprakash and shared under the MIT licence. We use it with credit.'},
 {step:['1','Pick one idea, one effect','Not three. An effect should point at one thing you say.']},
 {step:['2','Write a tiny plan','A plan is a list of effects with a start and end time in seconds.',[{prompt:['plan.json','{"effects":[\n  {"fx":"locked-on","start":2.0,"end":5.0,"text":"REAL VOICE"},\n  {"fx":"backdrop-word","start":6.0,"end":9.0,"text":"CUT"}\n]}']}]]},
 {step:['3','Render still frames first','Pictures take seconds. Look before you commit to a full render.',[{prompt:['Prompt to Claude','Use the video-effects pack with this plan.json on work/clip-norm.mp4. Render still frames at 3.0 s and 7.5 s only. Show me both. Check: is my face clear, is the text readable, is every word on screen true?']}]]},
 {img:['assets/img/l07-locked-on.jpg','Face with white corner brackets around it','Real still, effect "locked-on" at 3.0 s: brackets snap onto the face.']},
 {img:['assets/img/l07-backdrop-word.jpg','The word CUT behind the head with the letter U partly hidden','Real still, effect "backdrop-word" at 7.5 s: the word sits behind the head.']},
 {box:['mistake','What we saw in these frames','In the second frame the letter U of CUT is hidden behind the head, so the word reads "C T". The brackets in the first frame appeared without the label text we asked for. Neither is a disaster, both are exactly why you look at frames. A pack gives you the mechanism, you still do the checking.']},
 {box:['check','Check it worked','Face never covered, text readable on a phone, text says only true things, one idea per effect, each effect 1.5 to 4 seconds.']}
],
under:[
 {p:'Workflow we use (from our skill file): 1. get word times, 2. write the plan, 3. run our guard script on the plan, 4. render stills and look, 5. render an 8 to 10 second preview from the real footage, 6. only then the full render, 7. independent check of the exact file.'},
 {table:[['Command','What for'],[['<code>python scripts/fx.py --list</code> (inside your clone of the pack)','prints the 51 effects (we counted 51 lines)'],['<code>fx.py --plan plan.json clip.mp4 check.png --still 3.0,7.5</code>','renders single frames to look at'],['<code>fx.py --plan plan.json clip.mp4 out.mp4</code>','renders the full video at 1080p by default']]]},
 {p:'Some effects show numbers or imitate social media screens (a fake Follow button, a fake comment bar). We rate each effect in our catalog: SAFE with your own footage and text, GUARDED if it shows a figure (needs a real value and a source), ILLUSTRATIVE if it imitates an interface (must be labelled illustrative). Our guard script (<code>tools/video/fx_guard.py</code>) rejects a plan that breaks those rules. It printed <code>OK</code> for the plan above.'},
 {p:'The pack adds no captions and no sound. Lessons 4 and 9 cover those.'}
],
carousel:[['Lesson 7','Effects that follow your face','51 free effects. MIT licence.'],['Step 1','One idea, one effect'],['Step 2','A plan is just start, end, text'],['Step 3','Render stills before the video'],['Real frame','The word hid behind my head. We caught it.'],['Full lesson','Link in bio']]});
