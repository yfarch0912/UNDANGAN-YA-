/* Taman Rahasia — mesin interaktif (original) */
(function () {
  var C = window.UNDANGAN_CONFIG;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toast(msg) {
    var t = $('gToast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function copyText(text, ok) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { toast(ok); }).catch(function () { toast(text); });
    else toast(text);
  }
  function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

  /* ---------- Data ---------- */
  var guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0, 80);
  if (guest) $('gGuest').textContent = guest;
  $('pBride').src = C.bride.photo; $('pGroom').src = C.groom.photo;
  $('nBride').textContent = C.bride.full; $('nGroom').textContent = C.groom.full;
  $('parBride').textContent = C.bride.order + ' ' + C.bride.father + ' & ' + C.bride.mother;
  $('parGroom').textContent = C.groom.order + ' ' + C.groom.father + ' & ' + C.groom.mother;

  $('gEvents').innerHTML = C.events.map(function (e) {
    return '<article class="g-event tilt"><h4>' + e.name + '</h4><p class="day">' + e.day + '</p>' +
      '<p><b>' + e.dateLabel + '</b><br>' + e.time + '</p><p><b>' + e.venue + '</b><br><span style="color:var(--g-mute)">' + e.address + '</span></p>' +
      '<a class="g-link" target="_blank" rel="noopener" href="' + e.maps + '">📍 Lihat Lokasi</a></article>';
  }).join('');

  $('gGifts').innerHTML = C.gifts.map(function (g) {
    return '<article class="g-event tilt"><h4>' + g.bank + '</h4><p class="day" style="font-size:1.7rem;letter-spacing:.1em">' + g.number + '</p>' +
      '<p>a.n. ' + g.holder + '</p><button class="g-copy" data-num="' + g.number + '" type="button">Salin Nomor</button></article>';
  }).join('');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.g-copy'); if (b) copyText(b.dataset.num, 'Nomor tersalin 🌸');
  });

  var stripImgs = C.gallerySeeds.map(function (s, i) { return { src: 'https://picsum.photos/seed/' + s + '/620/760', cap: 'Momen ke-' + (i + 1) + ' di taman kami' }; });
  $('gStrip').innerHTML = stripImgs.map(function (g, i) {
    return '<figure data-i="' + i + '"><img src="' + g.src + '" alt="' + g.cap + '" loading="lazy"><figcaption>' + g.cap + '</figcaption></figure>';
  }).join('');

  /* ---------- Kelopak interaktif (canvas) ---------- */
  var canvas = $('petals'), ctx = canvas.getContext('2d');
  var W = 0, H = 0, petals = [], bursts = [];
  var PALETTES = {
    pagi: ['#a8d5a2', '#f7c8d8', '#fff1a8', '#bfe3ff'],
    senja: ['#f2a7bb', '#f7c873', '#e8836b', '#f9d976'],
    malam: ['#e8a2bf', '#b79ae0', '#8fb8dd', '#f2d38a']
  };
  var pointer = { x: -999, y: -999, t: 0 };
  function sizeCanvas() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  sizeCanvas(); addEventListener('resize', sizeCanvas);
  function newPetal(x, y, burst) {
    var mode = document.body.dataset.mode || 'senja';
    var pal = PALETTES[mode] || PALETTES.senja;
    return {
      x: x != null ? x : Math.random() * W, y: y != null ? y : -20,
      s: 5 + Math.random() * 8, a: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .03,
      vy: burst ? (Math.random() - .8) * 3 : .5 + Math.random() * .9,
      vx: burst ? (Math.random() - .5) * 4 : (Math.random() - .5) * .4,
      ph: Math.random() * Math.PI * 2, c: pal[(Math.random() * pal.length) | 0], life: burst ? 90 : Infinity
    };
  }
  for (var i = 0; i < 34; i++) { var p0 = newPetal(); p0.y = Math.random() * H; petals.push(p0); }
  addEventListener('pointermove', function (e) { pointer.x = e.clientX; pointer.y = e.clientY; pointer.t = Date.now(); }, { passive: true });
  addEventListener('pointerdown', function (e) {
    for (var j = 0; j < 10; j++) bursts.push(newPetal(e.clientX, e.clientY, true));
  }, { passive: true });

  function drawPetal(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.globalAlpha = .85;
    ctx.beginPath(); ctx.moveTo(0, -p.s);
    ctx.bezierCurveTo(p.s * .9, -p.s * .4, p.s * .7, p.s * .7, 0, p.s);
    ctx.bezierCurveTo(-p.s * .7, p.s * .7, -p.s * .9, -p.s * .4, 0, -p.s);
    ctx.fill(); ctx.restore();
  }
  function stepPetal(p, isBurst) {
    p.ph += .02; p.a += p.spin;
    p.x += p.vx + Math.sin(p.ph) * .6; p.y += p.vy;
    var dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy;
    if (d2 < 8100 && Date.now() - pointer.t < 2500) { var d = Math.sqrt(d2) || 1; p.x += dx / d * 2.4; p.y += dy / d * 2.4; }
    if (isBurst) { p.vy += .05; p.life--; }
    if (p.y > H + 30) { p.y = -20; p.x = Math.random() * W; }
    if (p.x > W + 30) p.x = -20; if (p.x < -30) p.x = W + 20;
  }
  (function loop() {
    requestAnimationFrame(loop);
    if (reduce) return;
    ctx.clearRect(0, 0, W, H);
    petals.forEach(function (p) { stepPetal(p, false); drawPetal(p); });
    bursts = bursts.filter(function (p) { stepPetal(p, true); drawPetal(p); return p.life > 0 && p.y < H + 40; });
  })();

  /* ---------- Kupu-kupu ---------- */
  var bfBox = $('butterflies'), bfs = [];
  ['🦋', '🦋', '🐝'].forEach(function (e, i) {
    var s = document.createElement('span'); s.className = 'bfly'; s.textContent = e;
    bfBox.appendChild(s);
    bfs.push({ el: s, bx: 15 + i * 30, by: 18 + i * 16, ph: i * 2.1, sp: .35 + i * .08 });
  });
  (function fly() {
    requestAnimationFrame(fly);
    if (reduce) return;
    var t = Date.now() / 1000;
    bfs.forEach(function (b) {
      var tx = b.bx + Math.sin(t * b.sp + b.ph) * 12;
      var ty = b.by + Math.cos(t * b.sp * 1.3 + b.ph) * 9;
      if (Date.now() - pointer.t < 3200 && pointer.x > 0) {
        tx = (pointer.x / innerWidth) * 100 * .55 + tx * .45;
        ty = (pointer.y / innerHeight) * 100 * .55 + ty * .45;
      }
      b.el.style.transform = 'translate(' + (tx / 100) * innerWidth / 16 + 'px,' + (ty / 100) * innerHeight / 16 + 'px)';
      b.el.style.left = (tx * .82) + 'vw'; b.el.style.top = (ty * .8) + 'vh';
    });
  })();

  /* ---------- Parallax + sulur progres ---------- */
  var vinePath = $('vinePath'), vineLen = 0;
  try { vineLen = vinePath.getTotalLength(); vinePath.style.strokeDasharray = vineLen; vinePath.style.strokeDashoffset = vineLen; } catch (e) {}
  function onScroll() {
    var max = Math.max(1, document.body.scrollHeight - innerHeight);
    var pr = Math.min(1, (scrollY || 0) / max);
    if (vineLen) vinePath.style.strokeDashoffset = vineLen * (1 - pr);
    $('vineFlower').style.top = 'calc(' + (pr * 96) + '% - 10px)';
    document.querySelectorAll('[data-plx]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      var off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.plx);
      el.style.transform = 'translateY(' + (-off) + 'px)';
    });
  }
  addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });

  /* ---------- Reveal & tilt ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  if (matchMedia('(pointer: fine)').matches) {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.tilt');
      document.querySelectorAll('.tilt').forEach(function (el) { if (el !== card) el.style.transform = ''; });
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.transform = 'perspective(800px) rotateX(' + (((e.clientY - r.top) / r.height - .5) * -9) + 'deg) rotateY(' + (((e.clientX - r.left) / r.width - .5) * 11) + 'deg)';
    }, { passive: true });
  }

  /* ---------- Countdown flip ---------- */
  var target = new Date(C.weddingISO).getTime(), last = {};
  function setUnit(u, v) {
    var s = String(v).padStart(2, '0');
    var card = document.querySelector('.flip[data-unit="' + u + '"] .flip-card');
    var span = card.querySelector('span');
    if (last[u] !== s) { span.textContent = s; card.classList.remove('tick'); void card.offsetWidth; card.classList.add('tick'); last[u] = s; }
  }
  function tick() {
    var d = Math.max(0, target - Date.now());
    setUnit('d', Math.floor(d / 864e5)); setUnit('h', Math.floor(d / 36e5) % 24);
    setUnit('m', Math.floor(d / 6e4) % 60); setUnit('s', Math.floor(d / 1e3) % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Mode pagi / senja / malam ---------- */
  document.querySelector('.mode-bar').addEventListener('click', function (e) {
    var b = e.target.closest('[data-setmode]'); if (!b) return;
    document.body.dataset.mode = b.dataset.setmode;
    document.querySelectorAll('[data-setmode]').forEach(function (x) { x.classList.toggle('on', x === b); });
    toast(b.dataset.setmode === 'pagi' ? 'Selamat pagi di taman kami 🌤️' : b.dataset.setmode === 'malam' ? 'Malam berbintang di taman kami 🌙' : 'Senja keemasan di taman kami 🌇');
  });

  /* ---------- Strip galeri: seret + lightbox ---------- */
  var strip = $('gStrip'), drag = null;
  strip.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, sl: strip.scrollLeft, moved: false }; strip.classList.add('dragging'); });
  addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - drag.x; if (Math.abs(dx) > 6) drag.moved = true; strip.scrollLeft = drag.sl - dx; });
  addEventListener('pointerup', function (e) {
    if (drag && !drag.moved) {
      var fig = e.target.closest && e.target.closest('figure[data-i]');
      if (fig) { $('glImg').src = stripImgs[+fig.dataset.i].src.replace('/620/760', '/1100/900'); $('gLightbox').hidden = false; }
    }
    drag = null; strip.classList.remove('dragging');
  });
  $('glClose').onclick = function () { $('gLightbox').hidden = true; };

  /* ---------- Kebun Doa ---------- */
  var GKEY = 'taman_rahasia_garden_v1', WKEY = 'taman_rahasia_wishes_v1';
  var BLOOMS = ['🌸', '🌷', '🌹', '🌻', '🌼', '🪷', '💐'];
  function load(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var plot = $('plot');
  function plantFlower(xPct, yPct, label, bloom) {
    var f = document.createElement('div'); f.className = 'flower';
    f.style.left = 'calc(' + xPct + '% - 14px)';
    f.style.bottom = (100 - yPct) * .32 + '%';
    var stemH = 18 + Math.random() * 26;
    f.innerHTML = '<span class="bloom">' + (bloom || BLOOMS[(Math.random() * BLOOMS.length) | 0]) + '</span>' +
      '<span class="stem" style="height:' + stemH + 'px"></span>' +
      (label ? '<span class="fname">' + esc(label) + '</span>' : '');
    plot.appendChild(f);
    if (load(GKEY).length + load(WKEY).length > 0) $('plotHint').style.display = 'none';
    return f;
  }
  load(GKEY).forEach(function (f) { plantFlower(f.x, f.y, f.label, f.bloom); });
  load(WKEY).forEach(function (w) { plantFlower(w.x, w.y, w.name, w.bloom); });
  if (load(GKEY).length + load(WKEY).length) $('plotHint').style.display = 'none';

  plot.addEventListener('click', function (e) {
    if (e.target.closest('.flower')) return;
    var r = plot.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100;
    if (y < 55) { toast('Tanamlah di tanahnya ya — bagian bawah kebun 🌱'); return; }
    var bloom = BLOOMS[(Math.random() * BLOOMS.length) | 0];
    plantFlower(x, y, '', bloom);
    var g = load(GKEY); g.push({ x: x, y: y, bloom: bloom }); save(GKEY, g);
    $('plotHint').style.display = 'none';
    toast('Bungamu mekar di kebun kami ' + bloom);
  });

  function renderWishes() {
    var list = load(WKEY);
    $('gWishes').innerHTML = list.slice().reverse().slice(0, 10).map(function (w) {
      return '<div class="g-wish">' + w.bloom + ' <b>' + esc(w.name) + '</b> <span>· ' + esc(w.attend) + '</span><p>' + esc(w.message || '—') + '</p></div>';
    }).join('');
  }
  renderWishes();
  $('wishForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(e.target);
    var bloom = BLOOMS[(Math.random() * BLOOMS.length) | 0];
    var w = { name: String(f.get('name')), attend: String(f.get('attend')), message: String(f.get('message')), bloom: bloom, x: 8 + Math.random() * 84, y: 62 + Math.random() * 30 };
    var list = load(WKEY); list.push(w); save(WKEY, list);
    plantFlower(w.x, w.y, w.name, bloom);
    $('plotHint').style.display = 'none';
    renderWishes(); e.target.reset();
    plot.scrollIntoView({ behavior: 'smooth', block: 'center' });
    toast('Terima kasih! Ucapamu mekar sebagai ' + bloom);
  });

  /* ---------- Buka undangan ---------- */
  $('gOpen').addEventListener('click', function () {
    var cover = $('gCover'), content = $('gContent');
    for (var j = 0; j < 16; j++) bursts.push(newPetal(innerWidth / 2, innerHeight / 2, true));
    cover.style.transition = 'opacity .8s, transform .8s'; cover.style.opacity = '0'; cover.style.transform = 'scale(1.05)';
    setTimeout(function () { cover.style.display = 'none'; }, 820);
    content.classList.remove('locked'); content.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('lock-scroll');
    startMusic(); onScroll();
    toast('Selamat datang di taman kami' + (guest ? ', ' + guest : '') + ' 🌸');
  });

  /* ---------- Musik latar: file bersama Petals on the Stone Floor ---------- */
  var mOn = false;
  function bgmEl() { return document.getElementById('bgmShared'); }
  function syncMusicBtn() { var b = $('gMusic'); if (b) b.classList.toggle('playing', mOn); }
  function startMusic() {
    var a = bgmEl(); if (!a || mOn) return;
    try { var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }
  function stopMusic() { var a = bgmEl(); if (a) a.pause(); }
  (function bindBgm() {
    var a = bgmEl(); if (!a) return;
    a.addEventListener('play', function () { mOn = true; syncMusicBtn(); });
    a.addEventListener('pause', function () { mOn = false; syncMusicBtn(); });
  })();
  $('gMusic').addEventListener('click', function () {
    if (mOn) stopMusic(); else startMusic();
  });

  onScroll();
})();
