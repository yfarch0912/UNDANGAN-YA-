// ============================================================
// UndangYa! — Burgundy Royal Palace · Engine
// Animasi tirai meniru video referensi (loop 20 dtk saat cover,
// reveal sekali saat dibuka). Konten seluruhnya dari BP_CONFIG.
// ============================================================
(function () {
  "use strict";
  var C = window.BP_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var A = "assets/undangya/burgundy-palace/";

  /* ---------- Bind konten dari config ---------- */
  var bind = {
    brideShort: C.couple && C.couple.bride.short, groomShort: C.couple && C.couple.groom.short,
    brideFull: C.couple && C.couple.bride.full, groomFull: C.couple && C.couple.groom.full,
    brideFather: C.couple && C.couple.bride.father, brideMother: C.couple && C.couple.bride.mother,
    groomFather: C.couple && C.couple.groom.father, groomMother: C.couple && C.couple.groom.mother,
    brideIg: C.couple && C.couple.bride.instagram, groomIg: C.couple && C.couple.groom.instagram,
    dateLabel: C.weddingDateLabel, salam: C.greeting && C.greeting.salam,
    verse: C.greeting && C.greeting.verse, verseSource: C.greeting && C.greeting.verseSource,
    intro: C.greeting && C.greeting.intro, giftNote: C.gift && C.gift.note,
    closingText: C.closing && C.closing.text, closingSalam: C.closing && C.closing.salam
  };
  $$("[data-bind]").forEach(function (el) {
    var v = bind[el.getAttribute("data-bind")];
    if (v != null) el.textContent = v;
  });
  if (C.couple) {
    $("#bridePhoto").src = C.couple.bride.photo;
    $("#groomPhoto").src = C.couple.groom.photo;
    $("#couplePhoto").src = C.couple.photo;
    document.title = "Burgundy Royal Palace · " + C.couple.bride.short + " & " + C.couple.groom.short + " — UndangYa!";
  }

  /* ---------- Nama tamu ?to= ---------- */
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").replace(/[<>&"]/g, "").slice(0, 80);
  if (guest) $("#guestName").textContent = guest;
  var prefill = $("#rsvpName");
  if (guest && prefill) prefill.value = guest;

  /* ---------- FX hidup: kupu-kupu, burung, sparkle, kelopak ---------- */
  var fx = $("#fxLayer");
  function spawnFx() {
    if (!fx || reduced) return;
    var items = [
      { cls: "fx fx-butterfly", src: A + "effects/butterfly-pink.svg", n: 1, top: [54], left: [22], delay: [1] },
      { cls: "fx fx-butterfly", src: A + "effects/butterfly-gold.svg", n: 1, top: [60], left: [66], delay: [6] },
      { cls: "fx fx-sparkle", src: A + "effects/sparkle.svg", n: 2, top: [24, 58], left: [30, 76], delay: [.5, 1.6] },
      { cls: "fx fx-sparkle", src: A + "effects/sparkle-small.svg", n: 2, top: [40, 68], left: [84, 16], delay: [1.1, 2.1] },
      { cls: "fx fx-petal", src: A + "effects/petal.svg", n: 6, top: [-2, -2, -2, -2, -2, -2], left: [7, 13, 85, 91, 50, 30], delay: [0, 3, 6, 9, 4.5, 7.5], dur: [9.5, 11, 10, 12, 10.5, 11.5] }
    ];
    items.forEach(function (it) {
      for (var i = 0; i < it.n; i++) {
        var im = document.createElement("img");
        im.className = it.cls; im.src = it.src; im.alt = "";
        im.style.top = it.top[i % it.top.length] + "%";
        im.style.left = it.left[i % it.left.length] + "%";
        im.style.animationDelay = (it.delay[i % it.delay.length] || 0) + "s";
        if (it.cls.indexOf("sparkle") > -1) im.style.width = (9 + Math.random() * 9) + "px";
        if (it.dur) { im.style.animationDuration = it.dur[i % it.dur.length] + "s"; im.style.width = (20 + Math.random() * 7) + "px"; }
        fx.appendChild(im);
      }
    });
  }
  spawnFx();

  /* Gerakan idle aset 2D: merak berayun halus, strip mawar berombak pelan */
  if (hasGsap && !reduced) {
    gsap.to(".peacock", { rotation: 2.1, y: -6, scale: 1.015, transformOrigin: "50% 88%", duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 1.1 });
    gsap.to(".roses-fg", { y: 10, duration: 5.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }

  /* ---------- Timeline tirai (GSAP) ---------- */
  var hasGsap = typeof window.gsap !== "undefined";
  var loopTl = null, opened = false;
  var stage = $("#stage"), titleBlock = $("#titleBlock"), heroCouple = $("#heroCouple");
  var cuL = $("#ccL"), cuR = $("#ccR");

  function setFinalState() {
    // Komposisi final persis frame hero referensi
    if (hasGsap) {
      gsap.set(cuL, { xPercent: -103 });
      gsap.set(cuR, { xPercent: 103 });
      gsap.set(titleBlock, { opacity: 1, scale: 1 });
      gsap.set(heroCouple, { opacity: 1, y: 0 });
      gsap.set([cuL, cuR], { scaleY: 1 });
    } else {
      cuL.style.transform = "translateX(-103%)"; cuR.style.transform = "translateX(103%)";
      titleBlock.style.opacity = "1";
      if (heroCouple) heroCouple.style.opacity = "1";
    }
  }
  function buildLoop() {
    if (!hasGsap || reduced) { setFinalState(); return; }
    // Storyboard terukur: tutup 0-2.8 · buka 2.8-4.5 · teks 4.5-7 · hold s.d. 17 · tutup 17-19.5 · loop
    loopTl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
    loopTl
      .set([cuL, cuR], { xPercent: 0 })
      .set(titleBlock, { opacity: 0, scale: .96 })
      .set(heroCouple, { opacity: 0, y: 26 })
      .to({}, { duration: 2.8 })                                   // hold tertutup
      .to(cuL, { xPercent: -103, duration: 1.7 }, "open")           // menyibak
      .to(cuR, { xPercent: 103, duration: 1.7 }, "open")
      .to(titleBlock, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, "open+=0.55")
      .to(heroCouple, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, "open+=0.95")
      .to({}, { duration: 9.6 })                                   // hold hidup
      .to(titleBlock, { opacity: 0, duration: .7 }, "close")        // teks memudar dulu
      .to(heroCouple, { opacity: 0, duration: .7 }, "close")
      .to(cuL, { xPercent: 0, duration: 1.8 }, "close+=0.3")       // tirai menutup
      .to(cuR, { xPercent: 0, duration: 1.8 }, "close+=0.3")
      .to({}, { duration: 0.4 });
  }

  /* ---------- Musik: "Petals on the Stone Floor" — file audio bersama ---------- */
  var bgm = document.getElementById("bgmShared");
  function musicStart() {
    if (!C.music || !C.music.enabled) return;
    if (!bgm) return;
    var btn = $("#musicBtn"); btn.hidden = false;
    var p = bgm.play(); if (p && p.catch) p.catch(function () {});
  }
  function musicStop() {
    if (bgm) bgm.pause();
  }
  if (bgm) {
    bgm.addEventListener("play", function () { $("#musicBtn").classList.add("playing"); });
    bgm.addEventListener("pause", function () { $("#musicBtn").classList.remove("playing"); });
  }
  $("#musicBtn").addEventListener("click", function () { (bgm && !bgm.paused) ? musicStop() : musicStart(); });

  /* ---------- Buka Undangan ---------- */
  var openBtn = $("#openBtn"), coverCard = $("#coverCard");
  function openInvitation(instant) {
    if (opened) return; opened = true;
    if (loopTl) { loopTl.kill(); loopTl = null; }
    document.body.setAttribute("data-state", "open");
    document.body.style.overflow = "";
    var done = function () {
      coverCard.style.display = "none";
      if (hasGsap && !reduced) { gsap.set(titleBlock, { opacity: 1, scale: 1 }); gsap.set(heroCouple, { opacity: 1, y: 0 }); }
      else { titleBlock.style.opacity = "1"; if (heroCouple) heroCouple.style.opacity = "1"; }
      $("#scrollHint").hidden = false;
      $("#replayBtn").hidden = false;
      $("#musicBtn").hidden = !(C.music && C.music.enabled);
    };
    if (hasGsap && !reduced && !instant) {
      var tl = gsap.timeline({ onComplete: done });
      tl.to(coverCard, { opacity: 0, y: 24, duration: .55, ease: "power2.in" })
        .set(coverCard, { display: "none" })
        .to([cuL, cuR], { xPercent: function (i) { return i === 0 ? -103 : 103; }, duration: 1.9, ease: "power3.inOut" }, "-=0.1")
        .fromTo(titleBlock, { opacity: 0, scale: .95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.7")
        .fromTo(heroCouple, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }, "-=0.9");
    } else {
      coverCard.style.display = "none"; setFinalState(); done();
    }
    if (C.music && C.music.autoplayAfterOpen) musicStart();
    try { localStorage.setItem("bp-opened", "1"); } catch (e) {}
  }
  openBtn.addEventListener("click", function () { openInvitation(false); });
  var coverSkip = $("#coverSkip");
  if (coverSkip) coverSkip.addEventListener("click", function () {
    if (loopTl) { loopTl.kill(); loopTl = null; }
    setFinalState();
    coverSkip.hidden = true;
  });

  /* Replay & Skip */
  $("#replayBtn").addEventListener("click", function () {
    if (!hasGsap || reduced) return;
    $("#skipBtn").hidden = false;
    var tl = gsap.timeline({ onComplete: function () { $("#skipBtn").hidden = true; } });
    tl.to(titleBlock, { opacity: 0, duration: .4 })
      .to(heroCouple, { opacity: 0, duration: .4 }, "<")
      .to(cuL, { xPercent: 0, duration: 1.2, ease: "power2.inOut" }, "<")
      .to(cuR, { xPercent: 0, duration: 1.2, ease: "power2.inOut" }, "<")
      .to({}, { duration: 1.2 })
      .to(cuL, { xPercent: -103, duration: 1.7, ease: "power3.inOut" }, "re")
      .to(cuR, { xPercent: 103, duration: 1.7, ease: "power3.inOut" }, "re")
      .to(titleBlock, { opacity: 1, scale: 1, duration: 1.4 }, "re+=0.5")
      .to(heroCouple, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "re+=0.9");
    $("#skipBtn").onclick = function () { tl.progress(1); };
    stage.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });

  document.addEventListener("visibilitychange", function () {
    var hidden = document.hidden;
    document.body.classList.toggle("anim-paused", hidden);
    if (loopTl) { hidden ? loopTl.pause() : loopTl.resume(); }
  });

  /* Paralaks halus antar-layer (desktop, penunjuk presisi, bukan reduced-motion) */
  if (hasGsap && !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var pxPalace = gsap.quickTo(".palace", "x", { duration: .9, ease: "power2.out" });
    var pyPalace = gsap.quickTo(".palace", "y", { duration: .9, ease: "power2.out" });
    var pxPk = gsap.quickTo(".peacock", "x", { duration: 1.1, ease: "power2.out" });
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      pxPalace(dx * -7); pyPalace(dy * -5); pxPk(dx * 6);
    });
    stage.addEventListener("pointerleave", function () { pxPalace(0); pyPalace(0); pxPk(0); });
  }

  if (params.get("skip") === "1") { coverCard.style.display = "none"; setFinalState(); document.body.setAttribute("data-state", "open"); document.body.style.overflow = ""; $("#scrollHint").hidden = false; $("#replayBtn").hidden = false; $("#musicBtn").hidden = !(C.music && C.music.enabled); opened = true; }
  else buildLoop();

  /* ---------- Countdown nyata ---------- */
  var target = new Date(C.weddingDateISO || "2027-06-12T08:00:00+07:00").getTime();
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tickCountdown() {
    var diff = target - Date.now();
    if (diff <= 0) {
      $("#cd-d").textContent = "0"; $("#cd-h").textContent = "00"; $("#cd-m").textContent = "00"; $("#cd-s").textContent = "00";
      $("#countPassed").hidden = false; return;
    }
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    $("#cd-d").textContent = d; $("#cd-h").textContent = pad(h); $("#cd-m").textContent = pad(m); $("#cd-s").textContent = pad(s);
    setTimeout(tickCountdown, 1000);
  }
  tickCountdown();

  /* ---------- Mini kalender dari tanggal config ---------- */
  (function buildCalendar() {
    var dt = new Date(C.weddingDateISO || "2027-06-12T08:00:00+07:00");
    var year = dt.getFullYear(), month = dt.getMonth(), day = dt.getDate();
    var monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var first = new Date(year, month, 1).getDay(); // 0=Minggu
    var days = new Date(year, month + 1, 0).getDate();
    var html = "<h4>" + monthNames[month] + " " + year + "</h4><table><tr><th>Min</th><th>Sen</th><th>Sel</th><th>Rab</th><th>Kam</th><th>Jum</th><th>Sab</th></tr><tr>";
    var cell = 0;
    for (var i = 0; i < first; i++) { html += "<td class='dim'>·</td>"; cell++; }
    for (var d = 1; d <= days; d++) {
      html += "<td class='" + (d === day ? "wedding" : "") + "'>" + d + "</td>"; cell++;
      if (cell % 7 === 0 && d < days) html += "</tr><tr>";
    }
    html += "</tr></table>";
    $("#miniCal").innerHTML = html;
  })();

  /* ---------- Kartu acara + ICS + Maps ---------- */
  function icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function icsDate(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; }
  function downloadICS(ev) {
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UndangYa//BurgundyPalace//ID",
      "BEGIN:VEVENT", "UID:" + ev.id + "-" + Date.now() + "@undangya",
      "DTSTAMP:" + icsDate(new Date().toISOString()), "DTSTART:" + icsDate(ev.startISO), "DTEND:" + icsDate(ev.endISO),
      "SUMMARY:" + icsEscape(ev.name + " — " + (C.couple ? C.couple.bride.short + " & " + C.couple.groom.short : "")),
      "LOCATION:" + icsEscape(ev.venue + ", " + ev.address), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = ev.id + "-undangan.ics"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  var ec = $("#eventCards");
  (C.events || []).forEach(function (ev) {
    var card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML =
      "<img class='event-banner' src='" + ev.banner + "' alt='' loading='lazy' decoding='async'>" +
      "<div class='event-body'>" +
      "<h3 class='event-name'>" + ev.name + "</h3>" +
      "<p class='event-date'>" + ev.dateLabel + "</p>" +
      "<p class='event-time'><img src='" + A + "icons/clock.svg' alt=''>" + ev.timeLabel + "</p>" +
      "<p class='event-venue'>" + ev.venue + "</p>" +
      "<p class='event-address'>" + ev.address + "</p>" +
      (ev.dresscode ? "<p class='event-dress'>Dresscode: " + ev.dresscode + "</p>" : "") +
      "<div class='event-actions'>" +
      "<button class='btn-burgundy' type='button'><img src='" + A + "icons/calendar.svg' alt=''>Simpan Tanggal</button>" +
      "<a class='btn-outline' target='_blank' rel='noopener' href='https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.mapsQuery || ev.venue) + "'><img src='" + A + "icons/pin.svg' alt=''>Lihat Lokasi</a>" +
      "</div></div>";
    card.querySelector(".btn-burgundy").addEventListener("click", function () { downloadICS(ev); });
    ec.appendChild(card);
  });

  /* ---------- Galeri + Lightbox ---------- */
  var grid = $("#galleryGrid"), lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCaption");
  (C.gallery || []).forEach(function (g) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "gal-tile";
    b.innerHTML = "<img loading='lazy' decoding='async' src='" + g.src + "' alt='" + g.caption.replace(/'/g, "") + "'><span>" + g.caption + "</span>";
    b.addEventListener("click", function () {
      lbImg.src = g.src; lbImg.alt = g.caption; lbCap.textContent = g.caption; lb.hidden = false;
    });
    grid.appendChild(b);
  });
  function closeLb() { lb.hidden = true; lbImg.src = ""; }
  $("#lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

  /* ---------- Amplop digital (demo) + salin ---------- */
  var gc = $("#giftCards");
  ((C.gift && C.gift.items) || []).forEach(function (it) {
    var card = document.createElement("div");
    card.className = "gift-card";
    card.innerHTML = "<p class='gift-type'>" + it.type + "</p><p class='gift-name'>" + it.name + "</p>" +
      "<p class='gift-number'>" + it.number + "</p><p class='gift-holder'>" + it.holder + "</p>" +
      "<button class='btn-gold' type='button'>" + (C.gift && C.gift.demo ? "Salin Nonaktif (Demo)" : "Salin Nomor") + "</button>";
    var btn = card.querySelector("button");
    if (C.gift && C.gift.demo) { btn.disabled = true; btn.title = "Mode demo — salin aktif setelah nomor asli dikonfigurasi"; }
    btn.addEventListener("click", function () {
      var num = it.number.replace(/\s/g, "");
      function ok() { btn.textContent = "✓ Tersalin"; setTimeout(function () { btn.textContent = "Salin Nomor"; }, 2200); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(num).then(ok, function () { fallback(); });
      else fallback();
      function fallback() {
        var ta = document.createElement("textarea"); ta.value = num; document.body.appendChild(ta);
        ta.select(); try { document.execCommand("copy"); ok(); } catch (e) { btn.textContent = num; }
        document.body.removeChild(ta);
      }
    });
    gc.appendChild(card);
  });

  /* ---------- RSVP & Ucapan (demo localStorage) ---------- */
  var LS_KEY = "bp-wishes-v1";
  function loadWishes() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (e) { return []; } }
  function saveWishes(w) { try { localStorage.setItem(LS_KEY, JSON.stringify(w)); } catch (e) {} }
  function esc(s) { return String(s || "").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function renderWishes() {
    var list = $("#wishList"); var wishes = loadWishes();
    if (!wishes.length) {
      list.innerHTML = "<p class='wish-empty'>Belum ada ucapan. Jadilah yang pertama memberikan doa untuk kedua mempelai.</p>";
      return;
    }
    list.innerHTML = wishes.map(function (w) {
      var badge = w.attend === "hadir" ? "<span class='wish-badge'>Hadir</span>"
        : w.attend === "ragu" ? "<span class='wish-badge maybe'>Ragu</span>" : "<span class='wish-badge no'>Berhalangan</span>";
      return "<div class='wish-item'><div class='wish-head'><span class='wish-name'>" + esc(w.name) + "</span>" + badge + "</div>" +
        (w.text ? "<p class='wish-text'>" + esc(w.text) + "</p>" : "") +
        "<p class='wish-time'>" + esc(w.when) + (w.count ? " · " + esc(w.count) + " tamu" : "") + "</p></div>";
    }).join("");
  }
  renderWishes();
  $("#rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#rsvpName").value.trim();
    var err = $("#rsvpError");
    if (name.length < 2) { err.hidden = false; $("#rsvpName").focus(); return; }
    err.hidden = true;
    var wishes = loadWishes();
    wishes.unshift({
      name: name, attend: $("#rsvpAttend").value, count: $("#rsvpCount").value,
      text: $("#rsvpWish").value.trim(),
      when: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
    });
    saveWishes(wishes.slice(0, 60));
    renderWishes();
    var st = $("#rsvpStatus");
    if (st) { st.hidden = false; st.textContent = "Terima kasih, " + name + ". RSVP & ucapanmu tercatat di perangkat ini (mode demo)."; }
    $("#rsvpWish").value = "";
    var btn = e.target.querySelector("button[type=submit]");
    btn.textContent = "✓ Terima Kasih!"; setTimeout(function () { btn.textContent = "Kirim RSVP & Ucapan"; }, 2600);
  });

  /* ---------- Reveal saat scroll ---------- */
  if ("IntersectionObserver" in window && !reduced) {
    document.documentElement.classList.add("js-anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (s) { io.observe(s); });
  }
})();
