/* UndangYa! — Engraved Highland engine. Konten dari engraved-config.js. */
(function(){
"use strict";
const C = window.ENGRAVED_CONFIG, A = C.theme.assets;
const $ = s => document.querySelector(s);
const reduced = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

/* countdown dihitung PALING AWAL agar tidak pernah tampil 0/placeholder */
const target = new Date(C.event.dateISO).getTime();
function tick(){
  let diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff/864e5), h = Math.floor(diff/36e5)%24, m2 = Math.floor(diff/6e4)%60, s = Math.floor(diff/1e3)%60;
  $("#cdD").textContent = d; $("#cdH").textContent = h; $("#cdM").textContent = m2; $("#cdS").textContent = s;
}
tick(); setInterval(tick, 1000);

/* ---------- isi konten dari config ---------- */
$("#eventTitle").textContent = C.event.title;
const namesEl = $("#names");
const nameHTML = (C.couple.groom.nick + " & " + C.couple.bride.nick).split(" ").map((word,i,arr)=>{
  if(word === "&") return '<span class="amp">&amp;</span>';
  return word.split("").map(ch=>`<span class="ch">${ch}</span>`).join("");
}).join(" ");
namesEl.innerHTML = nameHTML;
$("#datePill").textContent = C.event.dateLabel;
const guest = new URLSearchParams(location.search).get("to");
$("#guestLine").innerHTML = guest ? `Kepada Yth. Bapak/Ibu/Saudara/i<br><b>${guest.replace(/[<>&"]/g,"")}</b>` : "Kepada Yth. Bapak/Ibu/Saudara/i Tamu Undangan";
$("#verseArab").textContent = C.verse.arab;
$("#verseArti").textContent = "“" + C.verse.arti + "”";
$("#verseSrc").textContent = C.verse.sumber;
$("#greeting").textContent = C.event.greeting;
const cphoto = $("#couplePhoto"); cphoto.src = A + C.couple.photo; cphoto.alt = C.couple.photoAlt;
function person(el, p, role){
  el.innerHTML = `<p class="role">${role}</p><h3>${p.full}</h3><p>${p.parents}</p>`;
}
person($("#groomCard"), C.couple.groom, "Mempelai Pria");
person($("#brideCard"), C.couple.bride, "Mempelai Wanita");
$("#scheduleList").innerHTML = C.schedule.map(s =>
  `<div class="sched-card"><h3>${s.name}</h3><p class="time">${C.event.dateLabel} · ${s.time}</p><p>${s.note}</p></div>`).join("");
$("#venueName").textContent = C.event.venue;
$("#venueAddr").textContent = C.event.address;
$("#btnMaps").href = C.event.maps;
$("#gallery").innerHTML = C.gallery.map((g,i) =>
  `<figure data-i="${i}"><img loading="lazy" src="${A}${g.src}" alt="${g.alt}"><figcaption>${g.cap}</figcaption></figure>`).join("");
$("#giftList").innerHTML = C.gifts.map((g,i) =>
  `<div class="gift-card"><span class="gift-badge">DEMO</span><p>${g.label}</p><p class="num">${g.value}</p><button class="btn btn-ghost" data-copy="${g.value}" type="button">Salin Nomor</button></div>`).join("");
$("#closingText").textContent = C.closing;
$("#signNames").textContent = C.couple.groom.nick + " & " + C.couple.bride.nick;

/* kalender mini dari tanggal config */
(function(){
  const d = new Date(C.event.dateISO);
  const y = d.getFullYear(), m = d.getMonth(), day = d.getDate();
  const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  $("#calTitle").textContent = monthNames[m] + " " + y;
  const first = new Date(y, m, 1).getDay(), days = new Date(y, m+1, 0).getDate();
  let html = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(x=>`<b>${x}</b>`).join("");
  for(let i=0;i<first;i++) html += "<span></span>";
  for(let i=1;i<=days;i++) html += `<span class="${i===day?"mark":""}">${i}</span>`;
  $("#calGrid").innerHTML = html;
  $("#calCaption").textContent = "Lingkaran emas: " + C.event.dateLabel;
})();

/* label tanggal di atas countdown */
$("#cdDateLabel").textContent = C.event.dateLabel;

/* gerak ambien hero berhenti saat di luar layar */
(function(){
  const st = $("#stage"); if(!st || !window.IntersectionObserver) return;
  new IntersectionObserver(es => { es.forEach(e => st.classList.toggle("motion-paused", !e.isIntersecting)); }, {threshold:.04}).observe(st);
})();

/* sparkles emas halus di hero */
(function(){
  const box = $("#sparkles"); if(!box) return;
  for(let i=0;i<7;i++){
    const s = document.createElement("i");
    s.style.left = (5 + Math.random()*90) + "%"; s.style.top = (6 + Math.random()*62) + "%";
    s.style.animationDelay = (Math.random()*3.2) + "s"; box.appendChild(s);
  }
})();

/* ---------- intro timeline (storyboard referensi ±11 detik) ---------- */
let tl = null;
function finalState(){
  if(window.gsap){ gsap.set(["#world","#houseImg","#songket",".flower-bed",".garden-strip",".tree-side",".orchid",".hanging",".title-block","#eventTitle","#datePill","#guestLine","#btnOpen"], {clearProps:"all", opacity:1}); gsap.set("#introCanopy",{opacity:0}); gsap.set(".names .ch, .names .amp",{opacity:1, filter:"blur(0px)", y:0}); }
  $("#introCanopy").style.display = "none";
  $("#btnOpen").style.visibility = "visible";
}
function buildTimeline(){
  if(!window.gsap || reduced){ finalState(); return; }
  const g = gsap;
  g.set("#world", {scale:1.22, transformOrigin:"50% 42%"});
  g.set("#introCanopy", {scale:1.04, opacity:1});
  g.set("#songket", {yPercent:-105});
  g.set("#houseImg", {opacity:0, scale:.8, xPercent:-50, transformOrigin:"50% 100%"});
  g.set(".flower-bed", {opacity:0, yPercent:45, xPercent:-50});
  g.set(".garden-strip", {opacity:0, yPercent:55, xPercent:-50});
  g.set(".tree-side", {opacity:0, y:26});
  g.set(".orchid", {opacity:0, scale:.45, transformOrigin:"50% 100%"});
  g.set(".hanging", {opacity:0, y:-48});
  g.set(".title-block", {opacity:0});
  g.set("#eventTitle", {opacity:0, y:12});
  g.set(".names .ch", {opacity:0, filter:"blur(9px)", y:14});
  g.set(".names .amp", {opacity:0, scale:.4});
  g.set(["#datePill","#guestLine"], {opacity:0, y:14});
  g.set("#btnOpen", {opacity:0, y:14, visibility:"visible"});
  tl = g.timeline({defaults:{ease:"power2.out"}});
  /* 1) background muncul dulu … */
  tl.to("#introCanopy", {scale:1.7, opacity:0, duration:1.8, ease:"power1.inOut"}, 0)
    .to("#world", {scale:1, duration:2.2, ease:"power1.inOut"}, 0)
    .to("#songket", {yPercent:0, duration:.6}, 2.0)
    /* 2) … baru rumah di tengah muncul */
    .to("#houseImg", {opacity:1, scale:1, duration:1.3, ease:"power2.inOut"}, 2.2)
    /* 3) dekorasi menyusul rapat: bunga menjulur, pohon, bunga bawah, anggrek */
    .to(".hanging", {opacity:1, y:0, duration:1.0, stagger:.18, ease:"power2.inOut"}, 3.2)
    .to(".tree-side", {opacity:1, y:0, duration:.8, stagger:.15}, 3.5)
    .to(".flower-bed", {opacity:1, yPercent:0, duration:.9}, 3.7)
    .to(".garden-strip", {opacity:1, yPercent:0, duration:.9}, 3.9)
    .to(".orchid", {opacity:1, scale:1, duration:.7, stagger:.16}, 4.1)
    .to(".title-block", {opacity:1, duration:.45}, 4.35)
    .to("#eventTitle", {opacity:1, y:0, duration:.55}, 4.55)
    .to(".names .ch", {opacity:1, filter:"blur(0px)", y:0, duration:.45, stagger:.045}, 5.0)
    .to(".names .amp", {opacity:1, scale:1, duration:.4}, 5.7)
    .to("#datePill", {opacity:1, y:0, duration:.5}, 6.0)
    .to("#guestLine", {opacity:1, y:0, duration:.5}, 6.25)
    .to("#btnOpen", {opacity:1, y:0, duration:.5}, 6.5);
}
$("#btnOpen").style.visibility = "hidden";
if(document.readyState === "loading") addEventListener("DOMContentLoaded", buildTimeline); else buildTimeline();
$("#btnSkip").addEventListener("click", ()=>{ if(tl) tl.progress(1); finalState(); });
$("#btnReplay").addEventListener("click", ()=>{ $("#introCanopy").style.display=""; $("#btnOpen").style.visibility="hidden"; if(tl){ tl.restart(); } else buildTimeline(); });

/* ---------- buka undangan + musik: "Petals on the Stone Floor" — file audio bersama ---------- */
let bgm = document.getElementById("bgmShared"), musicOn = false;
function syncMusicBtn(){ $("#musicBtn").classList.toggle("playing", musicOn); }
if(bgm){
  bgm.addEventListener("play", ()=>{ musicOn = true; syncMusicBtn(); });
  bgm.addEventListener("pause", ()=>{ musicOn = false; syncMusicBtn(); });
}
function startMusic(){
  if(!bgm) return;
  const p = bgm.play(); if(p && p.catch) p.catch(()=>{});
}
function stopMusic(){ if(bgm) bgm.pause(); }
$("#musicBtn").addEventListener("click", ()=>{ if(musicOn) stopMusic(); else startMusic(); });
$("#btnOpen").addEventListener("click", ()=>{
  document.body.classList.remove("locked");
  if(!musicOn) startMusic();
  $("#content").scrollIntoView({behavior: reduced ? "auto" : "smooth"});
});

/* ---------- scroll reveal ---------- */
if(!reduced && "IntersectionObserver" in window){
  document.documentElement.classList.add("js-anim");
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ---------- lightbox ---------- */
const lb = $("#lightbox");
document.querySelectorAll("#gallery figure").forEach(f => f.addEventListener("click", ()=>{
  const g = C.gallery[+f.dataset.i]; $("#lbImg").src = A + g.src; $("#lbImg").alt = g.alt; $("#lbCap").textContent = g.cap; lb.hidden = false;
}));
$("#lbClose").addEventListener("click", ()=> lb.hidden = true);
lb.addEventListener("click", e => { if(e.target === lb) lb.hidden = true; });

/* ---------- salin nomor ---------- */
document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async ()=>{
  try{ await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "✓ Tersalin"; }
  catch(e){ b.textContent = "Gagal menyalin"; }
  setTimeout(()=> b.textContent = "Salin Nomor", 1800);
}));

