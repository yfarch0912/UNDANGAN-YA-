/* ============================================================
   UNDANGYA! — site.js (katalog)
   Data desain dibaca dari window.THEMES (themes.js) ditambah
   dua entri khusus: Taman Rahasia (interaktif) & Video Undangan.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var navToggle = $('#navToggle'), mainNav = $('#mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });
    $$('a', mainNav).forEach(function (a) {
      a.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Peta data ---------- */
  var FONT_NAME = {
    "'Great Vibes', cursive": 'Great Vibes',
    "'Parisienne', cursive": 'Parisienne',
    "'Dancing Script', cursive": 'Dancing Script',
    "'Pinyon Script', cursive": 'Pinyon Script'
  };
  var SHAPE_LABEL = { hearts: 'hati melayang', crystals: 'kristal melayang', orbs: 'orb cahaya melayang' };
  var SHAPE_GLYPH = { hearts: '♥', crystals: '❖', orbs: '●' };
  var ADAT_MUSIC = {
    'adat-jawa': 'Musik latar sintesis laras pelog (WebAudio)',
    'adat-sunda': 'Musik latar sintesis laras degung (WebAudio)',
    'adat-bali': 'Musik latar sintesis laras slendro (WebAudio)'
  };
  var WARNA = {
    'senja-emas': ['Emas', 'Cream'], 'royal-navy': ['Biru', 'Emas'],
    'rose-blush': ['Pink', 'Emas'], 'forest-botanical': ['Hijau', 'Cokelat'],
    'lavender-dream': ['Ungu', 'Putih'], 'monochrome-luxe': ['Hitam', 'Abu'],
    'rustic-kayu': ['Cokelat', 'Cream'], 'ocean-teal': ['Toska', 'Emas'],
    'crimson-royal': ['Maroon', 'Emas'], 'sakura': ['Pink', 'Hijau'],
    'adat-jawa': ['Cokelat', 'Emas'], 'adat-sunda': ['Biru', 'Hijau'],
    'adat-bali': ['Maroon', 'Emas'],
    'taman-rahasia': ['Pink', 'Hijau'], 'video': ['Emas', 'Hitam'],
    'javanese-illustrated': ['Cokelat', 'Emas'],
    'masjid-bunga': ['Cream', 'Emas', 'Hijau'], 'pink-garden-fountain': ['Pink', 'Hijau'],
    'bali-pastel': ['Pink', 'Cream'], 'burgundy-palace': ['Maroon', 'Emas'],
    'palace-garden-gate': ['Hijau', 'Emas'], 'engraved-highland': ['Cokelat', 'Hijau'],
    'ivory-botanical': ['Cream', 'Hijau'], 'emerald-luxe': ['Hijau', 'Emas'],
    'bioskop-mini': ['Hitam', 'Emas'], 'piringan-hitam': ['Cokelat', 'Cream'],
    'perjalanan-kereta': ['Hijau', 'Emas'], 'surat-hidup': ['Cream', 'Hijau'],
    'paspor-cinta': ['Maroon', 'Emas']
  };
  var DOT = { Emas: '#c9973f', Cream: '#f3ead8', Pink: '#e3a0b0', Maroon: '#8c2f39', Hitam: '#26262a', Abu: '#8f8f96', Cokelat: '#96613a', Biru: '#2e5f8a', Hijau: '#5c7350', Ungu: '#7a5fa8', Toska: '#1f7a72', Putih: '#ffffff' };
  var SEARCH_EXTRA = {
    'senja-emas': 'klasik emas islami timeless', 'royal-navy': 'luxury megah formal',
    'rose-blush': 'floral romance bunga romantis', 'forest-botanical': 'garden botanical hijau natural',
    'lavender-dream': 'dreamy ungu manis', 'monochrome-luxe': 'luxury minimal modern white bersih',
    'rustic-kayu': 'rustic vintage kayu', 'ocean-teal': 'toska pantai segar',
    'crimson-royal': 'luxury royal mewah bangsawan', 'sakura': 'floral bunga jepang pink',
    'javanese-illustrated': 'jawa adat ilustrasi 2d joglo gunungan lukisan klasik pawiwahan',
    'masjid-bunga': 'masjid islami cat air bunga taman meyzsa fahrezzi mosque',
    'pink-garden-fountain': 'pink garden fountain air mancur gaun taman meyzsa fahrezzi',
    'bali-pastel': 'bali pastel ubud amplop romantis meyzsa fahrezzi',
    'burgundy-palace': 'burgundy maroon royal istana mewah meyzsa fahrezzi',
    'palace-garden-gate': 'istana gerbang taman gate meyzsa fahrezzi',
    'engraved-highland': 'ukiran engraving klasik dataran tinggi fahrezzi meyzsa vintage',
    'ivory-botanical': 'ivory botanical botani daun krem meyzsa fahrezzi garden',
    'emerald-luxe': 'emerald hijau emas three.js 3d interaktif cincin meyzsa fahrezzi luxe',
    'bioskop-mini': 'bioskop film cinema sinematik poster trailer tiket premier movie meyzsa fahrezzi',
    'piringan-hitam': 'vinyl piringan hitam album retro musik turntable lagu record meyzsa fahrezzi',
    'perjalanan-kereta': 'kereta krl modern stasiun tiket perjalanan geser horizontal train meyzsa fahrezzi',
    'surat-hidup': 'surat amplop segel lilin wax seal taman kertas tumbuh letter meyzsa fahrezzi',
    'paspor-cinta': 'paspor passport visa boarding pass perjalanan travel cap stempel meyzsa fahrezzi'
  };
  var CAT_LABEL = { modern: 'Tema Web 3D · Modern', adat: 'Tema Web 3D · Adat', interaktif: 'Web Interaktif', video: 'Video MP4', ilustrasi: 'Web 2D · Ilustrasi' };
  var WEB_FEATS = ['Countdown real-time, galeri foto & lightbox', 'RSVP, buku tamu & amplop digital (demo lokal)', 'Link tamu personal (?to=Nama) siap kirim via WhatsApp'];

  /* Tema Web 3D (dari themes.js) DIHAPUS dari katalog atas permintaan user 2026-10-29.
     Halaman undangan & checkout tetap melayani tema-tema itu via tautan langsung. */
  var ENTRIES = [];

  ENTRIES.push({
    slug: 'taman-rahasia', name: 'Taman Rahasia',
    tagline: 'Taman interaktif — kelopak mengikuti sentuhan, kupu-kupu beterbangan, ucapan mekar jadi bunga',
    cat: 'interaktif',
    bg: 'linear-gradient(180deg,#fdeeda,#fbe3d0 45%,#f3d3ae)',
    ring: '#c2607e', ring2: '#7d8b6f', font: "'Great Vibes', cursive", orn: '❀', shape: 'hearts',
    swatch: ['#c2607e', '#7d8b6f', '#e9d9ae', '#fdf6ec'],
    warna: WARNA['taman-rahasia'],
    feats: [
      'Kelopak bunga & kupu-kupu reaktif mengikuti kursor / sentuhan',
      'Mode suasana yang bisa diganti: Pagi · Senja · Malam',
      'Countdown model flip menuju hari acara',
      'Kebun Doa — klik tanah untuk menanam bunga; ucapan tamu mekar sebagai bunga bernama pengirimnya',
      'Galeri geser dengan lightbox'
    ].concat(WEB_FEATS),
    preview: 'taman-rahasia?to=Tamu%20Undangan',
    order: 'checkout?tema=taman-rahasia&paket=platinum',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Platinum</b> (Rp399.000).'
  });

  ENTRIES.push({
    slug: 'javanese-illustrated', name: 'Javanese Illustrated',
    tagline: 'Undangan ilustrasi Jawa berlapis — animasi pembuka sinematik, batik kawung-parang, foto prewedding asli',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2E1B0D,#4A2E1B 55%,#5C1622)',
    ring: '#c9a24b', ring2: '#e9c979', font: "'Great Vibes', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#4a2e1b', '#c9a24b', '#7c1f2e', '#f8f1e6'],
    warna: WARNA['javanese-illustrated'],
    feats: [
      'Animasi pembuka ilustrasi berlapis ±9 detik — Joglo zoom-out, bingkai ukiran, gunungan & lengkung emas',
      'Lukisan pemandangan Jawa + ornamen kayu ukir & motif batik di semua section (tanpa latar polos)',
      'Galeri foto prewedding asli + potret mempelai, lengkap dengan lightbox',
      'Musik latar instrumental romantis (sintesis WebAudio)',
      'Countdown real-time & kalender mini Save the Date',
      'RSVP & buku tamu (demo lokal)',
      'Link tamu personal (?to=Nama) siap kirim via WhatsApp'
    ],
    preview: 'javanese-illustrated?to=Tamu%20Undangan',
    order: 'checkout?tema=javanese-illustrated',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'masjid-bunga', name: 'Masjid Bunga',
    tagline: 'Masjid cat air di tengah taman bunga — lengkung emas & intro sinematik berlapis',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#fdf8ec,#f3e9cf 48%,#dfe7d2)',
    ring: '#c9a24b', ring2: '#7d8b6f', font: "'Great Vibes', cursive", orn: '❀', shape: 'orbs',
    swatch: ['#c9a24b', '#7d8b6f', '#f3e9cf', '#c2607e'],
    warna: WARNA['masjid-bunga'],
    feats: [
      'Intro sinematik GSAP — lapisan gunung, awan, dan kubah masjid bergerak perlahan',
      'Ilustrasi cat air orisinal: masjid, taman bunga, dan lengkung emas',
      'Countdown real-time menuju hari acara',
      'Galeri foto dengan lightbox',
      'RSVP & buku tamu (demo lokal)'
    ],
    preview: 'masjid-bunga',
    order: 'checkout?tema=masjid-bunga',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'pink-garden-fountain', name: 'Pink Garden Fountain',
    tagline: 'Taman merah muda & air mancur yang semburannya membentuk gaun pengantin',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#fdeef2,#f9dbe4 50%,#e6efdc)',
    ring: '#c2607e', ring2: '#7d8b6f', font: "'Great Vibes', cursive", orn: '✿', shape: 'hearts',
    swatch: ['#e3a0b0', '#c2607e', '#7d8b6f', '#fdf6ec'],
    warna: WARNA['pink-garden-fountain'],
    feats: [
      'Animasi air mancur GSAP — semburan air membentuk siluet gaun pengantin',
      'Ilustrasi taman cat air orisinal bernuansa pink',
      'Countdown real-time menuju hari acara',
      'Galeri foto dengan lightbox',
      'RSVP & buku tamu (demo lokal)'
    ],
    preview: 'pink-garden-fountain',
    order: 'checkout?tema=pink-garden-fountain',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'bali-pastel', name: 'Bali Pastel Romance',
    tagline: 'Romansa pastel Bali — sampul amplop yang terbuka, kelopak beterbangan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#fdf1e7,#fbe3d3 50%,#e9efdd)',
    ring: '#d98a80', ring2: '#7d8b6f', font: "'Great Vibes', cursive", orn: '❀', shape: 'hearts',
    swatch: ['#e8a798', '#d98a80', '#7d8b6f', '#fdf6ec'],
    warna: WARNA['bali-pastel'],
    feats: [
      'Sampul adegan hidup — bale & candi bentar, kupu-kupu beterbangan dan kabut melayang (bisa diputar ulang)',
      '11 panel ilustrasi orisinal, satu untuk tiap section',
      'Countdown, unduh .ics & tautan Google Maps',
      'Galeri 12 ilustrasi dengan lightbox',
      'RSVP (demo lokal) & salin nomor amplop digital',
      'Link tamu personal (?to=Nama) siap kirim via WhatsApp'
    ],
    preview: 'bali-pastel?to=Tamu%20Undangan',
    order: 'checkout?tema=bali-pastel',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'burgundy-palace', name: 'Burgundy Royal Palace',
    tagline: 'Istana burgundy & emas — kemegahan royal untuk hari besar',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2a0d14,#410D19 55%,#5e1224)',
    ring: '#c7a166', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '❦', shape: 'crystals',
    swatch: ['#410d19', '#c7a166', '#5e1224', '#f8f1e6'],
    warna: WARNA['burgundy-palace'],
    feats: [
      'Palet burgundy–emas dengan gerbang istana & ornamen royal',
      'Countdown real-time menuju hari acara',
      'Galeri foto dengan lightbox',
      'RSVP & buku tamu (demo lokal)'
    ],
    preview: 'burgundy-palace',
    order: 'checkout?tema=burgundy-palace',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'palace-garden-gate', name: 'Palace Garden Gate',
    tagline: 'Gerbang istana taman yang terbuka — jalan masuk menuju perayaan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#f7f3e3,#eef0da 52%,#dde5cb)',
    ring: '#c9a24b', ring2: '#5c7350', font: "'Great Vibes', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#c9a24b', '#5c7350', '#f3ead8', '#8c2f39'],
    warna: WARNA['palace-garden-gate'],
    feats: [
      'Animasi gerbang istana terbuka (GSAP) dengan putar ulang',
      'Countdown real-time & kalender mini Save the Date',
      'Galeri foto dengan lightbox + navigasi sebelum/sesudah',
      'Musik latar setelah undangan dibuka',
      'RSVP (demo lokal) & link tamu personal (?to=Nama)'
    ],
    preview: 'palace-garden-gate?to=Tamu%20Undangan',
    order: 'checkout?tema=palace-garden-gate',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'engraved-highland', name: 'Engraved Highland',
    tagline: 'Ilustrasi ukiran klasik — rumah & lanskap dataran tinggi dalam garis tinta',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#f6efdd,#eee2c6 55%,#d9dfc8)',
    ring: '#96613a', ring2: '#5c7350', font: "'Great Vibes', cursive", orn: '✦', shape: 'orbs',
    swatch: ['#96613a', '#5c7350', '#f3ead8', '#2a1e17'],
    warna: WARNA['engraved-highland'],
    feats: [
      'Gaya ukiran (engraving) tinta klasik di seluruh section',
      'Intro GSAP berlapis',
      'Countdown real-time menuju hari acara',
      'Galeri foto dengan lightbox',
      'RSVP (demo lokal)'
    ],
    preview: 'engraved-highland',
    order: 'checkout?tema=engraved-highland',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });
  ENTRIES.push({
    slug: 'ivory-botanical', name: 'Ivory Botanical',
    tagline: 'Botani ivory yang tenang — daun & bunga krem di atas gading',
    cat: 'ilustrasi',
    bg: 'linear-gradient(180deg,#fbf7ec,#f5eeda 55%,#e7ecd9)',
    ring: '#7d8b6f', ring2: '#c9a24b', font: "'Great Vibes', cursive", orn: '❀', shape: 'hearts',
    swatch: ['#f8f1e6', '#7d8b6f', '#c9a24b', '#e9d9ae'],
    warna: WARNA['ivory-botanical'],
    feats: [
      'Ilustrasi botani orisinal di palet ivory–emas–sage',
      'Countdown real-time menuju hari acara',
      'Galeri foto dengan lightbox',
      'RSVP & buku tamu (demo lokal)'
    ],
    preview: 'ivory-botanical',
    order: 'checkout?tema=ivory-botanical',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'emerald-luxe', name: 'Emerald Luxe 3D',
    tagline: 'Istana taman emerald & emas hidup dengan Three.js — cincin emas 3D & 420 partikel melayang',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#04150d,#07301F 55%,#1E5C40)',
    ring: '#c7a166', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#07301f', '#c7a166', '#1e5c40', '#f8f1e6'],
    warna: WARNA['emerald-luxe'],
    feats: [
      'Adegan Three.js hidup — dua cincin emas 3D saling terkait, 420 partikel emas, parallax pointer (fallback bila WebGL mati)',
      'Aset visual generate AI (taman istana emerald & foto couple) dioptimasi Python ke WebP ≤97KB',
      'Countdown real-time menuju hari acara',
      'Potret mempelai & galeri prewedding fotorealistik (generate AI) dengan lightbox',
      'Musik latar sintesis WebAudio setelah undangan dibuka',
      'RSVP & buku tamu (demo lokal)'
    ].concat(WEB_FEATS),
    preview: 'emerald-luxe?to=Tamu%20Undangan',
    order: 'checkout?tema=emerald-luxe&paket=platinum',
    rec: '<b>Rekomendasi paket:</b> tema interaktif 3D termasuk di <b>Paket Platinum</b> (Rp399.000).'
  });

  ENTRIES.push({
    slug: 'bioskop-mini', name: 'Bioskop Mini', pos: '50% 62%',
    tagline: 'Premier film pribadi — poster sinematik, opening trailer, galeri filmstrip & RSVP tiket yang disobek',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#0d0d10,#2a0a12 55%,#17110d)',
    ring: '#c9973f', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#2a0a12', '#c9973f', '#8c2f39', '#f8f1e6'],
    warna: WARNA['bioskop-mini'],
    feats: [
      'Cover poster film sinematik + opening trailer 3 tahap saat tombol Putar ditekan',
      'Galeri filmstrip berlubang sprocket dengan lightbox',
      'RSVP tiket bioskop berperforasi — stub disobek saat konfirmasi hadir',
      'Penutup credit roll ala film & amplop digital Gold Class (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ].concat(WEB_FEATS),
    preview: 'bioskop-mini?to=Tamu%20Undangan',
    order: 'checkout?tema=bioskop-mini',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'piringan-hitam', name: 'Piringan Hitam',
    tagline: 'Album vinyl kisah cinta — tonearm turun, piringan berputar, isi berupa tracklist lagu',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f6ecdc,#eddcc0 55%,#e0c99f)',
    ring: '#96613a', ring2: '#c08b57', font: "'Dancing Script', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#f6ecdc', '#96613a', '#26262a', '#8c2f39'],
    warna: WARNA['piringan-hitam'],
    feats: [
      'Cover sleeve album — tonearm turun & piringan berputar saat dibuka',
      'Isi berupa tracklist: Overture, Duet, The Big Day (Live) & Liner Notes',
      'Countdown gaya timer kaset + mini-player berputar selama scroll',
      'RSVP Request Lagu Kehadiran & amplop digital (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ],
    preview: 'piringan-hitam?to=Tamu%20Undangan',
    order: 'checkout?tema=piringan-hitam',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'perjalanan-kereta', name: 'Perjalanan Kereta',
    tagline: 'Perjalanan KRL modern menyamping — geser antar-stasiun, kereta berjalan mengikuti ritme, tanpa scroll',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#08302b,#0f4a3f 55%,#7a4a21)',
    ring: '#e8a33d', ring2: '#f3d3ae', font: "'Great Vibes', cursive", orn: '✦', shape: 'orbs',
    swatch: ['#0f4a3f', '#e8a33d', '#f3ead8', '#8c2f39'],
    warna: WARNA['perjalanan-kereta'],
    feats: [
      'Navigasi geser kanan-kiri antar 7 stasiun — kereta KRL modern berjalan mengikuti ritme perpindahan',
      'Tanpa scroll: tiap stasiun muat satu layar penuh',
      'Peta rute gaya metro yang terisi mengikuti perjalanan + papan nama stasiun berganti',
      'Countdown real-time menuju hari acara',
      'RSVP Konfirmasi Tiket & amplop digital (demo lokal)'
    ],
    preview: 'perjalanan-kereta?to=Tamu%20Undangan',
    order: 'checkout?tema=perjalanan-kereta&paket=platinum',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Platinum</b> (Rp399.000).'
  });

  ENTRIES.push({
    slug: 'surat-hidup', name: 'Surat Hidup',
    tagline: 'Surat cinta yang hidup — segel lilin dipecahkan, taman kertas tumbuh mengikuti scroll',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#fdf6ec,#f3e3cb 55%,#e9d9ae)',
    ring: '#8c2f39', ring2: '#9caf88', font: "'Great Vibes', cursive", orn: '❀', shape: 'hearts',
    swatch: ['#f8f1e6', '#8c2f39', '#9caf88', '#c9973f'],
    warna: WARNA['surat-hidup'],
    feats: [
      'Cover amplop kertas bersegel lilin — ketuk segel untuk membuka surat',
      'Taman kertas tumbuh mengikuti scroll; bunga mekar di tiap section',
      'Galeri perangko & kartu pos dengan frame renda',
      'Countdown real-time menuju hari acara',
      'RSVP Balas Surat Ini & amplop digital (demo lokal)'
    ],
    preview: 'surat-hidup?to=Tamu%20Undangan',
    order: 'checkout?tema=surat-hidup',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'paspor-cinta', name: 'Paspor Cinta',
    tagline: 'Buku paspor dua hati — cap visa di tiap section, galeri cap kota & RSVP boarding pass',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2a0d14,#5e1224 55%,#241a17)',
    ring: '#c9973f', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#5e1224', '#c9973f', '#2e4057', '#f8f1e6'],
    warna: WARNA['paspor-cinta'],
    feats: [
      'Cover buku paspor Republic of Love — foto ID kedua mempelai & MRZ',
      'Cap visa / stempel jatuh di tiap section saat pertama terlihat',
      'Galeri cap pos 4 kota kisah dengan frame perforasi',
      'Countdown real-time menuju hari acara',
      'RSVP boarding pass & amplop Travel Wallet (demo lokal)'
    ],
    preview: 'paspor-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=paspor-cinta',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Gold</b> (Rp299.000).'
  });

  ENTRIES.push({
    slug: 'video', name: 'Video Undangan',
    tagline: 'Undangan sinematik berupa file MP4 portrait 9:16 — dibagikan lewat WhatsApp, bukan tautan web',
    cat: 'video',
    bg: 'linear-gradient(160deg,#241a17,#3a1622 55%,#17110d)',
    ring: '#c9973f', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#c9973f', '#5e1224', '#26262a', '#faf6ee'],
    warna: WARNA['video'],
    feats: [
      'File MP4 Full HD 1080×1920 (portrait 9:16)',
      'Durasi ±60 detik',
      'Adegan: pembuka → ayat → profil mempelai wanita & pria → Save the Date (kalender) → kalimat berkat → penutup',
      'Gerakan kamera zoom/pan sinematik antar-adegan + partikel cahaya',
      'Musik latar instrumental (sintesis, tanpa vokal)',
      'Deliverable berupa file video — bukan halaman web'
    ],
    preview: null,
    order: 'checkout?paket=platinum',
    rec: '<b>Rekomendasi paket:</b> video undangan adalah deliverable <b>Paket Platinum</b> (Rp399.000).'
  });

  var bySlug = {};
  ENTRIES.forEach(function (e) { bySlug[e.slug] = e; });

  /* ---------- Katalog: filter + grid ---------- */
  var state = { cat: 'semua', warna: null, q: '' };
  var grid = $('#grid'), countEl = $('#count'), emptyEl = $('#empty');

  var dotsWrap = $('#colorDots');
  if (dotsWrap) {
    Object.keys(DOT).forEach(function (w) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'dot-btn'; b.dataset.warna = w;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', 'Filter warna ' + w);
      b.title = w;
      b.innerHTML = '<i style="background:' + DOT[w] + '"></i>';
      dotsWrap.appendChild(b);
    });
    dotsWrap.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-warna]');
      if (!b) return;
      state.warna = (state.warna === b.dataset.warna) ? null : b.dataset.warna;
      $$('button', dotsWrap).forEach(function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.warna === state.warna));
      });
      render();
    });
  }

  var chipsEl = $('#catChips');
  if (chipsEl) chipsEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-cat]');
    if (!b) return;
    state.cat = b.dataset.cat;
    $$('button', chipsEl).forEach(function (x) {
      x.setAttribute('aria-pressed', String(x.dataset.cat === state.cat));
    });
    render();
  });

  var searchEl = $('#q');
  if (searchEl) searchEl.addEventListener('input', function () {
    state.q = searchEl.value.trim().toLowerCase();
    render();
  });

  var resetBtn = $('#resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', function () {
    state = { cat: 'semua', warna: null, q: '' };
    if (searchEl) searchEl.value = '';
    $$('#catChips button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === 'semua')); });
    $$('#colorDots button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    render();
  });

  function dotsHTML(e) {
    return e.swatch.map(function (s) { return '<i style="background:' + s + '"></i>'; }).join('');
  }

  function cardHTML(e, i) {
    var num = ('0' + (i + 1)).slice(-2);
    var artInner = e.cat === 'video'
      ? '<span class="a-film" aria-hidden="true"><img src="assets/video-1.jpg" alt="" loading="lazy"><img src="assets/video-2.jpg" alt="" loading="lazy"><img src="assets/video-3.jpg" alt="" loading="lazy"></span>'
      : '<img class="a-img" src="assets/katalog/' + e.slug + '.webp" alt="Cuplikan desain ' + e.name + '" width="640" height="800" loading="lazy"' + (e.pos ? ' style="object-position:' + e.pos + '"' : '') + '>';
    return '<article class="card' + (i % 5 === 4 ? ' wide' : '') + '">' +
      '<div><p class="c-num"><span>Nº ' + num + '</span><span class="c-cat">' + CAT_LABEL[e.cat] + '</span></p>' +
      '<button type="button" class="card-art" data-qv="' + e.slug + '" style="background:' + e.bg + '" aria-label="Lihat detail ' + e.name + '">' + artInner + '</button></div>' +
      '<div class="card-body">' +
        '<button type="button" class="card-name" data-qv="' + e.slug + '" style="font-family:' + e.font + '">' + e.name + '</button>' +
        '<p class="card-tag">' + e.tagline + '</p>' +
        '<div class="palette" aria-hidden="true">' + dotsHTML(e) + '</div>' +
        '<hr>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-qv="' + e.slug + '">Detail</button>' +
          (e.preview ? '<a class="btn btn-ghost" href="' + e.preview + '">Preview</a>' : '') +
          '<a class="pesan" href="' + e.order + '">Pesan</a>' +
        '</div>' +
      '</div></article>';
  }

  function render() {
    var list = ENTRIES.filter(function (e) {
      if (state.cat !== 'semua' && e.cat !== state.cat) return false;
      if (state.warna && e.warna.indexOf(state.warna) === -1) return false;
      if (state.q) {
        var hay = (e.name + ' ' + e.tagline + ' ' + e.warna.join(' ') + ' ' + (SEARCH_EXTRA[e.slug] || '') + ' ' + CAT_LABEL[e.cat]).toLowerCase();
        if (hay.indexOf(state.q) === -1) return false;
      }
      return true;
    });
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.textContent = 'Menampilkan ' + list.length + ' dari ' + ENTRIES.length + ' desain';
    emptyEl.hidden = list.length > 0;
    grid.hidden = list.length === 0;
  }
  render();

  /* ---------- Showcase & inspirasi ---------- */
  function setCategory(cat) {
    state.cat = cat;
    $$('#catChips button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === cat)); });
  }
  function setSearch(q) {
    state.q = q.toLowerCase();
    if (searchEl) searchEl.value = q;
  }
  function goGrid() {
    var g = $('#koleksi-grid');
    if (g) g.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  var showRow = $('#showcaseRow');
  function showScroll(dir) {
    if (!showRow) return;
    showRow.scrollBy({ left: dir * Math.min(showRow.clientWidth * 0.8, 560), behavior: reduced ? 'auto' : 'smooth' });
  }
  var showPrev = $('#showPrev'), showNext = $('#showNext');
  if (showPrev) showPrev.addEventListener('click', function () { showScroll(-1); });
  if (showNext) showNext.addEventListener('click', function () { showScroll(1); });
  $$('[data-showcase]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.showcase === 'cat') { setSearch(''); setCategory(b.dataset.value || 'semua'); }
      else { setCategory('semua'); setSearch(b.dataset.value || ''); }
      render();
      goGrid();
    });
  });
  $$('[data-qv-open]').forEach(function (b) {
    b.addEventListener('click', function () { openQV(b.dataset.qvOpen, b); });
  });
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Quick view ---------- */
  var backdrop = $('#qvBackdrop'), qvContent = $('#qvContent'), lastFocus = null;

  function openQV(slug, opener) {
    var e = bySlug[slug];
    if (!e) return;
    lastFocus = opener || document.activeElement;
    var artInner;
    if (e.cat === 'video') {
      artInner = '<div class="filmstrip" aria-hidden="true">' +
        '<figure><img src="assets/video-1.jpg" alt=""></figure>' +
        '<figure><img src="assets/video-2.jpg" alt=""></figure>' +
        '<figure><img src="assets/video-3.jpg" alt=""></figure></div>' +
        '<button type="button" class="qv-close" data-close aria-label="Tutup detail">✕</button>';
    } else {
      artInner = '<img class="qv-img" src="assets/katalog/' + e.slug + '.webp" alt="Cuplikan desain ' + e.name + '" width="640" height="800"' + (e.pos ? ' style="object-position:' + e.pos + '"' : '') + '>' +
        '<button type="button" class="qv-close" data-close aria-label="Tutup detail">✕</button>';
    }
    qvContent.innerHTML =
      '<div class="qv-art" style="background:' + e.bg + '">' + artInner + '</div>' +
      '<div class="qv-body">' +
        '<p class="micro">' + CAT_LABEL[e.cat] + '</p>' +
        '<h3 class="q-name" id="qvName" style="font-family:' + e.font + '">' + e.name + '</h3>' +
        '<p class="q-tag">' + e.tagline + '</p>' +
        '<div class="qv-meta"><span class="palette" aria-hidden="true">' + dotsHTML(e) + '</span>' +
          '<span class="warna">Palet: ' + e.warna.join(' · ') + '</span></div>' +
        '<ul class="qv-feats">' + e.feats.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
        '<p class="qv-rec">' + e.rec + '</p>' +
        '<div class="qv-actions">' +
          (e.preview
            ? '<a class="btn btn-line" href="' + e.preview + '">Preview Live</a>'
            : '<button type="button" class="btn btn-line" data-goto-harga>Lihat Paket Video</button>') +
          '<a class="btn btn-solid" href="' + e.order + '">Pesan Desain Ini</a>' +
        '</div>' +
      '</div>';
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = $('.qv-close', qvContent);
    if (closeBtn) closeBtn.focus();
  }
  function closeQV() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (grid) grid.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-qv]');
    if (b) openQV(b.dataset.qv, b);
  });
  if (backdrop) {
    backdrop.addEventListener('click', function (ev) {
      if (ev.target === backdrop || ev.target.closest('[data-close]')) closeQV();
      else if (ev.target.closest('[data-goto-harga]')) {
        closeQV();
        var h = $('#harga');
        if (h) h.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !backdrop.hidden) closeQV();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var rvEls = $$('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (obs) {
      obs.forEach(function (o) {
        if (o.isIntersecting) { o.target.classList.add('in'); io.unobserve(o.target); }
      });
    }, { threshold: 0.12 });
    rvEls.forEach(function (el) { io.observe(el); });
  } else {
    rvEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
