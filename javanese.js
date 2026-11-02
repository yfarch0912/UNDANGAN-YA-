/* UndangYa! — Javanese Illustrated · mesin animasi GSAP satu master timeline.
   Tanpa GSAP / reduced-motion: komposisi tampil FINAL (CSS default = keadaan akhir). */
(function(){
"use strict";
var C = window.JAVANESE_CONFIG, A = C.theme.assets;
var $ = function(id){ return document.getElementById(id); };

/* ---------- Isi dari config ---------- */
$("eventTitle").textContent = C.event.title;
$("brideNick").textContent = C.couple.bride.nick;
$("groomNick").textContent = C.couple.groom.nick;
$("eventDate").textContent = C.event.dateLabel;
$("greetingText").textContent = C.event.greeting;
$("bridePhoto").src = A + C.couple.bride.photo;
$("groomPhoto").src = A + C.couple.groom.photo;
$("brideFull").textContent = C.couple.bride.full;
$("brideParents").textContent = C.couple.bride.parents;
$("groomFull").textContent = C.couple.groom.full;
$("groomParents").textContent = C.couple.groom.parents;
$("venueName").textContent = C.event.venue;
$("venueAddr").textContent = C.event.address + " · " + C.event.dateLabel;
$("mapsBtn").href = C.event.maps;
$("closingText").textContent = C.event.closing || C.closing;
$("signLine").textContent = C.couple.groom.nick + " & " + C.couple.bride.nick;
$("monogram").textContent = C.couple.groom.nick.charAt(0) + " · " + C.couple.bride.nick.charAt(0);

/* Nama tamu personal dari ?to= */
var toName = new URLSearchParams(location.search).get("to");
if (toName) {
  var gl = $("guestLine");
  gl.appendChild(document.createTextNode("Kepada Yth. Bapak/Ibu/Saudara/i"));
  gl.appendChild(document.createElement("br"));
  var gb = document.createElement("b"); gb.textContent = toName; gl.appendChild(gb);
  gl.hidden = false;
}
var photo = $("couplePhoto");
photo.src = A + C.couple.photo; photo.alt = C.couple.photoAlt;
document.title = "UndangYa! — Javanese Illustrated · " + C.couple.groom.nick + " & " + C.couple.bride.nick;

$("schedList").innerHTML = C.schedule.map(function(s){
  return "<article><b>" + s.name + "</b><br>" + s.time + "<br><small>" + s.note + "</small></article>";
}).join("");

$("verseList").innerHTML = (C.verses || []).map(function(v){
  return '<article class="verse' + (v.utama ? " utama" : "") + '"><p class="arab" dir="rtl" lang="ar">' + v.arab +
    '</p><p class="arti">&ldquo;' + v.arti + '&rdquo;</p><p class="sumber">' + v.sumber + "</p></article>";
}).join("");

var gal = $("gallery");
gal.innerHTML = C.gallery.map(function(g){
  return '<button type="button"><img loading="lazy" src="' + A + g.src + '" alt="' + g.alt + '"><span class="gal-cap">' + (g.cap || "") + "</span></button>";
}).join("");
var lb = $("lightbox"), lbImg = $("lbImg");
gal.addEventListener("click", function(e){
  var b = e.target.closest("button"); if(!b) return;
  var img = b.querySelector("img"); lbImg.src = img.src; lbImg.alt = img.alt;
  lb.classList.remove("hidden"); $("lbClose").focus();
});
function closeLb(){ lb.classList.add("hidden"); }
$("lbClose").addEventListener("click", closeLb);
lb.addEventListener("click", function(e){ if(e.target === lb) closeLb(); });
document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeLb(); });

/* ---------- Countdown ---------- */
var target = new Date(C.event.dateISO).getTime();
function pad(n){ return String(n).padStart(2, "0"); }
function tick(){
  var d = Math.max(0, target - Date.now()), s = Math.floor(d / 1000);
  $("cdD").textContent = Math.floor(s / 86400);
  $("cdH").textContent = pad(Math.floor(s / 3600) % 24);
  $("cdM").textContent = pad(Math.floor(s / 60) % 60);
  $("cdS").textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);