/* ---------- .ics ---------- */
$("#btnIcs").addEventListener("click", ()=>{
  const d = new Date(C.event.dateISO);
  const fmt = x => x.toISOString().replace(/[-:]/g,"").split(".")[0] + "Z";
  const ics = ["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT","UID:engraved-highland@undangya","DTSTAMP:"+fmt(new Date()),"DTSTART:"+fmt(d),"DTEND:"+fmt(new Date(d.getTime()+2*36e5)),"SUMMARY:The Wedding of Fahrezzi & Meyzsa","LOCATION:"+C.event.venue,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ics], {type:"text/calendar"})); a.download = "fahrezzi-meyzsa.ics"; a.click(); URL.revokeObjectURL(a.href);
});

/* ---------- RSVP / buku tamu (demo localStorage) ---------- */
const KEY = "engraved-highland-wishes";
const esc = s => s.replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
function renderWishes(){
  let list = [];
  try{ list = JSON.parse(localStorage.getItem(KEY) || "[]"); }catch(e){}
  $("#wishes").innerHTML = list.length ? list.map(w =>
    `<div class="wish"><b>${esc(w.name)}</b> <small>· ${esc(w.attend)}</small><p>${esc(w.msg || "—")}</p></div>`).join("")
    : '<p class="demo-note" style="text-align:center">Belum ada ucapan — jadilah yang pertama.</p>';
}
renderWishes();
$("#rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#fName").value.trim();
  if(!name){ $("#formResult").textContent = "Mohon isi nama Anda."; return; }
  let list = []; try{ list = JSON.parse(localStorage.getItem(KEY) || "[]"); }catch(err){}
  list.unshift({name, attend: $("#fAttend").value, msg: $("#fMsg").value.trim()});
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  $("#formResult").textContent = "Terima kasih, ucapan Anda tersimpan (mode demo).";
  e.target.reset(); renderWishes();
});
})();

