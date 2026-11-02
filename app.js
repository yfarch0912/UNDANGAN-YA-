/* UNDANGAN-YA! 3D — logika halaman (original) */
(function () {
  var C = window.UNDANGAN_CONFIG;
  var $ = function (id) { return document.getElementById(id); };

  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function copyText(text, okMsg) {
    function done() { toast(okMsg); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Gagal menyalin — salin manual ya'); }
      ta.remove();
    }
  }

  /* ---------- Nama tamu dari ?to= ---------- */
  var params = new URLSearchParams(location.search);
  var guest = (params.get('to') || '').trim().slice(0, 80);
  if (guest) $('guestName').textContent = guest;

  /* ---------- Isi data mempelai & acara ---------- */
  $('bridePhoto').src = C.bride.photo; $('groomPhoto').src = C.groom.photo;
  $('brideFull').textContent = C.bride.full; $('groomFull').textContent = C.groom.full;
  $('brideParents').textContent = C.bride.order + ' ' + C.bride.father + ' & ' + C.bride.mother;
  $('groomParents').textContent = C.groom.order + ' ' + C.groom.father + ' & ' + C.groom.mother;
  $('brideIg').textContent = C.bride.instagram; $('groomIg').textContent = C.groom.instagram;
  $('giftAddress').textContent = C.giftAddress;

  $('eventGrid').innerHTML = C.events.map(function (e) {
    return '<article class="event-card tilt"><h4>' + e.name + '</h4>' +
      '<p class="event-day">' + e.day + '</p><p class="event-date">' + e.dateLabel + '</p>' +
      '<p>' + e.time + '</p><p><b>' + e.venue + '</b><br><span class="muted">' + e.address + '</span></p>' +
      '<a class="btn-small" target="_blank" rel="noopener" href="' + e.maps + '">📍 Lihat Lokasi</a></article>';
  }).join('');

  $('dressChips').innerHTML = C.dresscode.map(function (d) { return '<span class="chip">' + d + '</span>'; }).join('');

  $('timeline').innerHTML = C.story.map(function (s) {
    return '<div class="tl-item"><span class="tl-year">' + s.year + '</span><h5>' + s.title + '</h5><p>' + s.text + '</p></div>';
  }).join('');

  $('giftGrid').innerHTML = C.gifts.map(function (g, i) {
    return '<article class="gift-card tilt"><p class="gift-bank">' + g.bank + '</p>' +
      '<p class="gift-number" id="giftNum' + i + '">' + g.number + '</p><p>a.n. ' + g.holder + '</p>' +
      '<button class="btn-small copy-num" data-num="' + g.number + '" type="button">Salin Nomor</button></article>';
  }).join('');

  /* ---------- Galeri + lightbox ---------- */
  var galleryUrls = C.gallerySeeds.map(function (s, i) {
    return 'https://picsum.photos/seed/' + s + '/640/800';
  });
  $('gallery').innerHTML = galleryUrls.map(function (u, i) {
    return '<button type="button" class="tilt-mini" data-idx="' + i + '" aria-label="Foto galeri ' + (i + 1) + '">' +
      '<img src="' + u + '" alt="Foto galeri ' + (i + 1) + '" loading="lazy"></button>';
  }).join('');

  var lbIdx = 0;
  function showLb(i) {
    lbIdx = (i + galleryUrls.length) % galleryUrls.length;
    $('lbImg').src = galleryUrls[lbIdx].replace('/640/800', '/1100/900');
    $('lightbox').hidden = false;
  }
  $('gallery').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-idx]'); if (b) showLb(+b.dataset.idx);
  });
  $('lbClose').onclick = function () { $('lightbox').hidden = true; };
  $('lbPrev').onclick = function () { showLb(lbIdx - 1); };
  $('lbNext').onclick = function () { showLb(lbIdx + 1); };
  document.addEventListener('keydown', function (e) {
    if ($('lightbox').hidden) return;
    if (e.key === 'Escape') $('lightbox').hidden = true;
    if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    if (e.key === 'ArrowRight') showLb(lbIdx + 1);
  });

  /* ---------- Countdown ---------- */
  var target = new Date(C.weddingISO).getTime();
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
        m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    $('cd-d').textContent = pad(d); $('cd-h').textContent = pad(h);
    $('cd-m').textContent = pad(m); $('cd-s').textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Pernikahan ' + C.bride.nick + ' & ' + C.groom.nick) +
    '&dates=20270612T010000Z/20270612T060000Z&details=' +
    encodeURIComponent('Akad 08.00 WIB & Resepsi 11.00 WIB — Jakarta') +
    '&location=' + encodeURIComponent(C.events[1].venue + ', Jakarta');
  $('gcalBtn').href = gcal;

  /* ---------- Salin ---------- */
  document.addEventListener('click', function (e) {
    var num = e.target.closest('.copy-num');
    if (num) { copyText(num.dataset.num, 'Nomor rekening tersalin ✓'); return; }
    var tgt = e.target.closest('[data-copy-target]');
    if (tgt) copyText($(tgt.dataset.copyTarget).textContent, 'Alamat tersalin ✓');
  });

  /* ---------- Tilt 3D pada kartu ---------- */
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.tilt, .tilt-mini');
      document.querySelectorAll('.tilt, .tilt-mini').forEach(function (el) {
        if (el !== card) el.style.transform = '';
      });
      if (!card) return;
      var r = card.getBoundingClientRect();
      var rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
      var ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
      var lift = card.classList.contains('tilt-mini') ? ' scale(1.03)' : ' scale(1.015)';
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)' + lift;
    }, { passive: true });
  }

  /* ---------- Reveal saat scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- 10 Tema 3D ---------- */
  var SHAPE_LABEL = { hearts: '💛 Hati emas', crystals: '💎 Kristal', orbs: '🫧 Orb cahaya' };
  function applyTheme(slug, announce) {
    var t = (window.__themeBySlug || {})[slug] || window.__THEME;
    if (!t) return;
    window.__THEME = t;
    var root = document.documentElement.style;
    root.setProperty('--gold', t.css.gold);
    root.setProperty('--gold-2', t.css.gold2);
    root.setProperty('--gold-soft', t.css.goldSoft);
    root.setProperty('--sage', t.css.sage);
    root.setProperty('--cream', t.css.cream);
    root.setProperty('--bg-grad', t.css.bg);
    root.setProperty('--script-font', t.font);
    root.setProperty('--line', t.css.gold + '59');
    var salamEl = $('salamLine');
    if (salamEl) salamEl.textContent = t.salam || 'Assalamu’alaikum Warahmatullahi Wabarakatuh';
    document.body.dataset.concept = t.concept || '';
    document.body.classList.remove('gates-open');
    var creditEl = $('creditTheme');
    if (creditEl) creditEl.textContent = '“' + t.name + '”';
    var badge = $('conceptBadge');
    if (badge) {
      if (t.conceptName) { badge.textContent = 'Konsep · ' + t.conceptName; badge.hidden = false; }
      else badge.hidden = true;
    }
    if (window.__applyTheme3D) window.__applyTheme3D(t);
    try { localStorage.setItem('undangan3d_tema', t.slug); } catch (e) {}
    var u = new URL(location.href); u.searchParams.set('tema', t.slug);
    history.replaceState(null, '', u);
    document.querySelectorAll('.theme-card').forEach(function (c) {
      var active = c.dataset.slug === t.slug;
      c.classList.toggle('active', active);
      var lab = c.querySelector('.theme-active-label');
      if (lab) lab.textContent = active ? '● Tema aktif' : SHAPE_LABEL[t2shape(c.dataset.slug)] || '';
    });
    function t2shape(s) { var th = (window.__themeBySlug || {})[s]; return th ? th.three.shape : 'hearts'; }
    if (announce) toast('Tema “' + t.name + '” dipakai 🎨');
  }

  var grid = $('themeGrid');
  if (grid && window.THEMES) {
    grid.innerHTML = window.THEMES.map(function (t) {
      return '<button type="button" class="theme-card" data-slug="' + t.slug + '" aria-label="Pakai tema ' + t.name + '">' +
        '<span class="theme-banner" style="background:' + t.css.bg + '">' +
          '<span class="ring3d" style="--rc:' + t.three.ring + '"></span>' +
          '<span class="ring3d" style="--rc:' + t.three.ring2 + '"></span>' +
          '<span class="shape3d">' + (t.three.shape === 'crystals' ? '💎' : t.three.shape === 'orbs' ? '🫧' : '💛') + '</span>' +
        '</span>' +
        '<span class="theme-body"><span class="theme-name">' + t.orn + ' ' + t.name + '</span>' +
        '<span class="theme-tag" style="display:block">' + t.tagline + (t.motif ? '<br><b>Motif:</b> ' + t.motif : '') + (t.conceptName ? '<br><b>Konsep:</b> ' + t.conceptName : '') + '</span>' +
        '<span class="theme-dots">' + t.swatch.map(function (s) { return '<i style="background:' + s + '"></i>'; }).join('') + '</span>' +
        '<span class="theme-active-label"></span></span></button>';
    }).join('');
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.theme-card');
      if (card) applyTheme(card.dataset.slug, true);
    });
  }
  if (window.__THEME) applyTheme(window.__THEME.slug, false);

  /* ---------- Buka undangan ---------- */
  document.body.classList.add('lock-scroll');
  $('openBtn').addEventListener('click', function () {
    var cover = $('cover'), content = $('content');
    var isGate = document.body.dataset.concept === 'candi-bentar';
    if (isGate) document.body.classList.add('gates-open'); // gerbang Bali sungguh terbuka
    var fadeDelay = isGate ? 620 : 0, hideDelay = isGate ? 1350 : 720;
    setTimeout(function () {
      cover.style.transition = 'opacity .7s, transform .7s';
      cover.style.opacity = '0'; cover.style.transform = 'scale(.94)';
    }, fadeDelay);
    setTimeout(function () { cover.style.display = 'none'; }, hideDelay);
    content.classList.remove('locked'); content.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('lock-scroll');
    if (window.__undangan3D) window.__undangan3D.open();
    goldBurst(); startMusic();
    toast('Selamat datang' + (guest ? ', ' + guest : '') + ' 💛');
  });

  function goldBurst() {
    var box = $('burst');
    for (var i = 0; i < 42; i++) {
      var p = document.createElement('span'); p.className = 'burst-p';
      p.style.left = '50%'; p.style.top = '38%';
      box.appendChild(p);
      var ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 300;
      p.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: 'translate(' + Math.cos(ang) * dist + 'px,' + (Math.sin(ang) * dist + 120) + 'px) scale(.2)', opacity: 0 }
      ], { duration: 1100 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = (function (el) { return function () { el.remove(); }; })(p);
    }
  }

  /* ---------- RSVP & buku tamu (localStorage demo) ---------- */
  var KEY = 'undangan3d_rsvp_v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function renderWishes() {
    var list = load();
    var hadir = list.filter(function (w) { return w.attend === 'Hadir'; }).length;
    $('rsvpCount').textContent = list.length ? (hadir + ' tamu menyatakan hadir · ' + list.length + ' ucapan terkumpul (demo: tersimpan di browser ini)') : 'Jadilah yang pertama memberi ucapan 💛';
    $('wishes').innerHTML = list.slice().reverse().slice(0, 12).map(function (w) {
      return '<div class="wish"><b>' + escapeHtml(w.name) + '</b> <span class="w-meta">· ' + w.attend + ' · ' + w.guests + ' tamu</span><p>' + escapeHtml(w.message || '—') + '</p></div>';
    }).join('');
  }
  function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
  renderWishes();

  $('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(e.target);
    var list = load();
    list.push({ name: String(f.get('name')), attend: String(f.get('attend')), guests: String(f.get('guests')), message: String(f.get('message')) });
    localStorage.setItem(KEY, JSON.stringify(list));
    e.target.reset(); renderWishes();
    toast('Terima kasih! RSVP & ucapanmu terkirim 💛');
  });

  /* ---------- Generator link tamu ---------- */
  var genLink = '';
  $('genBtn').addEventListener('click', function () {
    var name = $('genInput').value.trim();
    if (!name) { toast('Isi nama tamu dulu ya'); return; }
    genLink = location.origin + location.pathname + '?to=' + encodeURIComponent(name) +
      (window.__THEME ? '&tema=' + window.__THEME.slug : '');
    $('genResult').textContent = genLink;
    $('genCopy').disabled = false;
    var wa = $('genWa');
    wa.href = 'https://wa.me/?text=' + encodeURIComponent('Undangan Pernikahan ' + C.bride.nick + ' & ' + C.groom.nick + ' — khusus untuk ' + name + ': ' + genLink);
    wa.setAttribute('aria-disabled', 'false'); wa.style.pointerEvents = 'auto'; wa.style.opacity = '1';
  });
  $('genCopy').addEventListener('click', function () { if (genLink) copyText(genLink, 'Link tamu tersalin ✓'); });

  /* ---------- Musik latar: pad lembut via WebAudio (tanpa file) ---------- */
  var audioCtx = null, musicOn = false, musicTimer = null;
  var chords = [[261.6, 329.6, 392], [220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 392]];
  var ci = 0;
  function playChord() {
    if (!audioCtx) return;
    var now = audioCtx.currentTime;
    var activeChords = (window.__THEME && window.__THEME.music) || chords; // laras daerah utk tema adat
    activeChords[ci % activeChords.length].forEach(function (fq) {
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = fq;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.045, now + 0.6);
      g.gain.linearRampToValueAtTime(0, now + 3.8);
      o.connect(g); g.connect(audioCtx.destination); o.start(now); o.stop(now + 4);
    });
    ci++;
  }
  function startMusic() {
    if (musicOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      audioCtx.resume(); playChord();
      musicTimer = setInterval(playChord, 3600);
      musicOn = true; $('musicBtn').classList.add('playing');
    } catch (e) { /* browser tanpa WebAudio: diam saja */ }
  }
  function stopMusic() {
    clearInterval(musicTimer); musicOn = false; $('musicBtn').classList.remove('playing');
    if (audioCtx) audioCtx.suspend();
  }
  $('musicBtn').addEventListener('click', function () { musicOn ? stopMusic() : startMusic(); });
})();
