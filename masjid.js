/* UndangYa! — Masjid Bunga · mesin animasi GSAP satu master timeline.
   Urutan mengikuti video referensi (zoom-out → bingkai & flora mekar → teks),
   dipadatkan ±9,5 dtk dan BERHENTI di komposisi final (loop video dibuang).
   Tanpa GSAP / reduced-motion: komposisi tampil FINAL (CSS default = keadaan akhir). */
(function(){
"use strict";
var C = window.MASJID_CONFIG, A = C.theme.assets;
var $ = function(id){ return document.getElementById(id); };
function esc(t){ var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

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
$("closingText").textContent = C.closing;
$("signLine").textContent = C.couple.bride.nick + " & " + C.couple.groom.nick;
$("monogram").textContent = C.couple.bride.nick.charAt(0) + " · " + C.couple.groom.nick.charAt(0);
var photo = $("couplePhoto");
photo.src = A + C.couple.photo; photo.alt = C.couple.photoAlt;
document.title = "UndangYa! — Masjid Bunga · " + C.couple.bride.nick + " & " + C.couple.groom.nick;

/* Nama tamu personal dari ?to= */
var toName = new URLSearchParams(location.search).get("to");
if (toName) {
  var gl = $("guestLine");
  gl.appendChild(document.createTextNode("Kepada Yth. Bapak/Ibu/Saudara/i"));
  gl.appendChild(document.createElement("br"));
  var gb = document.createElement("b"); gb.textContent = toName; gl.appendChild(gb);
  gl.hidden = false;
}

$("schedList").innerHTML = C.schedule.map(function(s){
  return "<article><b>" + esc(s.name) + "</b><br>" + esc(s.time) + "<br><small>" + esc(s.note) + "</small></article>";
}).join("");

$("verseList").innerHTML = (C.verses || []).map(function(v){
  return '<article class="verse' + (v.utama ? " utama" : "") + '"><p class="arab" dir="rtl" lang="ar">' + v.arab +
    '</p><p class="arti">&ldquo;' + esc(v.arti) + '&rdquo;</p><p class="sumber">' + esc(v.sumber) + "</p></article>";
}).join("");

$("storyList").innerHTML = (C.story || []).map(function(s){
  return '<article><span class="yr">' + esc(s.year) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>";
}).join("");

var gal = $("gallery");
gal.innerHTML = C.gallery.map(function(g){
  return '<button type="button"><img loading="lazy" src="' + A + g.src + '" alt="' + esc(g.alt) + '"><span class="gal-cap">' + esc(g.cap || "") + "</span></button>";
}).join("");
var lb = $("lightbox"), lbImg = $("lbImg"), lbReturn = null;
gal.addEventListener("click", function(e){
  var b = e.target.closest("button"); if(!b) return;
  var img = b.querySelector("img"); lbImg.src = img.src; lbImg.alt = img.alt;
  lbReturn = b;
  lb.classList.remove("hidden"); $("lbClose").focus();
});
function closeLb(){ lb.classList.add("hidden"); if (lbReturn) { lbReturn.focus(); lbReturn = null; } }
$("lbClose").addEventListener("click", closeLb);
lb.addEventListener("click", function(e){ if(e.target === lb) closeLb(); });
document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeLb(); });

/* ---------- Amplop digital: salin nomor ---------- */
$("giftList").innerHTML = (C.gift || []).map(function(g, i){
  return '<article><span class="bank">' + esc(g.bank) + '</span><p class="num">' + esc(g.number) +
    '</p><p class="nm">' + esc(g.name) + '</p><button type="button" class="copy-btn" data-copy="' + esc(g.number) + '">Salin Nomor</button></article>';
}).join("");
$("giftList").addEventListener("click", function(e){
  var b = e.target.closest("[data-copy]"); if(!b) return;
  var num = b.getAttribute("data-copy");
  function done(){ b.textContent = "✓ Tersalin"; setTimeout(function(){ b.textContent = "Salin Nomor"; }, 1800); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(num).then(done, done);
  else done();
});

/* ---------- Simpan ke kalender (.ics dari config) ---------- */
$("icsBtn").addEventListener("click", function(){
  var dt = new Date(C.event.dateISO);
  function f(d){ return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; }
  var end = new Date(dt.getTime() + 5 * 3600 * 1000);
  var ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//UndangYa!//Masjid Bunga//ID","BEGIN:VEVENT",
    "UID:masjid-bunga-" + dt.getTime() + "@undangya","DTSTAMP:" + f(new Date()),"DTSTART:" + f(dt),"DTEND:" + f(end),
    "SUMMARY:The Wedding of " + C.couple.bride.nick + " & " + C.couple.groom.nick,
    "LOCATION:" + C.event.venue + ", " + C.event.address,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  var url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  var a = document.createElement("a"); a.href = url; a.download = "undangan-fahrezzi-meyzsa.ics"; a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
});

/* ---------- Countdown ---------- */
var target = new Date(C.event.dateISO).getTime();
function pad(n){ return String(n).padStart(2, "0"); }
function setCd(id, v){
  var el = $(id); if (!el || el.textContent === String(v)) return;
  el.textContent = v; el.classList.remove("flip"); void el.offsetWidth; el.classList.add("flip");
}
function tick(){
  var d = Math.max(0, target - Date.now()), s = Math.floor(d / 1000);
  setCd("cdD", Math.floor(s / 86400));
  setCd("cdH", pad(Math.floor(s / 3600) % 24));
  setCd("cdM", pad(Math.floor(s / 60) % 60));
  setCd("cdS", pad(s % 60));
}
tick(); setInterval(tick, 1000);

/* ---------- Kalender mini ---------- */
(function(){
  var box = $("miniCal"); if (!box) return;
  var dt = new Date(C.event.dateISO), y = dt.getFullYear(), m = dt.getMonth(), day = dt.getDate();
  var months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), prev = new Date(y, m, 0).getDate();
  var cells = [], nx = 1;
  for (var i = 0; i < first; i++) cells.push('<td class="dim">' + (prev - first + 1 + i) + "</td>");
  for (var d = 1; d <= days; d++) cells.push(d === day ? '<td><span class="d-day">' + d + "</span></td>" : "<td>" + d + "</td>");
  while (cells.length % 7) cells.push('<td class="dim">' + (nx++) + "</td>");
  var rows = "";
  for (var r = 0; r < cells.length; r += 7) rows += "<tr>" + cells.slice(r, r + 7).join("") + "</tr>";
  box.innerHTML = '<p class="cal-head">' + months[m] + " " + y + "</p>" +
    "<table><tr><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>" + rows + "</table>" +
    '<p class="cal-note">Lingkari tanggalnya — kami menanti kehadiran Anda.</p>';
})();

/* ---------- RSVP demo (localStorage) ---------- */
var KEY = "masjid-bunga-rsvp", wishes = [];
try { wishes = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e){ wishes = []; }
function renderWishes(){
  $("wishList").innerHTML = wishes.map(function(w){
    return "<li><b>" + w.nama + "</b> · " + w.hadir + (w.ucapan ? "<br>" + w.ucapan : "") + "</li>";
  }).join("");
}
renderWishes();
$("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();
  var f = new FormData(e.target);
  var nama = String(f.get("nama") || "").trim();
  if(!nama){ $("formMsg").textContent = "Mohon isi nama terlebih dahulu."; return; }
  wishes.unshift({ nama: esc(nama), hadir: esc(String(f.get("hadir"))), ucapan: esc(String(f.get("ucapan") || "").trim()) });
  try { localStorage.setItem(KEY, JSON.stringify(wishes)); } catch(err){}
  renderWishes(); e.target.reset();
  $("formMsg").textContent = "Terima kasih, RSVP Anda tersimpan (demo lokal).";
});