/* ===== UPGRADE B 2026-11-10: reveal bervariasi + ambient + parallax + countdown pop (aditif, tanpa menyentuh musik) ===== */
(function(){
"use strict";
var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("upg");
var variants=["left","up","zoom","right","up","zoom"],targets=[];
document.querySelectorAll("section.sec, main .sec").forEach(function(sec,si){
  Array.prototype.forEach.call(sec.children,function(el,i){
    var pos=""; try{pos=getComputedStyle(el).position;}catch(e){}
    if(pos==="absolute"||pos==="fixed"||el.tagName==="SCRIPT")return;
    el.classList.add("uv"); var vv=variants[(si+i)%variants.length]; if(el.getBoundingClientRect().width>window.innerWidth*0.85&&(vv==="left"||vv==="right")) vv=(i%2?"zoom":"up"); el.setAttribute("data-uv",vv);
    el.style.transitionDelay=Math.min(i*90,450)+"ms"; targets.push(el);
  });
});
if("IntersectionObserver" in window&&!reduced){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("uin");io.unobserve(e.target);}});},{threshold:.08});targets.forEach(function(t){io.observe(t);});}
else targets.forEach(function(t){t.classList.add("uin");});

if(!reduced){var amb=document.createElement("div");amb.className="ambient";amb.setAttribute("aria-hidden","true");
for(var i=0;i<14;i++){var s=document.createElement("i");s.style.left=(Math.random()*97)+"%";s.style.animationDuration=(9+Math.random()*10)+"s";s.style.animationDelay=(-Math.random()*14)+"s";s.style.setProperty("--sw",(Math.random()*46-23)+"px");if(i%3===0)s.className="dot";amb.appendChild(s);}
document.body.appendChild(amb);
document.addEventListener("visibilitychange",function(){document.body.classList.toggle("amb-paused",document.hidden);});}
var plx=Array.prototype.slice.call(document.querySelectorAll(".layer.house, .layer.flower-bed"));
if(plx.length&&!reduced){var ticking=false;
function upd(){ticking=false;var vh=window.innerHeight;plx.forEach(function(el,i){var r=el.getBoundingClientRect();if(r.bottom<-40||r.top>vh+40)return;var c=(r.top+r.height/2-vh/2)/vh;el.style.translate="0 "+(c*(i%2?-26:-14)).toFixed(1)+"px";});}
window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(upd);}},{passive:true});upd();}
var cd=document.querySelectorAll(".cd-box span");
if(cd.length&&"MutationObserver" in window){Array.prototype.forEach.call(cd,function(el){var last=el.textContent;new MutationObserver(function(){if(el.textContent!==last){last=el.textContent;el.classList.remove("upop");void el.offsetWidth;el.classList.add("upop");}}).observe(el,{childList:true,characterData:true,subtree:true});});}
Array.prototype.forEach.call(document.querySelectorAll("#openBtn, #btnOpen, button[type=submit]"),function(b){b.classList.add("uglow");});
})();
