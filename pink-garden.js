/* UndangYa! — Pink Garden Fountain · engine (konten dari pink-garden-config.js)
   Timeline SATU loop 16 dtk sesuai storyboard referensi:
   zoom-out 0–5 · kabut 5–5,6 · judul 5,4–6,8 · hold s.d. 11,5 · pulang 11,5–16 · loop */
(function () {
  "use strict";
  var C = window.PINK_GARDEN_CONFIG;
  if (!C) return;
  var A = C.theme.assets;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- isi konten dari config ---------- */
  document.title = C.theme.name + " — " + C.couple.groom.nick + " & " + C.couple.bride.nick + " · UndangYa!";
  $("nameGroom").textContent = C.couple.groom.nick;
  $("nameBride").textContent = C.couple.bride.nick;
  $("dateShort").textContent = C.event.dateShort;
  $("greetingText").textContent = C.event.greeting;
  $("verseText").textContent = "\u201C" + C.verse.text + "\u201D";
  $("verseSource").textContent = C.verse.source;
  $("dateLabel").textContent = C.event.dateLabel;
  $("venueName").textContent = C.event.venue;
  $("venueAddress").textContent = C.event.address;
  $("mapsLink").href = C.event.maps;
  var mapLink = $("mapLink"); if (mapLink) mapLink.href = C.event.maps;
  $("closingText").textContent = C.closing;
  $("signGroom").textContent = C.couple.groom.nick;
  $("signBride").textContent = C.couple.bride.nick;
  $("groomFull").textContent = C.couple.groom.full;
  $("groomParents").textContent = C.couple.groom.parents;
  $("brideFull").textContent = C.couple.bride.full;
  $("brideParents").textContent = C.couple.bride.parents;
  $("groomPhoto").src = A + C.couple.groom.photo; $("groomPhoto").alt = C.couple.groom.photoLabel;
  $("bridePhoto").src = A + C.couple.bride.photo; $("bridePhoto").alt = C.couple.bride.photoLabel;
  $("couplePhoto").src = A + C.couple.photo; $("couplePhoto").alt = C.couple.photoAlt;
  $("giftNote").textContent = C.gift.note;

  var guest = new URLSearchParams(location.search).get("to");
  if (guest) $("guestName").textContent = guest.slice(0, 60);

  C.story.forEach(function (s) {
    var d = document.createElement("article"); d.className = "story-item";
    var dt = document.createElement("p"); dt.className = "s-date"; dt.textContent = s.date;
    var h = document.createElement("h3"); h.textContent = s.title;
    var p = document.createElement("p"); p.textContent = s.text;
    d.append(dt, h, p); $("storyList").appendChild(d);
  });
  C.schedule.forEach(function (s) {
    var d = document.createElement("article"); d.className = "schedule-item";
    var h = document.createElement("h3"); h.textContent = s.name;
    var t = document.createElement("p"); t.className = "s-time"; t.textContent = s.time;
    var n = document.createElement("p"); n.className = "s-note"; n.textContent = s.note;
    d.append(h, t, n); $("scheduleList").appendChild(d);
  });
  C.gallery.forEach(function (g, i) {
    var f = document.createElement("figure");
    var im = document.createElement("img"); im.src = A + g.src; im.alt = g.alt; im.loading = "lazy";
    var cap = document.createElement("figcaption"); cap.textContent = g.cap;
    f.append(im, cap);
    f.addEventListener("click", function () { openLb(A + g.src, g.alt, g.cap); });
    $("gallery").appendChild(f);
  });
  C.gift.accounts.forEach(function (acc) {
    var d = document.createElement("div"); d.className = "gift-item";
    var b = document.createElement("p"); b.className = "g-bank"; b.textContent = acc.bank;
    var n = document.createElement("p"); n.className = "g-num"; n.textContent = acc.number;
    var nm = document.createElement("p"); nm.className = "g-name"; nm.textContent = acc.name;
    var btn = document.createElement("button"); btn.className = "copy-btn"; btn.type = "button"; btn.textContent = "Salin Nomor";
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "✓ Tersalin"; setTimeout(function () { btn.textContent = "Salin Nomor"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(acc.number).then(done, done);
      else done();
    });
    d.append(b, n, nm, btn); $("giftList").appendChild(d);
  });

  /* ---------- sparkle + kelopak ---------- */
  var sp = $("sparkles");
  for (var i = 0; i < 14; i++) {
    var s = document.createElement("i");
    s.style.left = (6 + Math.random() * 88) + "%";
    s.style.top = (30 + Math.random() * 62) + "%";
    s.style.animationDelay = (Math.random() * 2.8) + "s";
    s.style.width = s.style.height = (9 + Math.random() * 10) + "px";
    sp.appendChild(s);
  }
  /* ---------- glints di permukaan air kolam ---------- */
  var gl = $("glints");
  [[18, 30], [38, 62], [55, 26], [70, 55], [84, 34]].forEach(function (pos, i) {
    var g = document.createElement("i");
    g.style.left = pos[0] + "%"; g.style.top = pos[1] + "%";
    g.style.animationDelay = (i * 0.63) + "s";
    g.style.width = g.style.height = (9 + (i % 3) * 3) + "px";
    gl.appendChild(g);
  });

  /* ---------- sulur (vine) SVG: tumbuh saat intro & saat dibuka ---------- */
  (function buildVines() {
    var leafPts = [[24, 52, -30], [13, 118, 24], [27, 182, -22], [15, 248, 28], [26, 312, -26]];
    var leaves = leafPts.map(function (p) {
      return '<ellipse class="leaf" cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="4.2" transform="rotate(' + p[2] + ' ' + p[0] + ' ' + p[1] + ')" fill="#A9BC9B"/>';
    }).join("");
    var blossoms = [[20, 84], [18, 216], [22, 344]].map(function (p) {
      return '<circle class="leaf" cx="' + p[0] + '" cy="' + p[1] + '" r="4.4" fill="#C4708A"/>';
    }).join("");
    var svg = '<svg class="vine vine-l" viewBox="0 0 60 380" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="stem" pathLength="100" d="M14,-4 C34,60 8,124 24,192 C36,246 12,302 26,384"/>' + leaves + blossoms + "</svg>" +
      '<svg class="vine vine-r" viewBox="0 0 60 380" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="stem" pathLength="100" d="M14,-4 C34,60 8,124 24,192 C36,246 12,302 26,384"/>' + leaves + blossoms + "</svg>";
    $("vines").innerHTML = svg;
    if (reduce) $("vines").classList.add("grown");
    else setTimeout(function () { $("vines").classList.add("grown"); }, 2400);
  })();

  /* ---------- bunga mekar berkala (bloom) ---------- */
  var bloomEls = [];
  (function buildBlooms() {
    var petal = "";
    for (var k = 0; k < 5; k++) petal += '<ellipse cx="18" cy="9.5" rx="5.4" ry="8.6" fill="#C4708A" opacity="0.88" transform="rotate(' + (k * 72) + ' 18 18)"/>';
    var svgB = '<svg viewBox="0 0 36 36">' + petal + '<circle cx="18" cy="18" r="4.6" fill="#C8A66B"/><circle cx="18" cy="18" r="2.2" fill="#F6D9A8"/></svg>';
    var spots = [[12, 86.5], [30, 90.5], [52, 87.5], [71, 91], [87, 86]];
    spots.forEach(function (s, i) {
      var b = document.createElement("div");
      b.className = "bloom"; b.innerHTML = svgB;
      b.style.left = s[0] + "%"; b.style.top = s[1] + "%";
      b.style.width = b.style.height = (27 + (i % 3) * 6) + "px";
      $("blooms").appendChild(b); bloomEls.push(b);
    });
    if (reduce) { bloomEls.forEach(function (b) { b.classList.add("on"); }); return; }
    // jadwal mekar berjenjang & berulang — bukan serentak
    bloomEls.forEach(function (b, i) {
      var cycle = function () {
        b.classList.add("on");
        setTimeout(function () { b.classList.remove("on"); }, 5200 + i * 700);
        setTimeout(cycle, 11000 + i * 2300);
      };
      setTimeout(cycle, 2600 + i * 1900);
    });
  })();
  function bloomBurst() { bloomEls.forEach(function (b, i) { setTimeout(function () { b.classList.add("on"); }, i * 160); }); }

  /* ---------- kelopak canvas (seeded, anggaran partikel, kedalaman) ---------- */
  var petalAPI = { gust: function () {} };
  (function petalsCanvas() {
    if (reduce) return;
    var cv = $("petalCanvas"); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d"); if (!ctx) return;
    var stageEl = $("stage");
    var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    function size() {
      var r = stageEl.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size(); window.addEventListener("resize", size);
    var seed = 20261211;
    function rnd() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    var smallScreen = Math.min(window.innerWidth, window.screen.width || 999) < 420;
    var BUDGET = smallScreen ? 13 : 20;
    var COLORS = ["#E9A8BC", "#F3D3DA", "#FDF3F0", "#D98CA6", "#E7C877"];
    function makePetal(anyY) {
      var depth = rnd(); // 0 jauh … 1 dekat
      return {
        x: rnd() * (W || 360), y: anyY ? rnd() * (H || 640) : -20 - rnd() * 90,
        s: 5 + depth * 8, depth: depth,
        vy: 0.32 + depth * 0.55 + rnd() * 0.25,
        ph: rnd() * Math.PI * 2, sw: 0.5 + rnd() * 0.9,
        rot: rnd() * Math.PI * 2, vr: (rnd() - 0.5) * 0.02,
        fl: 0.6 + rnd() * 0.9, c: COLORS[Math.floor(rnd() * COLORS.length)],
        op: 0.5 + depth * 0.5, gust: 0
      };
    }
    var parts = [], i;
    for (i = 0; i < BUDGET; i++) parts.push(makePetal(true));
    petalAPI.gust = function () {
      for (var g = 0; g < 14; g++) {
        var p = makePetal(false);
        p.y = H * (0.55 + rnd() * 0.3); p.x = W * (0.2 + rnd() * 0.6);
        p.gust = 1.6 + rnd() * 1.8; p.vy = -(0.4 + rnd() * 0.9);
        parts.push(p);
      }
    };
    var running = true, last = 0;
    function frame(ts) {
      requestAnimationFrame(frame);
      if (!running || ts - last < 24) return; // ~40fps cap untuk baterai
      last = ts;
      ctx.clearRect(0, 0, W, H);
      var t = ts / 1000;
      for (var j = parts.length - 1; j >= 0; j--) {
        var p = parts[j];
        p.ph += 0.008 * p.sw * 3;
        var drift = Math.sin(t * p.sw + p.ph) * (14 + p.depth * 16);
        p.y += p.vy; p.x += drift * 0.016 + (p.gust ? Math.sin(p.ph * 2) * p.gust : 0);
        if (p.gust) { p.gust *= 0.985; p.vy += 0.012; }
        p.rot += p.vr;
        if (p.y > H + 24) {
          if (parts.length > BUDGET) { parts.splice(j, 1); continue; }
          parts[j] = makePetal(false);
          continue;
        }
        var fx = p.x + drift * 0.35;
        ctx.save();
        ctx.translate(fx, p.y); ctx.rotate(p.rot);
        ctx.scale(1, 0.72 + 0.28 * Math.sin(t * p.fl * 2 + p.ph)); // flutter
        ctx.globalAlpha = p.op;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.moveTo(0, -p.s);
        ctx.bezierCurveTo(p.s * 0.85, -p.s * 0.4, p.s * 0.6, p.s * 0.7, 0, p.s);
        ctx.bezierCurveTo(-p.s * 0.6, p.s * 0.7, -p.s * 0.85, -p.s * 0.4, 0, -p.s);
        ctx.fill();
        ctx.restore();
      }
    }
    requestAnimationFrame(frame);
    // hemat baterai: berhenti saat tab disembunyikan / panggung di luar layar
    document.addEventListener("visibilitychange", function () { running = !document.hidden; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { running = es[0].isIntersecting && !document.hidden; }, { threshold: 0.02 }).observe(stageEl);
    }
  })();

  /* ---------- countdown + kalender mini ---------- */
  var target = new Date(C.event.dateISO).getTime();
  function pad(n) { return String(n).padStart(2, "0"); }
  if (isNaN(target)) {
    // tanggal config tidak valid → jangan tampilkan hitungan menyesatkan
    $("countdown").style.display = "none";
    $("cdPassed").textContent = "Tanggal acara akan segera diumumkan.";
    $("cdPassed").classList.remove("hidden");
    $("miniCal").style.display = "none";
    $("btnIcs").style.display = "none";
  }
  function setCd(id, val) {
    var el = $(id);
    if (el.textContent !== String(val)) {
      el.textContent = val;
      if (!reduce) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
    }
  }
  function tick() {
    if (isNaN(target)) return;
    var diff = target - Date.now();
    if (diff <= 0) {
      setCd("cdD", "0"); setCd("cdH", "00"); setCd("cdM", "00"); setCd("cdS", "00");
      $("cdPassed").classList.remove("hidden"); return;
    }
    setCd("cdD", Math.floor(diff / 864e5));
    setCd("cdH", pad(Math.floor(diff / 36e5) % 24));
    setCd("cdM", pad(Math.floor(diff / 6e4) % 60));
    setCd("cdS", pad(Math.floor(diff / 1e3) % 60));
  }
  tick(); setInterval(tick, 1000);

  (function calendar() {
    if (isNaN(target)) return;
    var d = new Date(C.event.dateISO);
    var year = d.getFullYear(), month = d.getMonth(), day = d.getDate();
    var first = new Date(year, month, 1).getDay();
    var days = new Date(year, month + 1, 0).getDate();
    var names = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var html = "<h4>" + names[month] + " " + year + "</h4><table><tr><th>Min</th><th>Sen</th><th>Sel</th><th>Rab</th><th>Kam</th><th>Jum</th><th>Sab</th></tr><tr>";
    var cell = 0;
    for (var e = 0; e < first; e++) { html += "<td></td>"; cell++; }
    for (var dd = 1; dd <= days; dd++) {
      html += '<td' + (dd === day ? ' class="mark"' : "") + ">" + dd + "</td>"; cell++;
      if (cell % 7 === 0 && dd < days) html += "</tr><tr>";
    }
    html += "</tr></table>";
    $("miniCal").innerHTML = html;
  })();

  $("btnIcs").addEventListener("click", function () {
    if (isNaN(target)) return;
    var d = new Date(C.event.dateISO);
    var end = new Date(d.getTime() + 4 * 36e5);
    function fmt(x) { return x.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; }
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UndangYa//PinkGarden//ID", "BEGIN:VEVENT",
      "UID: pink-garden-" + d.getTime() + "@undangya", "DTSTAMP:" + fmt(new Date()),
      "DTSTART:" + fmt(d), "DTEND:" + fmt(end),
      "SUMMARY:The Wedding of " + C.couple.groom.nick + " & " + C.couple.bride.nick,
      "LOCATION:" + C.event.venue + ", " + C.event.address, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "save-the-date-fahrezzi-meyzsa.ics"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  });

  /* ---------- lightbox (keyboard, swipe, prev/next, fokus kembali) ---------- */
  var lbIndex = 0, lbReturnFocus = null;
  function showLb(i) {
    lbIndex = (i + C.gallery.length) % C.gallery.length;
    var g = C.gallery[lbIndex];
    $("lbImg").src = A + g.src; $("lbImg").alt = g.alt; $("lbCap").textContent = g.cap;
  }
  function openLb(src, alt, cap) {
    var idx = C.gallery.findIndex(function (g) { return A + g.src === src; });
    lbReturnFocus = document.activeElement;
    showLb(idx < 0 ? 0 : idx);
    $("lightbox").classList.remove("hidden");
    $("lbClose").focus();
  }
  function closeLb() {
    $("lightbox").classList.add("hidden");
    if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus();
  }
  $("lbClose").addEventListener("click", closeLb);
  $("lbPrev").addEventListener("click", function () { showLb(lbIndex - 1); });
  $("lbNext").addEventListener("click", function () { showLb(lbIndex + 1); });
  $("lightbox").addEventListener("click", function (e) { if (e.target === this) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if ($("lightbox").classList.contains("hidden")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    else if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });
  var touchX = null;
  $("lightbox").addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  $("lightbox").addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 42) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- RSVP & buku tamu (DEMO localStorage) ---------- */
  var KEY = "pgf-rsvp-v1";
  function loadWishes() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function renderWishes() {
    var box = $("wishes"); box.innerHTML = "";
    loadWishes().slice().reverse().forEach(function (w) {
      var d = document.createElement("div"); d.className = "wish";
      var head = document.createElement("div"); head.className = "w-head";
      var n = document.createElement("span"); n.className = "w-name"; n.textContent = w.name;
      var at = document.createElement("span"); at.className = "w-att";
      at.textContent = w.attend === "hadir" ? "Hadir" : w.attend === "ragu" ? "Masih ragu" : "Berhalangan";
      var p = document.createElement("p"); p.textContent = w.msg;
      head.append(n, at); d.append(head, p); box.appendChild(d);
    });
  }
  renderWishes();
  $("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("fName").value.trim(), msg = $("fMsg").value.trim();
    if (!name || !msg) { $("formError").classList.remove("hidden"); return; }
    $("formError").classList.add("hidden");
    var list = loadWishes();
    list.push({ name: name.slice(0, 60), attend: $("fAttend").value, msg: msg.slice(0, 400), at: Date.now() });
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (err) {}
    $("fMsg").value = ""; renderWishes();
  });

  /* ---------- musik latar: file bersama Petals on the Stone Floor ---------- */
  var bgm = document.getElementById("bgmShared"), playing = false;
  function syncMusicBtn() {
    $("btnMusic").textContent = playing ? "♪ Musik: Nyala" : "♪ Musik: Mati";
    $("btnMusic").setAttribute("aria-pressed", playing ? "true" : "false");
  }
  if (bgm) {
    bgm.addEventListener("play", function () { playing = true; syncMusicBtn(); });
    bgm.addEventListener("pause", function () { playing = false; syncMusicBtn(); });
  }
  function toggleMusic() {
    if (!bgm) return;
    if (playing) bgm.pause();
    else { try { var p = bgm.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
  }
  $("btnMusic").addEventListener("click", toggleMusic);

  /* ---------- buka undangan ---------- */
  var opened = false;
  $("btnOpen").addEventListener("click", function () {
    if (opened) return; opened = true;
    document.body.classList.remove("locked"); document.body.classList.add("opened");
    $("content").setAttribute("aria-hidden", "false");
    /* Momen Aktivasi Taman: embusan kelopak + sulur tumbuh + bunga mekar + kilau air */
    petalAPI.gust();
    $("vines").classList.add("grown");
    bloomBurst();
    if (window.gsap && !reduce) {
      gsap.fromTo(".layer-glow", { opacity: 0.95, scale: 1.12 }, { opacity: 0.55, scale: 1, duration: 1.6, ease: "power2.out", transformOrigin: "50% 100%" });
    }
    setTimeout(function () {
      $("coverCard").style.opacity = "0.35";
      if ($("salam").scrollIntoView) $("salam").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }, reduce ? 0 : 650);
  });

  /* ---------- scroll reveal: kontainer + anak-anak berjenjang ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    document.body.classList.add("js-anim");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    document.querySelectorAll(".sec-inner").forEach(function (inner) {
      Array.prototype.forEach.call(inner.children, function (child, idx) {
        child.classList.add("rv");
        child.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
        io.observe(child);
      });
    });
    /* transisi tulisan: judul section naik per kata */
    document.querySelectorAll(".sec-inner h2").forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      h.textContent = "";
      words.forEach(function (w, i) {
        var wrap = document.createElement("span"); wrap.className = "w-wrap";
        var inn = document.createElement("span"); inn.className = "w-in";
        inn.textContent = w; inn.style.transitionDelay = (i * 90) + "ms";
        wrap.appendChild(inn); h.appendChild(wrap);
        h.appendChild(document.createTextNode(" "));
      });
      io.observe(h);
    });
    /* transisi tulisan: paragraf & subjudul fokus-melembut berjenjang */
    document.querySelectorAll("#content p, #content h3, #content h4, #content blockquote").forEach(function (el, idx) {
      if (el.closest(".sec-inner h2")) return;
      el.classList.add("tx");
      el.style.transitionDelay = Math.min((idx % 6) * 55, 330) + "ms";
      io.observe(el);
    });
  }

  /* ---------- TIMELINE LOOP 16 dtk (GSAP) ---------- */
  var stage = $("stage");
  function finalState() {
    stage.classList.add("final-state");
    if (window.gsap) {
      gsap.set("#world", { scale: 1 });
      gsap.set(".layer-flowers", { yPercent: 0, y: 0, opacity: 1 });
      gsap.set(".layer-canopy", { yPercent: 0, y: 0, opacity: 1 });
      gsap.set(".layer-mist", { opacity: 0.5 });
      gsap.set("[data-line]", { opacity: 1, y: 0 });
    }
    $("btnSkip").classList.add("hidden"); $("btnReplay").classList.remove("hidden");
  }
  var tl = null;
  function buildTimeline() {
    if (!window.gsap) { finalState(); return; }
    stage.classList.remove("final-state");
    gsap.killTweensOf(".layer-canopy"); gsap.killTweensOf(".layer-flowers"); gsap.killTweensOf(".layer-glow");
    tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });
    /* 0–5 zoom-out: dunia menyusut dari framing dekat */
    tl.fromTo("#world", { scale: 1.42 }, { scale: 1, duration: 5 }, 0);
    tl.fromTo(".layer-flowers", { yPercent: 46, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 3.4 }, 1.2);
    tl.fromTo(".layer-canopy", { yPercent: -52, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 3.4 }, 1.2);
    /* 5–5,6 kabut putih di zona judul */
    tl.to(".layer-mist", { opacity: 0.55, duration: 0.7 }, 5.0);
    /* 5,4–6,8 judul masuk berjenjang */
    tl.fromTo("[data-line]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.32, ease: "power2.out" }, 5.4);
    /* hold sampai 11,5 (timeline berjalan kosong) */
    tl.to({}, { duration: 4.4 }, 7.1);
    /* 11,5–13 judul keluar + kabut hilang */
    tl.to("[data-line]", { opacity: 0, y: -10, duration: 0.8, ease: "power2.in" }, 11.5);
    tl.to(".layer-mist", { opacity: 0, duration: 0.9 }, 11.6);
    /* 12,4–16 zoom-in pulang ke framing awal */
    tl.to("#world", { scale: 1.42, duration: 3.6 }, 12.4);
    tl.to(".layer-flowers", { yPercent: 46, opacity: 0, duration: 3.2 }, 12.6);
    tl.to(".layer-canopy", { yPercent: -52, opacity: 0, duration: 3.2 }, 12.6);
    /* goyangan hidup: rotasi terpisah dari yPercent timeline — GSAP menggabungkan transform */
    gsap.to(".layer-canopy", { rotation: 1.5, transformOrigin: "50% 0%", duration: 4.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 5 });
    gsap.to(".layer-flowers", { rotation: -1.1, transformOrigin: "50% 100%", duration: 5.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 5 });
    gsap.to(".layer-glow", { opacity: 0.68, duration: 3.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 6.6 });
  }
  /* jeda timeline saat tab disembunyikan — hemat baterai */
  document.addEventListener("visibilitychange", function () {
    if (!tl) return;
    if (document.hidden) tl.pause(); else tl.resume();
  });
  if (reduce || !window.gsap) {
    /* tunggu sekejap bila gsap masih dimuat (defer) */
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (window.gsap || tries > 12) {
        clearInterval(iv);
        if (reduce || !window.gsap) finalState(); else buildTimeline();
      }
    }, 120);
  } else buildTimeline();

  /* ---------- parallax penunjuk halus (desktop non-sentuh) ---------- */
  (function parallax() {
    if (reduce || !window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
    var wrap = $("pwrap"), tx = 0, ty = 0, cx = 0, cy = 0;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 10;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 7;
    });
    stage.addEventListener("pointerleave", function () { tx = 0; ty = 0; });
    (function loop() {
      requestAnimationFrame(loop);
      if (document.hidden) return;
      cx += (tx - cx) * 0.045; cy += (ty - cy) * 0.045;
      if (Math.abs(cx) > 0.05 || Math.abs(cy) > 0.05) wrap.style.transform = "translate(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px)";
    })();
  })();

  $("btnSkip").addEventListener("click", function () { if (tl) { tl.kill(); tl = null; } finalState(); });
  $("btnReplay").addEventListener("click", function () {
    if (tl) tl.kill();
    $("btnReplay").classList.add("hidden"); $("btnSkip").classList.remove("hidden");
    if (window.gsap) { gsap.set("[data-line]", { clearProps: "all" }); }
    buildTimeline();
  });
})();