/* ---------- Pisah huruf nama untuk reveal per-huruf (sapuan blur, seperti referensi) ---------- */
document.querySelectorAll(".names .name").forEach(function(el){
  var txt = el.textContent; el.textContent = "";
  txt.split("").forEach(function(ch){
    var s = document.createElement("span"); s.className = "ch"; s.textContent = ch; el.appendChild(s);
  });
});

/* ---------- Master timeline GSAP (storyboard Masjid Bunga) ---------- */
var skipBtn = $("skipBtn"), replayBtn = $("replayBtn");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function showReplay(){ skipBtn.classList.add("hidden"); replayBtn.classList.remove("hidden"); }
if(!window.gsap || reduced){
  showReplay();
  replayBtn.addEventListener("click", function(){ window.scrollTo({ top: 0, behavior: "smooth" }); });
} else {
  var tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: showReplay });
  tl.from("#world", { scale: 1.55, duration: 2.9, ease: "power2.inOut" }, 0)
    .fromTo("#sceneBg", { filter: "blur(7px) brightness(1.08)" }, { filter: "blur(0px) brightness(1)", duration: 2.7 }, 0)
    .from("#archFull", { y: -70, opacity: 0, duration: 1.3 }, 1.7)
    .from(".rosecol", { opacity: 0, y: 40, duration: 1.0, stagger: 0.14 }, 2.1)
    .from(".redtree", { opacity: 0, scale: 0.55, duration: 1.2, stagger: 0.16 }, 2.3)
    .from("#flowerBed", { y: 90, opacity: 0, duration: 1.2 }, 2.8)
    .from(".fcluster", { y: 70, opacity: 0, duration: 1.1, stagger: 0.14 }, 3.0)
    .to("#haze", { opacity: 0.4, duration: 1.0 }, 3.4)
    .from(".title-cloud", { opacity: 0, scale: 0.94, duration: 1.0 }, 4.6)
    .from("#eventTitle", { opacity: 0, y: 14, filter: "blur(6px)", duration: 0.8 }, 4.9)
    .from(".names .ch", { opacity: 0, y: 16, filter: "blur(7px)", duration: 0.7, stagger: 0.06 }, 5.5)
    .from(".names .amp", { opacity: 0, duration: 0.5 }, 6.1)
    .from("#eventDate", { opacity: 0, y: 10, duration: 0.7 }, 6.9)
    .from("#heroCouple", { opacity: 0, y: 26, scale: 0.94, duration: 0.9 }, 7.4)
    .to("#haze", { opacity: 0.16, duration: 0.8 }, 7.9);
  skipBtn.addEventListener("click", function(){ tl.progress(1); });
  replayBtn.addEventListener("click", function(){
    replayBtn.classList.add("hidden"); skipBtn.classList.remove("hidden"); tl.restart();
  });
}

