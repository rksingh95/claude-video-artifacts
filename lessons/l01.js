L({id:'l01',n:1,title:'Set up your studio',tool:'Claude Code',os:'closed',minutes:15,status:'partial',
outcome:'Claude Code runs inside one project folder and can see your video files.',
verified:['Install command, requirements and version check read from Anthropic\'s official setup page on 7 Nov 2026'],
unverified:['Windows and Linux steps were not run by us','Prices change: check the plan page yourself'],
sources:[['Claude Code setup (official docs)','https://code.claude.com/docs/en/setup']],
beginner:[
 {p:'Claude Code is the assistant that runs the open tools for you. It works inside one folder on your computer. Everything for one video lives in that folder.'},
 {box:['note','Be clear about this','Claude Code is not open source. It needs a Pro, Max, Ultra, Team or Enterprise plan, or a Console account. The free claude.ai plan does not include Claude Code. It is the one closed tool in this course. Every tool it runs in lessons 2 to 13 is open source.']},
 {step:['1','Install Claude Code','On macOS, Linux or WSL, run the native installer, then open a new terminal window and check the version.',[{prompt:['Terminal','curl -fsSL https://claude.ai/install.sh | bash'] },{prompt:['Terminal','claude --version']}]]},
 {step:['2','Sign in','Run <code>claude</code> once and follow the sign-in. You do this yourself, Claude never needs your password.']},
 {step:['3','Make one folder per video','Put your phone clip in a <code>raw</code> folder. Never edit the original.',[{prompt:['Terminal','mkdir -p my-first-reel/raw\ncd my-first-reel']}]]},
 {step:['4','Start Claude inside that folder',null,[{prompt:['Terminal','claude']}]]},
 {step:['5','Ask it to look, not change',null,[{prompt:['Prompt to Claude','List the files in this folder. Do not change or delete anything. Tell me which file is my video and its duration, resolution and orientation, and show the command you used.']}]]},
 {box:['check','Check it worked','Claude names your clip, gives a duration and says whether it is vertical, and shows the command it ran. If it only guesses, ask it to run <code>ffprobe</code> and show the output (lesson 2).']},
 {box:['mistake','Common mistake','Starting Claude in your home folder. It can then see far more than one video. Start it inside the project folder.']}
],
under:[
 {p:'Requirements from the official page: macOS 13.0 or later, or Windows 10 1809 or later. Alternatives to the native installer exist: Homebrew (casks <code>claude-code</code> for stable and <code>claude-code@latest</code>), WinGet, and npm.'},
 {prompt:['Terminal (npm route, needs Node.js 22 or later)','npm install -g @anthropic-ai/claude-code']},
 {p:'The official docs say the npm package installs the same native binary as the standalone installer. Homebrew installs do not update themselves.'},
 {h:'Rules we put in CLAUDE.md'},
 {p:'A file called <code>CLAUDE.md</code> in the project folder is read by Claude Code at the start of a session. Ours holds the rules below. Start with yours:'},
 {prompt:['CLAUDE.md','# My video studio\n- Never change files in raw/. Work on copies.\n- Name outputs reel-v1.mp4, reel-v2.mp4. Never overwrite a version.\n- Never invent a result. If you did not run it, say so.\n- Show every command you run and its output.\n- Ask before deleting, installing or posting anything.']},
 {p:'In our studio we also record a SHA-256 hash of every exported version, and move files to a <code>_to_delete</code> folder instead of deleting them.'}
],
carousel:[['Lesson 1','Set up Claude Code for video','The one closed tool. The rest are open.'],['Step 1','Install and sign in'],['Step 2','One folder per video'],['Step 3','Start Claude inside it'],['Mistake','Starting in your home folder'],['Full lesson','Link in bio','Free, open course']]});
