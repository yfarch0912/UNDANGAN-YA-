/* UndangYa! — Ivory Botanical · motion 2D: GSAP timeline sampul + IntersectionObserver.
   Tanpa GSAP / tanpa JS sekalipun, isi tetap terbaca (fallback di bawah). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var C = window.IVORY_CONFIG || {};
  var A = (C.theme && C.theme.assets) || "assets/undangya/ivory-botanical/";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- isi dari config (semua teks editable di ivory-config.js) ---------- */
  if (C.couple) {
    $("#groomNick").textContent = C.couple.groom.nick;
    $("#brideNick").textContent = C.couple.bride.nick;
    $("#heroNames").textContent = C.couple.groom.nick + " & " + C.couple.bride.nick;
    $("#groomFull").textContent = C.couple.groom.full;
    $("#groomParents").textContent = C.couple.groom.parents;
    $("#brideFull").textContent = C.couple.bride.full;
    $("#brideParents").textContent = C.couple.bride.parents;
    document.title = C.couple.groom.nick + " & " + C.couple.bride.nick + " — Ivory Botanical · UndangYa!";
  }
  if (C.event) {
    $("#coverType").textContent = C.event.type;
    $("#greetingText").textContent = C.event.greeting;
    $("#dateLabel").textContent = C.event.dateLabel;
    $("#venueName").textContent = C.event.venue;
    $("#venueAddr").textContent = C.event.address;
    $("#mapsBtn").href = C.event.maps;
    $("#closingText").textContent = C.closing || "";
    var d = new Date(C.event.dateISO);
    if (!isNaN(d)) $("#coverDate").textContent =
      String(d.getDate()).padStart(2, "0") + " · " + String(d.getMonth() + 1).padStart(2, "0") + " · " + d.getFullYear();
  }
  var sched = $("#scheduleList");
  (C.schedule || []).forEach(function (s) {
    var el = document.createElement("div"); el.className = "sched";
    el.innerHTML = "<h4></h4><p></p>";
    el.querySelector("h4").textContent = s.name;
    el.querySelector("p").textContent = s.time + " · " + s.note;
    sched.appendChild(el);
  });
  var gal = $("#gallery");
  (C.photos || []).forEach(function (p) {
    var b = document.createElement("button"); b.type = "button";
    b.setAttribute("aria-label", "Perbesar foto: " + p.alt);
    var im = document.createElement("img"); im.src = A + p.src; im.alt = p.alt; im.loading = "lazy";
    b.appendChild(im);
    b.addEventListener("click", function () { openLb(A + p.src, p.alt); });
    gal.appendChild(b);
  });
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").trim();
  if (guest) $("#guestName").textContent = guest.slice(0, 60);
  var rsvpName = $("#rsvpName"); if (guest) rsvpName.value = guest.slice(0, 60);

  /* ---------- countdown ---------- */
  var target = C.event ? new Date(C.event.dateISO).getTime() : NaN;
  function tick() {
    if (isNaN(target)) return;
    var diff = Math.max(0, target - Date.now());
    var set = function (id, v) { $(id).textContent = String(v).padStart(2, "0"); };
    set("#cd-d", Math.floor(diff / 864e5)); set("#cd-h", Math.floor(diff / 36e5) % 24);
    set("#cd-m", Math.floor(diff / 6e4) % 60); set("#cd-s", Math.floor(diff / 1e3) % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg");
  function openLb(src, alt) { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; $("#lbClose").focus(); }
  function closeLb() { lb.hidden = true; lbImg.src = ""; }
  $("#lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* ---------- RSVP demo (localStorage) ---------- */
  var KEY = "ivory-rsvp-v1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function renderWishes() {
    var w = $("#wishes"); w.innerHTML = "";
    load().slice().reverse().forEach(function (r) {
      var el = document.createElement("div"); el.className = "wish";
      el.innerHTML = "<b></b><span class='att'></span><p></p>";
      el.querySelector("b").textContent = r.name;
      el.querySelector(".att").textContent = r.attend + (r.count ? " · " + r.count + " tamu" : "");
      el.querySelector("p").textContent = r.msg || "—";
      w.appendChild(el);
    });
  }
  renderWishes();
  $("#rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = rsvpName.value.trim(), attend = $("#rsvpAttend").value;
    var err = $("#formError");
    if (!name || !attend) { err.hidden = false; return; }
    err.hidden = true;
    var list = load();
    list.push({ name: name, attend: attend, count: $("#rsvpCount").value, msg: $("#rsvpMsg").value.trim(), at: new Date().toISOString() });
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (err2) {}
    renderWishes();
    e.target.querySelector("button[type=submit]").textContent = "Terima kasih — konfirmasi tercatat (demo) ✓";
  });

  /* ---------- sampul & motion ---------- */
  var cover = $("#cover"), content = $("#content"), openBtn = $("#openBtn");
  document.body.classList.add("locked");
  var hasGsap = typeof window.gsap !== "undefined" && !reduced;
  if (hasGsap) {
    document.body.classList.add("gsap-on");
    gsap.registerPlugin(window.ScrollTrigger || {});
    var tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(".cover-bg", { scale: 1.06, opacity: .4 }, { scale: 1, opacity: 1, duration: 1.6 }, 0)
      .fromTo(".cover-flower.tl", { x: -46, y: -30, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1 }, .2)
      .fromTo(".cover-flower.br", { x: 46, y: 30, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1 }, .3)
      .to(".reveal-item", { opacity: 1, y: 0, duration: .7, stagger: .13,
          startAt: { y: 18 } }, .45)
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.1, stagger: .12, ease: "power1.inOut" }, .6);
    gsap.to(".cover-flower.tl", { y: 10, rotation: 1.4, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.6 });
    gsap.to(".cover-flower.br", { y: -10, rotation: -1.2, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });
    gsap.to(".cover-bg", { scale: 1.035, duration: 14, yoyo: true, repeat: -1, ease: "sine.inOut" });
  } else {
    document.querySelectorAll(".draw-path").forEach(function (p) { p.style.strokeDashoffset = "0"; });
  }

  openBtn.addEventListener("click", function () {
    content.hidden = false;
    document.body.classList.remove("locked");
    if (hasGsap) {
      gsap.to(cover, { opacity: 0, duration: .9, ease: "power1.inOut", onComplete: function () { cover.style.display = "none"; } });
      gsap.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9, delay: .35, ease: "power2.out" });
    } else {
      cover.style.display = "none";
    }
    window.scrollTo(0, 0);
    initReveal();
  });

  /* scroll reveal — IntersectionObserver (GSAP tidak wajib) */
  var revealInit = false;
  function initReveal() {
    if (revealInit) return; revealInit = true;
    var els = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Musik latar: file bersama Petals on the Stone Floor ---------- */
  (function () {
    var btn = $("#musicBtn");
    if (!btn) return;
    btn.title = C.musicTitle || "Musik latar";
    var audio = document.getElementById("bgmShared");
    if (!audio) { btn.style.display = "none"; return; }
    var on = false, started = false;
    function setBtn() {
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Jeda musik latar" : "Putar musik latar");
    }
    audio.addEventListener("play", function () { on = true; started = true; setBtn(); });
    audio.addEventListener("pause", function () { on = false; setBtn(); });
    function start() { try { var p = audio.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    btn.addEventListener("click", function () { if (on) audio.pause(); else start(); });
    /* mulai pada interaksi pertama tamu — pemicu buka tema ini: klik "Buka Undangan" */
    var ob = document.getElementById("openBtn");
    if (ob) ob.addEventListener("click", function () { if (!started && !on) start(); });
    document.addEventListener("pointerdown", function (e) { if (!started && !on && !btn.contains(e.target)) start(); });
  })();
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
var plx=Array.prototype.slice.call(document.querySelectorAll(".photo-flower, .hero-photo img"));
if(plx.length&&!reduced){var ticking=false;
function upd(){ticking=false;var vh=window.innerHeight;plx.forEach(function(el,i){var r=el.getBoundingClientRect();if(r.bottom<-40||r.top>vh+40)return;var c=(r.top+r.height/2-vh/2)/vh;el.style.translate="0 "+(c*(i%2?-26:-14)).toFixed(1)+"px";});}
window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(upd);}},{passive:true});upd();}
var cd=document.querySelectorAll("#cd-d, #cd-h, #cd-m, #cd-s");
if(cd.length&&"MutationObserver" in window){Array.prototype.forEach.call(cd,function(el){var last=el.textContent;new MutationObserver(function(){if(el.textContent!==last){last=el.textContent;el.classList.remove("upop");void el.offsetWidth;el.classList.add("upop");}}).observe(el,{childList:true,characterData:true,subtree:true});});}
Array.prototype.forEach.call(document.querySelectorAll("#openBtn, #btnOpen, button[type=submit]"),function(b){b.classList.add("uglow");});
})();