/* ---------- Panggung hidup: kupu-kupu gambar, debu emas, kelopak dinamis, paralaks ---------- */
(function () {
  var stage = $("stage"); if (!stage) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced) {
    for (var i = 0; i < 10; i++) {
      var d = document.createElement("span");
      d.className = "dust"; d.setAttribute("aria-hidden", "true");
      var sz = 3 + Math.random() * 4;
      d.style.width = d.style.height = sz.toFixed(1) + "px";
      d.style.left = (4 + Math.random() * 92) + "%";
      d.style.animationDuration = (8 + Math.random() * 7).toFixed(1) + "s";
      d.style.animationDelay = (-Math.random() * 12).toFixed(1) + "s";
      stage.appendChild(d);
    }
  }

  function spawnPetal() {
    if (document.hidden || stage.querySelectorAll(".petal-dyn").length >= 9) return;
    var p = document.createElement("span");
    p.className = "petal petal-dyn"; p.setAttribute("aria-hidden", "true");
    var sz = 7 + Math.random() * 6;
    p.style.width = sz.toFixed(0) + "px"; p.style.height = (sz * 1.35).toFixed(0) + "px";
    p.style.left = (3 + Math.random() * 93) + "%";
    p.style.animationDuration = (5.2 + Math.random() * 3.2).toFixed(1) + "s";
    p.addEventListener("animationend", function () { p.remove(); });
    stage.appendChild(p);
  }
  window.__masjidPetalBurst = function (n) { for (var k = 0; k < n; k++) setTimeout(spawnPetal, k * 130); };
  if (!reduced) setInterval(spawnPetal, 2100);

  if (!window.gsap || reduced) { stage.classList.add("css-fly"); return; }

  if (window.MotionPathPlugin) {
    gsap.registerPlugin(MotionPathPlugin);
    var W = stage.clientWidth, H = stage.clientHeight;
    function flight(el, pts, dur, delay) {
      if (!el || !W) return;
      var path = pts.map(function (q) { return { x: q[0] * W, y: q[1] * H }; });
      var tl = gsap.timeline({ repeat: -1, delay: delay, defaults: { ease: "none" } });
      tl.set(el, { x: path[0].x, y: path[0].y, opacity: 0 })
        .to(el, { opacity: 0.95, duration: dur * 0.08 }, 0)
        .to(el, { motionPath: { path: path, curviness: 1.6, autoRotate: 90 }, duration: dur }, 0)
        .to(el, { opacity: 0, duration: dur * 0.08 }, dur * 0.92);
    }
    flight(document.querySelector(".b1"),
      [[-0.12, 0.78], [0.22, 0.60], [0.48, 0.72], [0.74, 0.55], [1.08, 0.66]], 21, 5);
    flight(document.querySelector(".b2"),
      [[1.08, 0.52], [0.76, 0.40], [0.5, 0.52], [0.24, 0.38], [-0.12, 0.47]], 26, 11);
    flight(document.querySelector(".b3"),
      [[-0.1, 0.34], [0.28, 0.24], [0.55, 0.36], [0.8, 0.22], [1.08, 0.3]], 31, 17);
  } else {
    stage.classList.add("css-fly");
  }

  /* Flora bergoyang lebih hidup setelah intro selesai (delay > durasi intro) */
  gsap.to(".redtree", { rotation: 1.6, y: 4, duration: 3.6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.7, transformOrigin: "50% 0%", delay: 8.8 });
  gsap.to("#flowerBed", { y: -5, rotation: 0.4, duration: 4.8, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 100%", delay: 8.8 });
  gsap.to("#sceneBg", { scale: 1.035, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });
  gsap.to("#heroCouple", { y: -5, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 8.8 });

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".ceremony-fig img, .story-fig img").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none",
        scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }
})();

