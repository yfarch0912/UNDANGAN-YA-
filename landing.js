/* UndangYa! — Landing produksi (landing.js)
   Mandiri: navigasi mobile, hitung mundur live, filter tema, tahun footer, reveal.
   Tanpa JS per-frame; hitung mundur diperbarui tiap 1 detik. */
(function () {
  "use strict";

  /* tahun footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* navigasi mobile */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* hitung mundur LIVE ke 2027-06-12T08:00:00+07:00 */
  var target = new Date("2027-06-12T08:00:00+07:00").getTime();
  var el = {
    d: document.getElementById("cd-d"),
    h: document.getElementById("cd-h"),
    m: document.getElementById("cd-m"),
    s: document.getElementById("cd-s")
  };
  if (el.d && el.h && el.m && el.s) {
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var diff = Math.max(0, target - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.d.textContent = String(d);
      el.h.textContent = pad(h);
      el.m.textContent = pad(m);
      el.s.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* filter tema menurut kelas */
  var chips = document.querySelectorAll(".theme-filters .chip");
  var cards = document.querySelectorAll("#themeGrid .theme-card");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var f = chip.getAttribute("data-filter");
      cards.forEach(function (card) {
        card.style.display = (f === "semua" || card.getAttribute("data-class") === f) ? "" : "none";
      });
    });
  });

  /* scroll reveal (CSS transition; hormati prefers-reduced-motion) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".rv");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (i) { i.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
    items.forEach(function (i) { io.observe(i); });
    setTimeout(function () { items.forEach(function (i) { i.classList.add("in"); }); }, 1200);
  }
})();