/* ---------- Kalender mini: bulan acara, tanggal dilingkari emas ---------- */
(function(){
  var box = $("miniCal"); if (!box) return;
  var dt = new Date(C.event.dateISO), y = dt.getFullYear(), m = dt.getMonth(), day = dt.getDate();
  var months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), prev = new Date(y, m, 0).getDate();
  var rows = "", cells = [], nx = 1;
  for (var i = 0; i < first; i++) cells.push('<td class="dim">' + (prev - first + 1 + i) + "</td>");
  for (var d = 1; d <= days; d++) cells.push(d === day ? '<td><span class="d-day">' + d + "</span></td>" : "<td>" + d + "</td>");
  while (cells.length % 7) cells.push('<td class="dim">' + (nx++) + "</td>");
  for (var r = 0; r < cells.length; r += 7) rows += "<tr>" + cells.slice(r, r + 7).join("") + "</tr>";
  box.innerHTML = '<p class="cal-head">' + months[m] + " " + y + "</p>" +
    "<table><tr><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>" + rows + "</table>" +
    '<p class="cal-note">Lingkari tanggalnya — kami menanti kehadiran Anda.</p>';
})();

/* ---------- RSVP demo (localStorage) ---------- */
var KEY = "javanese-rsvp", wishes = [];
try { wishes = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e){ wishes = []; }
function renderWishes(){
  $("wishList").innerHTML = wishes.map(function(w){
    return "<li><b>" + w.nama + "</b> · " + w.hadir + (w.ucapan ? "<br>" + w.ucapan : "") + "</li>";
  }).join("");
}
function esc(t){ var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
renderWishes();
$("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();
  var f = new FormData(e.target);
  var nama = String(f.get("nama") || "").trim();
  if(!nama){ $("formMsg").textContent = "Mohon isi nama terlebih dahulu."; return; }
  wishes.unshift({ nama: esc(nama), hadir: esc(String(f.get("hadir"))), ucapan: esc(String(f.get("ucapan") || "").trim()) });
  try { localStorage.setItem(KEY, JSON.stringify(wishes)); } catch(err){}
  renderWishes(); e.target.reset();
  $("formMsg").textContent = "Matur nuwun, RSVP Anda tersimpan (demo lokal).";
});

/* ---------- Pisah huruf nama untuk reveal per-huruf ---------- */
document.querySelectorAll(".names .name").forEach(function(el){
  var txt = el.textContent; el.textContent = "";
  txt.split("").forEach(function(ch){
    var s = document.createElement("span"); s.className = "ch"; s.textContent = ch; el.appendChild(s);
  });
});

