/* ============================================================
   UndangYa! — PENINGKATAN ANIMASI KELOMPOK A (additive, 2026-11-10)
   taman-rahasia · javanese-illustrated · masjid-bunga ·
   pink-garden-fountain · bali-pastel
   TIDAK menyentuh musik (#bgmShared / handler musik), harga,
   checkout, auth, atau data kanonis. Masjid Bunga: TIDAK ada
   animasi waterfall/pool (sesuai keputusan user sebelumnya).
   ============================================================ */
(function () {
  "use strict";
  /* tunggu DOM siap: beberapa tema (Bali) membangun galeri saat DOMContentLoaded */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initUpgradeA(); });
  } else { initUpgradeA(); }
  function initUpgradeA() {
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- deteksi tema dari config global existing ---------- */
  var slug = null;
  if (window.MASJID_CONFIG) slug = "masjid-bunga";
  else if (window.JAVANESE_CONFIG) slug = "javanese-illustrated";
  else if (window.PINK_GARDEN_CONFIG) slug = "pink-garden-fountain";
  else if (window.BALI_CONFIG) slug = "bali-pastel";
  else if (document.getElementById("gCover")) slug = "taman-rahasia";
  if (!slug) return;
  document.body.classList.add("upx", "upx-" + slug);

  var COVER_INNER = {
    "taman-rahasia": "#gCover .arch",
    "javanese-illustrated": "#titleBlock",
    "masjid-bunga": "#titleBlock",
    "pink-garden-fountain": "#coverCard",
    "bali-pastel": "#cover .cover-ui"
  };
  var SWAY_SEL = {
    "taman-rahasia": ".plx-leaf",
    "javanese-illustrated": ".flowers-fg, .garden-band",
    "masjid-bunga": ".flowerbed, .fcluster-left, .fcluster-right",
    "pink-garden-fountain": ".branch-wide, .branch-corner-w",
    "bali-pastel": ".sprig"
  };

  /* ---------- 1) Pembuka sinematik berjenjang ---------- */
  var coverInner = document.querySelector(COVER_INNER[slug]);
  if (coverInner && !reduced) {
    coverInner.classList.add("upx-stage-in");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.body.classList.add("upx-open"); });
    });
    /* failsafe: jangan pernah meninggalkan sampul tersembunyi */
    setTimeout(function () {
      document.body.classList.add("upx-open");
      coverInner.classList.remove("upx-stage-in");
    }, 2400);
  }

  /* ---------- 2) Reveal scroll bervariasi ---------- */
  var RV_SEL = ".gallery > *, #galGrid > *, #gStrip figure, .g-event, .cd-box, " +
               ".countdown > div, .cd > div, article, figure.story-fig, .veil";
  var rvEls = [];
  document.querySelectorAll("main section, main .sec, .g-section").forEach(function (sec) {
    var idx = 0;
    sec.querySelectorAll(RV_SEL).forEach(function (el) {
      if (el.dataset.upxRv || el.closest(".upx-ambient")) return;
      /* lewati elemen yang sudah menjadi target reveal utama section */
      if (el.classList.contains("rv") || el.classList.contains("reveal")) return;
      el.dataset.upxRv = "1";
      if (!reduced) {
        var variants = ["upx-rv-l", "upx-rv-u", "upx-rv-r", "upx-rv-z", "upx-rv-rot", "upx-rv-u"];
        el.classList.add("upx-rv", variants[idx % variants.length]);
        el.style.setProperty("--upx-d", Math.min((idx % 5) * 70, 280) + "ms");
      } else {
        el.classList.add("upx-in");
      }
      rvEls.push(el); idx++;
    });
  });
  if (!reduced && "IntersectionObserver" in window) {
    var rvIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("upx-in"); rvIO.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rvEls.forEach(function (el) { rvIO.observe(el); });
    setTimeout(function () { /* failsafe visibilitas */
      rvEls.forEach(function (el) { el.classList.add("upx-in"); });
    }, 6000);
  } else {
    rvEls.forEach(function (el) { el.classList.add("upx-in"); });
  }

  /* ---------- 3) Ambient khas tema (partikel CSS, terus bergerak) ---------- */
  var ambient = null;
  if (!reduced) {
    ambient = document.createElement("div");
    ambient.className = "upx-ambient";
    ambient.setAttribute("aria-hidden", "true");
    var N = slug === "masjid-bunga" ? 16 : 13;
    for (var i = 0; i < N; i++) {
      var p = document.createElement("span");
      var isDot = i % 3 === 2;
      p.className = "upx-p " + (isDot ? "upx-shape-dot" : "upx-shape-petal");
      var size = isDot ? 4 + Math.random() * 4 : 8 + Math.random() * 9;
      p.style.left = (Math.random() * 97) + "vw";
      p.style.width = size + "px";
      p.style.height = (isDot ? size : size * 0.82) + "px";
      p.style.animationDuration = (11 + Math.random() * 10) + "s";
      p.style.animationDelay = (-Math.random() * 18) + "s";
      p.style.opacity = (0.45 + Math.random() * 0.4).toFixed(2);
      var inner = document.createElement("i");
      inner.style.animationDuration = (2.6 + Math.random() * 2.4) + "s";
      p.appendChild(inner);
      ambient.appendChild(p);
    }
    document.body.appendChild(ambient);
  }

  /* ---------- 4) Flora sway ---------- */
  if (!reduced && SWAY_SEL[slug]) {
    document.querySelectorAll(SWAY_SEL[slug]).forEach(function (el, i) {
      el.classList.add("upx-sway");
      el.style.animationDelay = (i * -1.3) + "s";
    });
  }

  /* ---------- 5) Parallax 2 lapis di section utama ---------- */
  var plxPairs = [];
  if (!reduced) {
    document.querySelectorAll("main section, .g-section").forEach(function (sec) {
      if (getComputedStyle(sec).position === "static") sec.style.position = "relative";
      var back = document.createElement("div");
      back.className = "upx-plx upx-plx-back"; back.setAttribute("aria-hidden", "true");
      var front = document.createElement("div");
      front.className = "upx-plx upx-plx-front"; front.setAttribute("aria-hidden", "true");
      sec.insertBefore(front, sec.firstChild);
      sec.insertBefore(back, sec.firstChild);
      plxPairs.push({ sec: sec, back: back, front: front, visible: false });
    });
    if ("IntersectionObserver" in window) {
      var plxIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          plxPairs.forEach(function (pr) { if (pr.sec === en.target) pr.visible = en.isIntersecting; });
        });
      }, { threshold: 0 });
      plxPairs.forEach(function (pr) { plxIO.observe(pr.sec); });
    } else {
      plxPairs.forEach(function (pr) { pr.visible = true; });
    }
    var ticking = false;
    function updatePlx() {
      ticking = false;
      var vh = window.innerHeight || 800;
      plxPairs.forEach(function (pr) {
        if (!pr.visible) return;
        var r = pr.sec.getBoundingClientRect();
        var prog = (r.top + r.height / 2 - vh / 2);
        pr.back.style.transform = "translate3d(0," + (prog * 0.05).toFixed(1) + "px,0)";
        pr.front.style.transform = "translate3d(0," + (prog * -0.09).toFixed(1) + "px,0)";
      });
    }
    function onScrollPlx() { if (!ticking) { ticking = true; requestAnimationFrame(updatePlx); } }
    window.addEventListener("scroll", onScrollPlx, { passive: true });
    window.addEventListener("resize", onScrollPlx);
    onScrollPlx();
  }

  /* ---------- 6) Mikro-interaksi tombol: kilau + denyut ---------- */
  document.querySelectorAll("#gOpen, #btnOpen, #openBtn, .btn-shine, .g-btn, .btn, .btn-open").forEach(function (b) {
    b.classList.add("upx-shine");
  });
  document.querySelectorAll("#gOpen, #btnOpen, #openBtn").forEach(function (b) {
    if (!reduced) b.classList.add("upx-pulse");
  });

  /* ---------- 7) Countdown pop saat angka berubah ---------- */
  var cdRoot = document.getElementById("countdown") || document.getElementById("flipRow");
  if (cdRoot && "MutationObserver" in window) {
    var cdMO = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        var t = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        var num = t && t.closest ? (t.closest("b, span, .flip-card") || t) : null;
        if (num && num.classList) {
          num.classList.remove("upx-pop");
          void num.offsetWidth;
          num.classList.add("upx-pop");
        }
      });
    });
    cdMO.observe(cdRoot, { subtree: true, childList: true, characterData: true });
  }

  /* ---------- 8) Galeri: kelas zoom + tap-to-enlarge micro ---------- */
  var galItems = document.querySelectorAll(".gallery > *, #galGrid > *, #gStrip figure");
  galItems.forEach(function (f) {
    f.classList.add("upx-gal");
    f.addEventListener("pointerdown", function () {
      f.classList.add("upx-tap");
      setTimeout(function () { f.classList.remove("upx-tap"); }, 550);
    });
  });

  /* ---------- status untuk pengujian ---------- */
  window.__upx = {
    slug: slug,
    reduced: reduced,
    ambientCount: ambient ? ambient.children.length : 0,
    rvCount: rvEls.length,
    plxSections: plxPairs.length,
    galCount: galItems.length,
    revealedCount: function () { return document.querySelectorAll(".upx-rv.upx-in").length; }
  };
  }
})();
