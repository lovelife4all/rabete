
(function(){
  var fa=function(n){return String(n).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[+d]})};
  /* منوی موبایل */
  var btn=document.getElementById("menu-btn"),menu=document.getElementById("mobile-menu");
  if(btn&&menu){btn.addEventListener("click",function(){var o=menu.hasAttribute("hidden");if(o)menu.removeAttribute("hidden");else menu.setAttribute("hidden","");btn.setAttribute("aria-expanded",o?"true":"false");});}
  /* هدر هنگام اسکرول */
  var hd=document.querySelector("header");
  if(hd){var onS=function(){hd.classList.toggle("shadow-[0_6px_24px_-12px_rgb(11_15_26/0.35)]",window.scrollY>8)};onS();window.addEventListener("scroll",onS,{passive:true});}
  /* کپی لینک */
  document.querySelectorAll("[data-copy-link]").forEach(function(b){b.addEventListener("click",function(){var t=b.textContent;navigator.clipboard&&navigator.clipboard.writeText(location.href).then(function(){b.textContent="کپی شد ✓";setTimeout(function(){b.textContent=t},1800)});});});
  /* جست‌وجوی درس‌ها (سمت مرورگر) */
  var sf=document.getElementById("lesson-search");
  if(sf){var inp=sf.querySelector("input[name=q]"),grid=document.getElementById("lesson-grid"),empty=document.getElementById("lesson-empty");
    var run=function(){var q=(inp.value||"").trim();var n=0;grid.querySelectorAll("[data-lesson]").forEach(function(c){var ok=!q||(c.getAttribute("data-search")||"").indexOf(q)>-1;c.style.display=ok?"":"none";if(ok)n++;});if(empty)empty.style.display=n?"none":"";};
    sf.addEventListener("submit",function(e){e.preventDefault();run();});inp.addEventListener("input",run);
    var u=new URL(location.href);if(u.searchParams.get("q")){inp.value=u.searchParams.get("q");run();}}
  /* موتور تست */
  var root=document.getElementById("quiz-app");if(!root)return;
  var quiz=JSON.parse(document.getElementById("quiz-data").textContent);
  var red=quiz.theme==="red",color=red?"#ef4444":"#10b981",cls=red?"red":"green";
  var total=quiz.questions.length,max=quiz.questions.reduce(function(s,q){return s+Math.max.apply(null,q.options.map(function(o){return o.score}))},0);
  var answers=[],i=0,intro=document.getElementById("quiz-intro"),app=root;
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function show(html){intro.style.display="none";app.style.display="";app.innerHTML=html;window.scrollTo({top:0,behavior:"smooth"});}
  function ask(){var q=quiz.questions[i],pct=Math.round(i/total*100);
    show('<section class="bg-brand-dark min-h-[85vh] text-white"><div class="container-x max-w-3xl py-10 sm:py-16">'+
      '<div class="flex items-center justify-between text-sm text-white/70"><button id="q-back" class="rounded-full px-3 py-1 hover:bg-white/10">→ قبلی</button><span>سؤال '+fa(i+1)+' از '+fa(total)+'</span></div>'+
      '<div class="q-bar"><div style="width:'+pct+'%;background:'+color+'"></div></div>'+
      '<h2 class="rise mt-10 text-2xl font-extrabold leading-[1.6] sm:text-3xl">'+esc(q.text)+'</h2><div class="mt-8 grid gap-3">'+
      q.options.map(function(o,idx){return '<button class="q-opt" data-i="'+idx+'"><span class="n">'+fa(idx+1)+'</span><span>'+esc(o.text)+'</span></button>'}).join("")+
      '</div><p class="mt-8 text-center text-sm text-white/50">جوابی رو انتخاب کن که «واقعیت»ه، نه اونی که دوست داری باشه.</p></div></section>');
    app.querySelector("#q-back").onclick=function(){if(i===0){app.style.display="none";intro.style.display="";}else{i--;ask();}};
    app.querySelectorAll(".q-opt").forEach(function(b){b.onclick=function(){app.querySelectorAll(".q-opt").forEach(function(x){x.disabled=true});b.classList.add("is-active",cls);
      setTimeout(function(){answers[i]=+b.getAttribute("data-i");if(i+1<total){i++;ask();}else result();},260);};});}
  function result(){var score=answers.reduce(function(s,a,idx){return s+(quiz.questions[idx].options[a]||{score:0}).score},0);
    var band=quiz.bands.filter(function(b){return score>=b.min&&score<=b.max})[0]||quiz.bands[quiz.bands.length-1];
    var pct=Math.round(score/max*100),ring={green:"#10b981",amber:"#f59e0b",red:"#ef4444"}[band.tone]||"#10b981",tone={green:"text-green",amber:"text-amber-400",red:"text-red"}[band.tone]||"";
    try{localStorage.setItem("ra_result_"+quiz.slug,JSON.stringify({score:score,max:max,band:band.title,at:Date.now()}))}catch(e){}
    show('<section class="bg-brand-dark min-h-[85vh] text-white"><div class="container-x max-w-3xl py-10 sm:py-16"><div class="text-center"><div class="text-sm font-bold text-white/70">نتیجه‌ی '+esc(quiz.title)+'</div>'+
      '<div class="q-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="12"/><circle cx="60" cy="60" r="52" fill="none" stroke="'+ring+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+(pct/100*326.7)+' 326.7"/></svg><div class="c">'+fa(score)+'<small>/'+fa(max)+'</small></div></div>'+
      '<h1 class="h2 mt-6 '+tone+'">'+esc(band.title)+'</h1><p class="mx-auto mt-3 max-w-xl text-lg leading-8 text-white/85">'+esc(band.summary)+'</p></div>'+
      '<div class="q-lock"><div class="text-sm font-extrabold text-mint">تفسیر کامل و قدم‌های بعدی</div><ul aria-hidden="true">'+band.interpretation.map(function(p){return '<li>'+esc(p)+'</li>'}).join("")+'</ul>'+
      '<div class="over"><div class="text-xl font-extrabold">تفسیر کامل مخصوص اعضاست</div><p class="mt-2 max-w-md text-sm leading-7 text-white/75">تفسیر کامل هر تست با ثبت‌نام رایگان در نسخه‌ی کامل سایت باز می‌شه. تا اون موقع، کلمه‌ی «'+esc(quiz.keyword)+'» رو زیر پست پیج کامنت کن تا دایرکتت بیاد.</p>'+
      '<div class="mt-4 flex flex-wrap justify-center gap-2"><a href="'+esc(quiz.instagram)+'" target="_blank" rel="noopener" class="btn-primary">رفتن به پیج</a><a href="'+esc(quiz.registerHref)+'" class="btn-ghost">ثبت‌نام (نسخه‌ی کامل)</a></div></div></div>'+
      '<div class="q-next"><a href="'+esc(quiz.hrefFor(band.nextStep.href))+'" class="card flex items-center justify-between gap-3 p-5 text-ink"><span><span class="block text-xs font-bold text-muted">قدم بعدی پیشنهادی</span><span class="block font-extrabold">'+esc(band.nextStep.label)+'</span></span><span class="text-green-3">←</span></a>'+
      '<a href="'+esc(quiz.consultHref)+'" class="card flex items-center justify-between gap-3 p-5 text-ink"><span><span class="block text-xs font-bold text-muted">می‌خوای درباره‌ش حرف بزنی؟</span><span class="block font-extrabold">رزرو مشاوره‌ی رایگان</span></span><span class="text-green-3">←</span></a></div>'+
      '<div class="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm"><button id="q-restart" class="btn-ghost !py-2">دوباره تست بده</button><button id="q-share" class="btn-ghost !py-2">اشتراک‌گذاری نتیجه</button></div>'+
      '<p class="mt-8 text-center text-xs leading-6 text-white/45">این تست ابزار خودشناسیه و جایگزین ارزیابی تخصصی نیست. اگه احساس ناامنی می‌کنی، با یه متخصص یا فرد مورد اعتماد صحبت کن.</p></div></section>');
    app.querySelector("#q-restart").onclick=function(){answers=[];i=0;app.style.display="none";intro.style.display="";window.scrollTo(0,0)};
    app.querySelector("#q-share").onclick=function(){var b=this,text="نتیجه‌ی من توی «"+quiz.title+"»: "+band.title+"\nتو هم امتحان کن:";
      if(navigator.share){navigator.share({title:quiz.title,text:text,url:location.href}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(text+" "+location.href).then(function(){b.textContent="کپی شد ✓";setTimeout(function(){b.textContent="اشتراک‌گذاری نتیجه"},1800)})}};}
  quiz.hrefFor=function(h){return (quiz.hrefMap&&quiz.hrefMap[h])||h};
  var start=document.getElementById("quiz-start");if(start)start.onclick=function(){i=0;answers=[];ask();};
})();