/* ---------- Master timeline GSAP ---------- */
var skipBtn = $("skipBtn"), replayBtn = $("replayBtn");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function showReplay(){ skipBtn.classList.add("hidden"); replayBtn.classList.remove("hidden"); }
if(!window.gsap || reduced){
  showReplay();
  replayBtn.addEventListener("click", function(){ window.scrollTo({ top: 0, behavior: "smooth" }); });
  return;
}
var tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: showReplay });
/* Adegan 1–2: zoom-out dunia + blur latar menghilang (0–4.6 dtk) */
tl.from("#world", { scale: 1.52, duration: 4.6, ease: "power2.inOut" }, 0)
  .fromTo("#landscapeImg", { filter: "blur(7px) brightness(1.06)" }, { filter: "blur(0px) brightness(1)", duration: 3.6 }, 0)
  .from(".cloud", { opacity: 0, duration: 1.6 }, 0.7)
  /* Adegan 2: bingkai atas masuk, ranting & lentera menggantung, kelapa meluncur */
  .from("#frameTop", { y: -80, opacity: 0, duration: 1.3 }, 1.4)
  .from(".branch", { y: -46, opacity: 0, duration: 1.1, stagger: 0.12 }, 1.8)
  .from("#vineTop", { y: -34, opacity: 0, duration: 1.0 }, 1.7)
  .from(".palm-left", { x: -70, opacity: 0, duration: 1.2 }, 2.2)
  .from(".palm-right", { x: 70, opacity: 0, duration: 1.2 }, 2.2)
  /* Adegan 3: pohon merah, semak, gunungan, bunga depan, lengkung, kabut */
  .from(".tree-red", { y: 34, opacity: 0, duration: 1, stagger: 0.12 }, 2.8)
  .from(".bush", { y: 44, opacity: 0, duration: 1, stagger: 0.12 }, 3.0)
  .from(".gunungan", { y: 100, opacity: 0, duration: 1.1, stagger: 0.12 }, 2.6)
  .from(".flowers-fg", { y: 70, opacity: 0, duration: 1.1 }, 3.3)
  .from(".arch", { y: 30, opacity: 0, duration: 1.1, stagger: 0.15 }, 3.4)
  .to("#haze", { opacity: 0.5, duration: 1.2 }, 4.6)
  /* Adegan 4: judul + nama per-huruf */
  .from("#eventTitle", { opacity: 0, y: 14, duration: 0.7 }, 5.4)
  .from(".names .ch", { opacity: 0, y: 18, filter: "blur(6px)", duration: 0.55, stagger: 0.05 }, 5.7)
  .from(".names .amp", { opacity: 0, duration: 0.5 }, 6.1)
  /* Adegan 5: potret oval */
  .from("#portrait", { opacity: 0, scale: 0.92, y: 22, duration: 1.1, ease: "power3.out" }, 6.3)
  .from("#eventDate", { opacity: 0, y: 10, duration: 0.6 }, 6.9)
  .to("#haze", { opacity: 0.22, duration: 1.2 }, 6.6)
  /* Adegan 6: denyut cahaya potret (hold dimulai; gerak mikro lain via CSS) */
  .fromTo(".portrait-glow", { opacity: 0.4 }, { opacity: 1, duration: 1.4, yoyo: true, repeat: 1 }, 7.4);

skipBtn.addEventListener("click", function(){ tl.progress(1); });
replayBtn.addEventListener("click", function(){
  replayBtn.classList.add("hidden"); skipBtn.classList.remove("hidden"); tl.restart();
});

/* ---------- Animasi gulir: section muncul bertahap saat masuk layar ---------- */
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-anim");
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".sec").forEach(function (s) { revealIO.observe(s); });
}

