/* UndangYa! — Palace Garden Gate · mesin undangan + satu GSAP master timeline.
   Tanpa GSAP / reduced-motion: halaman tampil pada KEADAAN FINAL (CSS default),
   cover dapat dibuka langsung ke hero tanpa animasi. */
(function () {
"use strict";
var C = window.PALACE_CONFIG, A = C.theme.assets;
var $ = function (id) { return document.getElementById(id); };
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

/* ================= Isi dari config ================= */
var dateFmt = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
var dateLabel = dateFmt.format(new Date(C.event.dateISO)); /* hari SELALU dihitung, tidak ditulis manual */
document.title = "UndangYa! — Palace Garden Gate · " + C.couple.bride.nick + " & " + C.couple.groom.nick;

$("openingLabel").textContent = C.event.openingLabel;
$("coverLabel").textContent = C.event.openingLabel;
$("brideNick").textContent = C.couple.bride.nick;
$("groomNick").textContent = C.couple.groom.nick;
$("coverBride").textContent = C.couple.bride.nick;
$("coverGroom").textContent = C.couple.groom.nick;
$("datePill").textContent = dateLabel;
$("dateBig").textContent = dateLabel;
$("greetingText").textContent = C.event.greeting;
$("quoteText").textContent = "“" + C.event.quote + "”";
$("quoteSource").textContent = C.event.quoteSource;
if (C.couple.photo) { $("couplePhoto").src = A + C.couple.photo; $("couplePhoto").alt = C.couple.photoAlt || ""; }
$("bridePhoto").src = A + C.couple.bride.photo; $("bridePhoto").alt = C.couple.bride.photoAlt;
$("groomPhoto").src = A + C.couple.groom.photo; $("groomPhoto").alt = C.couple.groom.photoAlt;
$("brideFull").textContent = C.couple.bride.full;
$("brideParents").textContent = C.couple.bride.parents;
$("groomFull").textContent = C.couple.groom.full;
$("groomParents").textContent = C.couple.groom.parents;
$("venueName").textContent = C.event.venue;
$("venueAddr").textContent = C.event.address;
$("mapsBtn").href = C.event.maps;
$("giftNote").textContent = C.gift.note;
$("closingText").textContent = C.closing;
$("signBride").textContent = C.couple.bride.nick;
$("signGroom").textContent = C.couple.groom.nick;

/* Nama tamu personal dari ?to= */
var toName = new URLSearchParams(location.search).get("to");
var guestName = toName && toName.trim() ? toName.trim() : "Tamu Undangan";
$("guestName").textContent = guestName;
if (toName && toName.trim()) {
  var gl = $("guestLine");
  gl.appendChild(document.createTextNode("Kepada Yth. Bapak/Ibu/Saudara/i"));
  gl.appendChild(document.createElement("br"));
  gl.appendChild(el("b", null, toName.trim()));
  gl.hidden = false;
}

/* Jadwal (DOM building — tanpa innerHTML) */
var schedList = $("schedList");
C.schedule.forEach(function (s) {
  var art = el("article");
  art.appendChild(el("span", "ev-label", s.label || ""));
  art.appendChild(el("b", null, s.name));
  art.appendChild(el("span", "ev-time", s.time));
  art.appendChild(document.createElement("br"));
  art.appendChild(el("small", null, s.note));
  schedList.appendChild(art);
});

/* Love story */
var storyList = $("storyList");
C.story.forEach(function (s) {
  var art = el("article");
  if (s.img) {
    var th = el("img", "story-thumb"); th.src = A + s.img; th.alt = ""; th.loading = "lazy";
    art.appendChild(th);
  }
  var body = el("div", "story-body");
  body.appendChild(el("span", "yr", s.year));
  body.appendChild(el("h3", null, s.title));
  body.appendChild(el("p", null, s.text));
  art.appendChild(body);
  storyList.appendChild(art);
});

/* Galeri + lightbox (prev/next, gambar fade-in setelah benar-benar termuat) */
var gal = $("gallery"), lbIndex = 0;
function showLb(i) {
  lbIndex = (i + C.gallery.length) % C.gallery.length;
  var g = C.gallery[lbIndex], im = $("lbImg");
  im.classList.remove("lb-ready");
  var pre = new Image();
  pre.onload = function () {
    im.src = pre.src; im.alt = g.alt;
    requestAnimationFrame(function () { im.classList.add("lb-ready"); });
  };
  pre.onerror = function () { im.src = A + g.src; im.classList.add("lb-ready"); };
  pre.src = A + g.src;
  $("lbCap").textContent = g.cap || g.alt;
}
C.gallery.forEach(function (g, i) {
  var b = el("button"); b.type = "button";
  var img = el("img"); img.loading = "lazy"; img.src = A + g.src; img.alt = g.alt;
  b.appendChild(img); b.appendChild(el("span", "gal-cap", g.cap || ""));
  b.addEventListener("click", function () {
    lbReturnFocus = b;
    $("lightbox").classList.remove("hidden"); showLb(i); $("lbClose").focus();
  });
  gal.appendChild(b);
});
var lbReturnFocus = null;
function closeLb() {
  $("lightbox").classList.add("hidden");
  if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus();
}
$("lbClose").addEventListener("click", closeLb);
$("lbPrev").addEventListener("click", function () { showLb(lbIndex - 1); });
$("lbNext").addEventListener("click", function () { showLb(lbIndex + 1); });
$("lightbox").addEventListener("click", function (e) { if (e.target === $("lightbox")) closeLb(); });
document.addEventListener("keydown", function (e) {
  if ($("lightbox").classList.contains("hidden")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") showLb(lbIndex - 1);
  if (e.key === "ArrowRight") showLb(lbIndex + 1);
});

/* Amplop digital + salin nomor */
var giftList = $("giftList");
C.gift.accounts.forEach(function (acc) {
  var card = el("div", "gift-card");
  card.appendChild(el("div", "g-bank", acc.bank));
  card.appendChild(el("div", "g-num", acc.number));
  card.appendChild(el("div", "g-holder", acc.holder));
  var btn = el("button", "btn", "Salin Nomor"); btn.type = "button";
  var msg = el("p", "copy-msg"); msg.setAttribute("role", "status");
  btn.addEventListener("click", function () { copyText(acc.number, msg); });
  card.appendChild(btn); card.appendChild(msg);
  giftList.appendChild(card);
});
function copyText(text, msgEl) {
  function ok() { msgEl.textContent = "✓ Nomor tersalin: " + text; }
  function fail() { msgEl.textContent = "Gagal menyalin otomatis — salin manual: " + text; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(ok, function () { legacy(); });
  } else legacy();
  function legacy() {
    try {
      var ta = el("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var done = document.execCommand("copy"); document.body.removeChild(ta);
      done ? ok() : fail();
    } catch (e) { fail(); }
  }
}

/* Kalender .ics dari config (kedua acara) */
function icsDate(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
$("icsBtn").addEventListener("click", function () {
  var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UndangYa//Palace Garden Gate//ID"];
  C.schedule.forEach(function (s, i) {
    lines.push("BEGIN:VEVENT",
      "UID:palace-" + icsDate(s.startISO) + "-" + i + "@undangya",
      "DTSTAMP:" + icsDate(new Date().toISOString()),
      "DTSTART:" + icsDate(s.startISO), "DTEND:" + icsDate(s.endISO),
      "SUMMARY:" + s.name + " — " + C.couple.bride.nick + " & " + C.couple.groom.nick,
      "LOCATION:" + C.event.venue + ", " + C.event.address,
      "END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  var blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  var a = el("a"); a.href = URL.createObjectURL(blob);
  a.download = C.couple.bride.nick.toLowerCase() + "-" + C.couple.groom.nick.toLowerCase() + ".ics";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
});

/* ================= Countdown ================= */
var target = new Date(C.event.dateISO).getTime();
function pad(n) { return String(n).padStart(2, "0"); }
function tick() {
  var diff = target - Date.now();
  if (diff <= 0) {
    $("cdD").textContent = "0"; $("cdH").textContent = "00"; $("cdM").textContent = "00"; $("cdS").textContent = "00";
    $("cdNote").hidden = false; return;
  }
  var s = Math.floor(diff / 1000);
  $("cdD").textContent = Math.floor(s / 86400);
  $("cdH").textContent = pad(Math.floor(s / 3600) % 24);
  $("cdM").textContent = pad(Math.floor(s / 60) % 60);
  $("cdS").textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);

/* Kalender mini: bulan acara dari config, tanggal acara dilingkari */
(function () {
  var box = $("miniCal"); if (!box) return;
  /* Tahun/bulan/tanggal dibaca pada zona acara (Asia/Jakarta) — sama seperti pill tanggal,
     agar tanggal yang dilingkari tidak bergeser di peramban zona waktu lain. */
  var parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(new Date(C.event.dateISO));
  var pv = {}; parts.forEach(function (p) { pv[p.type] = p.value; });
  var y = +pv.year, m = +pv.month - 1, day = +pv.day;
  var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), prev = new Date(y, m, 0).getDate();
  var cells = [], nx = 1, i, d;
  for (i = 0; i < first; i++) cells.push('<td class="dim">' + (prev - first + 1 + i) + "</td>");
  for (d = 1; d <= days; d++) cells.push(d === day ? '<td><span class="d-day">' + d + "</span></td>" : "<td>" + d + "</td>");
  while (cells.length % 7) cells.push('<td class="dim">' + (nx++) + "</td>");
  var rows = "";
  for (var r = 0; r < cells.length; r += 7) rows += "<tr>" + cells.slice(r, r + 7).join("") + "</tr>";
  box.innerHTML = '<p class="cal-head">' + months[m] + " " + y + "</p>" +
    "<table><tr><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>" + rows + "</table>" +
    '<p class="cal-note">Lingkari tanggalnya — kami menanti kehadiran Anda.</p>';
})();

/* ================= RSVP + Buku Tamu (DEMO localStorage) ================= */
var KEY = "palace-gate-rsvp", wishes = [];
try { wishes = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { wishes = []; }
function renderWishes() {
  var list = $("wishList"); list.textContent = "";
  wishes.forEach(function (w) {
    var li = el("li");
    li.appendChild(el("b", null, w.nama));
    li.appendChild(el("span", "w-meta", " · " + w.hadir + " · " + w.jumlah + " tamu"));
    if (w.ucapan) { li.appendChild(document.createElement("br")); li.appendChild(document.createTextNode(w.ucapan)); }
    list.appendChild(li);
  });
  $("wishesEmpty").style.display = wishes.length ? "none" : "";
}
renderWishes();
$("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var f = new FormData(e.target);
  var nama = String(f.get("nama") || "").trim();
  if (!nama) { $("formMsg").textContent = "Mohon isi nama terlebih dahulu."; return; }
  wishes.unshift({ nama: nama, hadir: String(f.get("hadir")), jumlah: String(f.get("jumlah") || "1"), ucapan: String(f.get("ucapan") || "").trim() });
  try { localStorage.setItem(KEY, JSON.stringify(wishes)); } catch (err) {}
  renderWishes(); e.target.reset();
  $("formMsg").textContent = "Terima kasih, RSVP Anda tersimpan (demo lokal).";
});

/* ================= Kelopak jatuh ================= */
(function buildPetals() {
  var box = $("petals");
  var imgs = ["fx/petal-pink-1.png", "fx/petal-pink-2.png", "fx/petal-magenta.png", "fx/petal-cream.png", "fx/petal-terracotta.png", "fx/leaf-sage.png"];
  for (var i = 0; i < 16; i++) {
    var p = el("img", "petal");
    p.src = A + imgs[i % imgs.length]; p.alt = "";
    var size = 17 + (i * 7) % 17;
    p.style.left = (4 + (i * 83) % 92) + "%";
    p.style.width = size + "px";
    p.style.setProperty("--drift", ((i % 2 ? -1 : 1) * (52 + (i * 17) % 96)) + "px");
    p.style.animationDuration = (4.6 + (i * 7) % 3) + "s";
    p.style.animationDelay = (-(i * 1.7)) + "s";
    box.appendChild(p);
  }
})();

/* ================= Cover & Master Timeline ================= */
var cover = $("cover"), skipBtn = $("skipBtn"), replayBtn = $("replayBtn");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var tl = null, opened = false, playing = false;

function finalState() {
  opened = true; playing = false;
  cover.classList.add("hidden");
  document.body.classList.remove("locked");
  document.body.classList.add("opened");
  $("petals").classList.add("on");
  $("scrollHint").classList.remove("hidden");
  replayBtn.classList.remove("hidden");
  skipBtn.classList.add("hidden");
}
function resetStage() {
  if (window.gsap) {
    gsap.set(cover, { clearProps: "all", autoAlpha: 1 });
    gsap.set("#coverWorld", { clearProps: "all" });
    gsap.set(["#gateLeft", "#gateRight", "#coverCard", "#gapuraLayer", "#whiteFlash", "#heroPhoto"], { clearProps: "all" });
    gsap.set("#whiteFlash", { opacity: 0 });
    gsap.set("#heroWorld", { clearProps: "all" });
  }
  cover.classList.remove("hidden");
  $("petals").classList.remove("on");
  $("scrollHint").classList.add("hidden");
  replayBtn.classList.add("hidden");
}
function buildTimeline() {
  var t = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: finalState });
  /* 1 · hold singkat, kartu cover memudar */
  t.to("#coverCard", { autoAlpha: 0, y: 24, duration: 0.4, ease: "power1.in" }, 0.35)
  /* 2 · gerbang bronze terbelah membuka PERLAHAN ke dua sisi — momen penentu video,
        diberi waktu 2,1 dtk dan ayunan rotateY dari engsel agar terbaca jelas sebagai pintu yang membuka */
   .to("#gateLeft", { xPercent: -118, rotationY: 16, scaleX: 0.94, filter: "brightness(1.13) drop-shadow(0 6px 10px rgba(74,52,35,.35))", duration: 1.45, ease: "power2.inOut" }, 0.5)
   .to("#gateRight", { xPercent: 118, rotationY: -16, scaleX: 0.94, filter: "brightness(1.13) drop-shadow(0 6px 10px rgba(74,52,35,.35))", duration: 1.45, ease: "power2.inOut" }, 0.5)
  /* 3 · kamera menembus GAPURA dulu (parallax: gapura membesar lebih cepat & memudar),
        lalu FADE PUTIH penuh menelan adegan, interior muncul dari balik putihnya */
   .to("#gapuraLayer", { scale: 1.32, autoAlpha: 0, duration: 0.9, ease: "power2.in" }, 1.9)
   .to("#coverWorld", { scale: 1.55, duration: 0.95, ease: "power2.in" }, 1.95)
   .to("#whiteFlash", { opacity: 1, duration: 0.38, ease: "power1.in" }, 2.05)
   .to(cover, { autoAlpha: 0, duration: 0.65, ease: "power1.inOut" }, 2.2)
   .fromTo("#heroWorld", { scale: 1.14, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.95, ease: "power2.out" }, 2.0)
   .to("#whiteFlash", { opacity: 0, duration: 0.7, ease: "power2.out" }, 2.35)
  /* 4 · panel rococo turun di belakang teks */
   .from("#rococoFrame", { opacity: 0, y: -34, duration: 0.65 }, 2.65)
  /* 5 · flora masuk berjenjang dari atas/sisi/bawah */
   .from(".branch-top", { y: -48, opacity: 0, duration: 0.6, stagger: 0.09 }, 2.9)
   .from(".flora.mid", { y: -30, opacity: 0, duration: 0.58, stagger: 0.08 }, 3.0)
   .from(".peony-l", { x: -64, opacity: 0, duration: 0.68 }, 3.1)
   .from(".peony-r", { x: 64, opacity: 0, duration: 0.68 }, 3.1)
   .from(".flora.lily", { opacity: 0, scale: 0.85, duration: 0.58, stagger: 0.08 }, 3.3)
   .from(".flora.side2", { y: 44, opacity: 0, duration: 0.64, stagger: 0.08 }, 3.42)
   .from(".flora.ground", { y: 40, opacity: 0, duration: 0.64, stagger: 0.08 }, 3.55)
  /* 6 · lentera menyala (air mancur sudah menyatu di adegan interior) */
   .from(".lantern", { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.09 }, 3.85)
  /* 6b · fade putih lembut sebelum teks tampil */
   .to("#whiteFlash", { opacity: 0.32, duration: 0.24, ease: "power1.inOut" }, 4.1)
   .to("#whiteFlash", { opacity: 0, duration: 0.55, ease: "power2.out" }, 4.32)
  /* 7 · teks: label → nama menyingkap dari blur (urutan video) */
   .from("#openingLabel", { opacity: 0, y: 12, duration: 0.45 }, 4.28)
   .from("#brideNick", { opacity: 0, y: 16, filter: "blur(14px)", duration: 0.8 }, 4.55)
   .from(".names .amp", { opacity: 0, scale: 0.6, duration: 0.4 }, 5.15)
   .from("#groomNick", { opacity: 0, y: 16, filter: "blur(14px)", duration: 0.8 }, 5.35)
  /* 8 · pill tanggal terbaca jelas */
   .from("#datePill", { opacity: 0, y: 12, duration: 0.45 }, 5.95)
  /* 9 · fade putih lembut → FOTO PASANGAN tampil di taman setelah masuk gerbang */
   .to("#whiteFlash", { opacity: 0.3, duration: 0.24, ease: "power1.inOut" }, 6.35)
   .to("#whiteFlash", { opacity: 0, duration: 0.55, ease: "power2.out" }, 6.55)
   .from("#heroPhoto", { opacity: 0, y: 28, scale: 0.88, duration: 0.7, ease: "power2.out" }, 6.45)
   .to({}, { duration: 0.25 });
  return t;
}
function playIntro() {
  if (playing) return;
  if (!window.gsap || reduced) { finalState(); return; }
  playing = true;
  resetStage();
  skipBtn.classList.remove("hidden");
  window.scrollTo(0, 0);
  document.body.classList.add("locked");
  tl = buildTimeline();
}
$("openBtn").addEventListener("click", function (e) { e.preventDefault(); playIntro(); });
skipBtn.addEventListener("click", function () { if (tl) { tl.progress(1); } else { finalState(); } });
replayBtn.addEventListener("click", function () {
  opened = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(playIntro, reduced ? 0 : 350);
});

/* Jeda animasi dekoratif saat tab tidak terlihat */
document.addEventListener("visibilitychange", function () {
  document.body.classList.toggle("paused", document.hidden);
});

/* ================= Scroll reveal ================= */
if ("IntersectionObserver" in window && !reduced) {
  document.documentElement.classList.add("js-anim");
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".sec").forEach(function (s) { revealIO.observe(s); });
}

/* ================= Musik: "Petals on the Stone Floor" — file audio bersama ================= */
(function () {
  var btn = $("musicBtn");
  if (!btn) return;
  btn.title = C.musicTitle || "Musik latar";
  var ico = btn.querySelector("img");
  if (ico) ico.addEventListener("error", function () { btn.classList.add("noicon"); });
  var bgm = document.getElementById("bgmShared");
  if (!bgm) { btn.style.display = "none"; return; }
  var on = false;
  function setBtn() {
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Jeda musik latar" : "Putar musik latar");
  }
  bgm.addEventListener("play", function () { on = true; setBtn(); });
  bgm.addEventListener("pause", function () { on = false; setBtn(); });
  btn.addEventListener("click", function () {
    if (!bgm.paused) bgm.pause();
    else { var p = bgm.play(); if (p && p.catch) p.catch(function () {}); }
  });
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
Array.prototype.forEach.call(document.querySelectorAll("#coverCard > *"),function(el,i){el.classList.add("ucine");el.style.animationDelay=(0.15+i*0.13)+"s";});
if(!reduced){var amb=document.createElement("div");amb.className="ambient";amb.setAttribute("aria-hidden","true");
for(var i=0;i<14;i++){var s=document.createElement("i");s.style.left=(Math.random()*97)+"%";s.style.animationDuration=(9+Math.random()*10)+"s";s.style.animationDelay=(-Math.random()*14)+"s";s.style.setProperty("--sw",(Math.random()*46-23)+"px");if(i%3===0)s.className="dot";amb.appendChild(s);}
document.body.appendChild(amb);
document.addEventListener("visibilitychange",function(){document.body.classList.toggle("amb-paused",document.hidden);});}
var plx=Array.prototype.slice.call(document.querySelectorAll(".hero-photo, .sec-banner img"));
if(plx.length&&!reduced){var ticking=false;
function upd(){ticking=false;var vh=window.innerHeight;plx.forEach(function(el,i){var r=el.getBoundingClientRect();if(r.bottom<-40||r.top>vh+40)return;var c=(r.top+r.height/2-vh/2)/vh;el.style.translate="0 "+(c*(i%2?-26:-14)).toFixed(1)+"px";});}
window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(upd);}},{passive:true});upd();}
var cd=document.querySelectorAll("#countdown b");
if(cd.length&&"MutationObserver" in window){Array.prototype.forEach.call(cd,function(el){var last=el.textContent;new MutationObserver(function(){if(el.textContent!==last){last=el.textContent;el.classList.remove("upop");void el.offsetWidth;el.classList.add("upop");}}).observe(el,{childList:true,characterData:true,subtree:true});});}
Array.prototype.forEach.call(document.querySelectorAll("#openBtn, #btnOpen, button[type=submit]"),function(b){b.classList.add("uglow");});
})();