/* ---------- Animasi gulir ---------- */
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
  var BAR = 60 / 63 * 4;
  var CH = [
    { r: "A2", c: ["A3", "C4", "E4"] }, { r: "F2", c: ["F3", "A3", "C4"] },
    { r: "C3", c: ["C4", "E4", "G4"] }, { r: "G2", c: ["G3", "B3", "D4"] },
    { r: "A2", c: ["A3", "C4", "E4"] }, { r: "F2", c: ["F3", "A3", "C4"] },
    { r: "D3", c: ["D4", "F4", "A4"] }, { r: "E3", c: ["E4", "G#4", "B4"] }
  ];
  var MEL = [
    [["E5", 0, 1.5], ["C5", 1.5, 1], ["A4", 2.5, 1.5]],
    [["A4", 0, 1.5], ["C5", 1.5, 1], ["F5", 2.5, 1.5]],
    [["E5", 0, 1], ["G5", 1, 1], ["E5", 2, 1], ["C5", 3, 1]],
    [["D5", 0, 2], ["B4", 2, 1], ["G4", 3, 1]],
    [["E5", 0, 1.5], ["A5", 1.5, 1], ["G5", 2.5, 1.5]],
    [["F5", 0, 1], ["E5", 1, 1], ["C5", 2, 1], ["A4", 3, 1]],
    [["F5", 0, 1.5], ["A5", 1.5, 1], ["D6", 2.5, 1.5]],
    [["B5", 0, 1], ["G#5", 1, 1], ["E5", 2, 2]]
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
  /* Musik hanya mulai dari gestur yang disengaja: tombol musik, atau klik
     "Buka Undangan" (aksi membuka undangan). Klik/scroll biasa TIDAK menyalakan musik. */
  var hint = document.querySelector(".scroll-hint");
  if (hint) hint.addEventListener("click", function () {
    if (!on) start();
    if (window.__masjidPetalBurst) window.__masjidPetalBurst(8);
  });
})();
})();
