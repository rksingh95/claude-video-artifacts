(function(){
var C=window.COURSE; C.lessons.sort(function(a,b){return a.n-b.n});
var DONE={}; try{DONE=JSON.parse(localStorage.getItem('cvs-done')||'{}')}catch(e){}
function save(){try{localStorage.setItem('cvs-done',JSON.stringify(DONE))}catch(e){}}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
var STATUS={tested:['tested','Run and checked on 7 Nov 2026'],partial:['partial','Partly run, see "Not verified"'],pending:['pending','Docs-checked, our run still pending']};
function badge(l){
  if(l.os==='open') return '<span class="pill os">open source · '+esc(l.license||'')+'</span>';
  if(l.os==='closed') return '<span class="pill closed">closed source · paid plan</span>';
  return '<span class="pill">no tool</span>';
}
function status(l){return ''}
function block(b){
  if(b.p) return '<p>'+b.p+'</p>';
  if(b.h) return '<h2 style="margin-top:28px">'+b.h+'</h2>';
  if(b.img) return '<figure style="margin:0 0 16px"><img src="'+b.img[0]+'" alt="'+b.img[1]+'" style="border-radius:10px;max-width:240px"><figcaption style="font-size:13px;color:var(--muted)">'+b.img[2]+'</figcaption></figure>';
  if(b.ul) return '<ul class="list">'+b.ul.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>';
  if(b.prompt) return '<div class="prompt"><span class="tag">'+b.prompt[0]+'</span><button type="button" data-copy="'+encodeURIComponent(b.prompt[1])+'">Copy</button><pre>'+esc(b.prompt[1])+'</pre></div>';
  if(b.out) return '<div class="out"><span class="tag">'+b.out[0]+'</span><pre>'+esc(b.out[1])+'</pre></div>';
  if(b.step) return '<div class="step"><div class="num">'+b.step[0]+'</div><div><h3>'+b.step[1]+'</h3>'+(b.step[2]?'<p>'+b.step[2]+'</p>':'')+(b.step[3]||[]).map(block).join('')+'</div></div>';
  if(b.box) return '<div class="box '+b.box[0]+'"><div class="lab">'+b.box[1]+'</div>'+b.box[2]+'</div>';
  if(b.quiz) return '<div class="box quiz"><div class="lab">Check yourself</div>'+b.quiz.map(function(q){return '<details><summary>'+q[0]+'</summary><p>'+q[1]+'</p></details>'}).join('')+'</div>';
  if(b.table) return '<div class="box"><div class="scroll"><table class="t"><tr>'+b.table[0].map(function(h){return '<th>'+h+'</th>'}).join('')+'</tr>'+b.table[1].map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</table></div></div>';
  return '';
}
function slides(arr){return '<h2 class="car-title">Instagram carousel for this lesson</h2><div class="strip">'+arr.map(function(s,i){return '<div class="slide'+(i===0?' hot':'')+'"><div class="k">'+s[0]+'</div><div><div class="big">'+s[1]+'</div>'+(s[2]?'<div class="sm" style="margin-top:8px">'+s[2]+'</div>':'')+'</div><div class="pg">'+(i+1)+' / '+arr.length+'</div></div>'}).join('')+'</div>'}
function home(){
  var tools=C.lessons.filter(function(l){return l.os==='open'}).length;
  return '<h1>Edit videos with Claude. Free.</h1>'+
  '<p class="lede">You film on your phone. Claude uses open-source tools to cut, caption, add motion graphics, mix the sound and check the file. You approve every step. Nothing here promises views or followers.</p>'+
  '<div class="stats"><span class="pill">'+C.lessons.length+' lessons</span><span class="pill os">'+tools+' open-source lessons</span><span class="pill">1 carousel per lesson</span><span class="pill">Beginner + Under the hood</span></div>'+
  '<div class="box" style="margin-bottom:24px"><div class="lab">Be clear about what is open</div>Every editing tool in lessons 2 to 13 is open source, and each lesson links its licence. Claude (the assistant that drives them) is not open source and needs a paid plan or API account. Nothing else in the course costs money.</div>'+
  '<div class="map">'+C.lessons.map(function(l){
    return '<a class="card live" href="#'+l.id+'"><div class="n"><span>Lesson '+l.n+' · '+l.minutes+' min</span>'+(DONE[l.id]?'<span class="pill os">done</span>':status(l))+'</div><h3>'+l.title+'</h3><div class="tool">'+l.tool+'</div>'+badge(l)+'</a>'}).join('')+'</div>'+
  '<div class="how"><div><b>You film</b><p>Phone clip, your face, your voice. Claude never invents footage.</p></div><div><b>Claude edits</b><p>Open tools on your laptop. Every command is shown.</p></div><div><b>Claude checks</b><p>Format, loudness and caption timing are measured on the exact file.</p></div><div><b>You approve</b><p>Nothing is posted without you.</p></div></div>'
}
function view(l){
  var tab=(location.hash.indexOf('-under')>-1)?'under':'beginner';
  var i=C.lessons.indexOf(l), prev=C.lessons[i-1], next=C.lessons[i+1];
  var chk=['Read the lesson','Ran the prompt or command myself','Checked the result'];
  var side='<div class="box"><div class="lab">Your progress</div>'+chk.map(function(c,k){var key=l.id+'-c'+k;return '<label><input type="checkbox" data-chk="'+key+'" '+(DONE[key]?'checked':'')+'> '+c+'</label>'}).join('')+'</div>'+
   '<div class="box"><div class="lab">Open-source status</div>'+badge(l)+(l.version?'<p style="font-size:13px;color:var(--muted);margin:8px 0 0">Version used: '+l.version+'</p>':'')+(l.licenseUrl?'<p style="font-size:13px;margin:4px 0 0"><a href="'+l.licenseUrl+'" target="_blank" rel="noopener">Licence file</a></p>':'')+'</div>'+
   '<div class="box"><div class="lab">Verified</div><ul class="vlist">'+(l.verified||[]).map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><div class="lab" style="margin-top:10px">Not verified</div><ul class="vlist">'+(l.unverified||[]).map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>';
  return '<div class="crumb"><a href="#home">Course</a> / Lesson '+l.n+'</div>'+
  '<div class="lesson-head"><div class="meta">'+badge(l)+status(l)+'<span class="pill">'+l.minutes+' min</span><span class="pill">Tool: '+l.tool+'</span></div><h1>'+l.title+'</h1><p class="lede">Outcome: '+l.outcome+'</p><div class="meta"><button type="button" id="shareBtn">Copy share link</button><button type="button" id="doneBtn">'+(DONE[l.id]?'Marked done':'Mark as done')+'</button></div></div>'+
  '<div class="tabs" role="tablist"><button role="tab" type="button" data-tab="beginner" aria-selected="'+(tab==='beginner')+'">Beginner</button><button role="tab" type="button" data-tab="under" aria-selected="'+(tab==='under')+'">Under the hood</button></div>'+
  '<div class="grid2"><div>'+(tab==='beginner'?l.beginner:l.under).map(block).join('')+'<div class="box srcs"><div class="lab">Sources</div><ul class="vlist">'+(l.sources||[]).map(function(s){return '<li><a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a></li>'}).join('')+'</ul></div></div><aside class="side">'+side+'</aside></div>'+
  slides(l.carousel)+
  '<div class="nav">'+(prev?'<a class="btn" href="#'+prev.id+'">← '+prev.title+'</a>':'<span></span>')+(next?'<a class="btn primary" href="#'+next.id+'">'+next.title+' →</a>':'')+'</div>'
}
function render(){
  var id=(location.hash||'#home').slice(1).split('-')[0];
  var l=C.lessons.filter(function(x){return x.id===id})[0];
  document.getElementById('app').innerHTML=l?view(l):home();
  var n=C.lessons.filter(function(x){return DONE[x.id]}).length;
  document.getElementById('prog').textContent=n+' / '+C.lessons.length+' done';
  document.title=(l?l.title+' · ':'')+'Claude Video Studio';
  window.scrollTo(0,0);
}
document.getElementById('foot').innerHTML='Free and open. Made by '+C.author+'. <a href="https://www.youtube.com/@practicetogetheral" target="_blank" rel="noopener">YouTube</a> · <a href="https://www.instagram.com/imsikarwar.rahul/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/rahulsankrit/" target="_blank" rel="noopener">Facebook</a>. Commands were run on a Mac in November 2026. Each lesson\'s "Verified" and "Not verified" lists say exactly what we ran and what we did not. Last updated '+C.updated+'.';
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.hidden=false;setTimeout(function(){t.hidden=true},1600)}
function copy(text,msg){
  function fb(){var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast(msg)}catch(e){toast('Select and copy manually')}ta.remove()}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){toast(msg)},fb)}else fb()
}
document.addEventListener('click',function(e){
  var b=e.target.closest('button'); if(!b) return;
  var id=(location.hash||'').slice(1).split('-')[0];
  if(b.dataset.copy) copy(decodeURIComponent(b.dataset.copy),'Copied');
  else if(b.id==='shareBtn') copy(location.href,'Link copied');
  else if(b.id==='doneBtn'){DONE[id]=!DONE[id];save();render()}
  else if(b.dataset.tab){location.hash=id+(b.dataset.tab==='under'?'-under':'')}
  else if(b.id==='themeBtn'){var r=document.documentElement;var dark=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);r.setAttribute('data-theme',dark?'light':'dark')}
});
document.addEventListener('change',function(e){var k=e.target.dataset&&e.target.dataset.chk;if(k){DONE[k]=e.target.checked;save()}});
window.addEventListener('hashchange',render);
render();
})();