/* ---------- Musik latar: instrumental romantis original (sintesis WebAudio) ---------- */
(function () {
  var btn = $("musicBtn");
  if (!btn) return;
  btn.title = C.musicTitle || "Musik latar";
  var ACtor = window.AudioContext || window.webkitAudioContext;
  if (!ACtor) { btn.style.display = "none"; return; }
  var ac = null, master = null, timer = null, nextBar = 0, barIdx = 0, on = false;
  var BAR = 60 / 66 * 4; /* 66 BPM, 4/4 */
  var CH = [
    { r: "D3", c: ["D4", "F#4", "A4"] }, { r: "B2", c: ["B3", "D4", "F#4"] },
    { r: "G2", c: ["G3", "B3", "D4"] }, { r: "A2", c: ["A3", "C#4", "E4"] },
    { r: "D3", c: ["D4", "F#4", "A4"] }, { r: "B2", c: ["B3", "D4", "F#4"] },
    { r: "E3", c: ["E4", "G4", "B4"] }, { r: "A2", c: ["A3", "C#4", "E4"] }
  ];
  var MEL = [
    [["F#5", 0, 1.5], ["A5", 1.5, 1], ["F#5", 2.5, 1.5]],
    [["E5", 0, 1.5], ["F#5", 1.5, 1], ["B4", 2.5, 1.5]],
    [["D5", 0, 1], ["E5", 1, 1], ["F#5", 2, 1], ["A5", 3, 1]],
    [["G5", 0, 2], ["F#5", 2, 1], ["E5", 3, 1]],
    [["F#5", 0, 1.5], ["A5", 1.5, 1], ["B5", 2.5, 1.5]],
    [["A5", 0, 1], ["F#5", 1, 1], ["E5", 2, 1], ["D5", 3, 1]],
    [["E5", 0, 1.5], ["F#5", 1.5, 1], ["A5", 2.5, 1.5]],
    [["F#5", 0, 1], ["E5", 1, 1], ["D5", 2, 2]]
  ];
  var SEMI = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
  function fq(n) { var m = /^([A-G]#?)(\d)$/.exec(n); return 440 * Math.pow(2, (SEMI[m[1]] + (parseInt(m[2], 10) + 1) * 12 - 69) / 12); }
  function pluck(f, t, dur, peak, bright) {
    var o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(), g2 = ac.createGain();
    o.type = "triangle"; o.frequency.value = f;
    o2.type = "sine"; o2.frequency.value = f * 2; g2.gain.value = bright;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o2.start(t); o.stop(t + dur + 0.1); o2.stop(t + dur + 0.1);
  }
  function padTone(f, t, dur) {
    [-6, 6].forEach(function (det) {
      var o = ac.createOscillator(), g = ac.createGain(), fl = ac.createBiquadFilter();
      o.type = "triangle"; o.frequency.value = f; o.detune.value = det;
      fl.type = "lowpass"; fl.frequency.value = 850;
      o.connect(fl); fl.connect(g); g.connect(master);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.03, t + 0.5);
      g.gain.setValueAtTime(0.03, Math.max(t + 0.5, t + dur - 0.5));
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.1);
    });
  }
  function playBar(i, t) {
    var ch = CH[i], beat = BAR / 4;
    ch.c.forEach(function (n) { padTone(fq(n), t, BAR); });
    var bass = ac.createOscillator(), bg = ac.createGain();
    bass.type = "sine"; bass.frequency.value = fq(ch.r);
    bass.connect(bg); bg.connect(master);
    bg.gain.setValueAtTime(0.0001, t);
    bg.gain.exponentialRampToValueAtTime(0.11, t + 0.03);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + BAR * 0.95);
    bass.start(t); bass.stop(t + BAR);
    MEL[i].forEach(function (ev) { pluck(fq(ev[0]), t + ev[1] * beat, Math.max(0.5, ev[2] * beat * 0.95), 0.14, 0.22); });
    if (i % 2 === 0) {
      pluck(fq(ch.c[2]) * 2, t + 2.5 * beat, 0.5, 0.035, 0.4);
      pluck(fq(ch.c[1]) * 2, t + 3.5 * beat, 0.5, 0.03, 0.4);
    }
  }
  function schedule() {
    while (nextBar < ac.currentTime + BAR * 1.2) { playBar(barIdx % 8, nextBar); nextBar += BAR; barIdx++; }
  }
  function setBtn() {
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Jeda musik latar" : "Putar musik latar");
    btn.textContent = on ? "❚❚" : "♪";
    btn.style.fontSize = on ? ".8rem" : "1.3rem";
  }
  function start() {
    if (!ac) {
      ac = new ACtor();
      var comp = ac.createDynamicsCompressor();
      master = ac.createGain(); master.gain.value = 0;
      master.connect(comp); comp.connect(ac.destination);
      master.gain.linearRampToValueAtTime(0.9, ac.currentTime + 1.2);
      nextBar = ac.currentTime + 0.1; barIdx = 0;
      timer = setInterval(schedule, 350); schedule();
    }
    if (ac.state === "suspended") ac.resume();
    on = true; setBtn();
  }
  function pause() { if (ac) ac.suspend(); on = false; setBtn(); }
  btn.addEventListener("click", function () { if (on) pause(); else start(); });
  document.addEventListener("pointerdown", function (e) { if (!ac && e.target !== btn) start(); });
})();
})();
