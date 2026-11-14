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
    'paspor-cinta': ['Maroon', 'Emas'],
    'museum-cinta': ['Maroon', 'Emas'], 'koran-cinta': ['Cream', 'Hitam'], 'peta-ekspedisi': ['Hijau', 'Emas'], 'ramuan-cinta': ['Hijau', 'Cream'], 'radio-cinta': ['Cokelat', 'Emas'], 'observatorium': ['Biru', 'Emas'], 'kedai-kopi': ['Cokelat', 'Cream'], 'papan-permainan': ['Emas', 'Hijau'], 'oceanarium': ['Biru', 'Toska'], 'pasar-malam': ['Maroon', 'Emas']
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
    'paspor-cinta': 'paspor passport visa boarding pass perjalanan travel cap stempel meyzsa fahrezzi',
    'museum-cinta': 'museum galeri seni lukisan hidup pameran meyzsa fahrezzi', 'koran-cinta': 'koran surat kabar headline berita harian bahagia meyzsa fahrezzi', 'peta-ekspedisi': 'peta ekspedisi petualangan kompas rute koordinat meyzsa fahrezzi', 'ramuan-cinta': 'ramuan apotek formula botol resep vintage meyzsa fahrezzi', 'radio-cinta': 'radio fm tuning on air penyiar siaran meyzsa fahrezzi', 'observatorium': 'observatorium bintang rasi teleskop planet astronom meyzsa fahrezzi', 'kedai-kopi': 'kedai kopi kafe menu barista struk meyzsa fahrezzi', 'papan-permainan': 'papan permainan dadu board game bidak finish meyzsa fahrezzi', 'oceanarium': 'oceanarium akuarium laut menyelam ikan dalam meyzsa fahrezzi', 'pasar-malam': 'pasar malam festival bianglala marquee karnaval meyzsa fahrezzi'
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
    order: 'checkout?tema=taman-rahasia&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    order: 'checkout?tema=emerald-luxe&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif 3D termasuk di <b>Paket Luxury</b> (Rp280.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    order: 'checkout?tema=perjalanan-kereta&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
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
    order: 'checkout?paket=luxury',
    rec: '<b>Rekomendasi paket:</b> video undangan adalah deliverable <b>Paket Luxury</b> (Rp280.000).'
  });

  var bySlug = {};
  ENTRIES.push({
    slug: 'museum-cinta', name: 'Museum Cinta',
    tagline: 'Galeri seni cinta — lukisan pasangan yang hidup bernapas, ruang pamer per bab & RSVP buku tamu pameran',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2a1c11,#4a1220 55%,#1d130c)',
    ring: '#c9973f', ring2: '#eed9a4', font: "'Great Vibes', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#4a1220', '#c9973f', '#7e1f2e', '#f6eeda'],
    warna: WARNA['museum-cinta'],
    feats: [
      'Lukisan hero cat minyak dalam bingkai emas yang hidup — bernapas perlahan & disapu cahaya galeri',
      'Isi sebagai Ruang Pamer per bab, tiap foto berlabel karya ala museum',
      'Medali ikon & foto pasangan generate AI se-konsep galeri seni',
      'RSVP Buku Tamu Pameran & amplop digital (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ],
    preview: 'museum-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=museum-cinta',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'koran-cinta', name: 'Koran Cinta',
    tagline: 'Edisi khusus "Harian Bahagia" — headline "AKHIRNYA MENIKAH!", kolom kisah, cuaca hari-H & RSVP kupon disobek',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f3ead8,#e7dbc2 55%,#d9c9a6)',
    ring: '#26262a', ring2: '#8c2f39', font: "'Parisienne', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#f3ead8', '#26262a', '#8c2f39', '#96613a'],
    warna: WARNA['koran-cinta'],
    feats: [
      'Cover koran terlipat yang terbuka — headline raksasa "AKHIRNYA MENIKAH!"',
      'Kisah cinta sebagai kolom berita + ramalan cuaca hari-H & TTS mini',
      'RSVP kupon berperforasi yang disobek saat konfirmasi hadir',
      'Amplop digital sebagai iklan baris (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ],
    preview: 'koran-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=koran-cinta',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'peta-ekspedisi', name: 'Peta Ekspedisi',
    tagline: 'Peta petualangan — rute kisah terlukis menganimasi, pin koordinat kenangan & countdown kompas berputar',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#e9dfc8,#d9c9a3 55%,#b39b6d)',
    ring: '#5c7350', ring2: '#c9973f', font: "'Great Vibes', cursive", orn: '✦', shape: 'orbs',
    swatch: ['#e9dfc8', '#5c7350', '#c9973f', '#8c2f39'],
    warna: WARNA['peta-ekspedisi'],
    feats: [
      'Rute kisah terlukis menganimasi garis demi garis antar titik ekspedisi',
      'Galeri pin koordinat — ketuk pin untuk membuka foto & cerita kenangan',
      'Countdown kompas dengan jarum yang bergerak',
      'RSVP terstempel "TERCATAT DALAM EKSPEDISI" (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ].concat(WEB_FEATS),
    preview: 'peta-ekspedisi?to=Tamu%20Undangan',
    order: 'checkout?tema=peta-ekspedisi&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
  });

  ENTRIES.push({
    slug: 'ramuan-cinta', name: 'Ramuan Cinta',
    tagline: 'Apotek cinta vintage — Formula No. 12 "Dua Hati", label botol acara, countdown tabung reaksi & RSVP hasil uji COCOK',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#e8e3d0,#cfd4ba 55%,#9caf88)',
    ring: '#5c7350', ring2: '#96613a', font: "'Dancing Script', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#e8e3d0', '#5c7350', '#96613a', '#8c2f39'],
    warna: WARNA['ramuan-cinta'],
    feats: [
      'Kisah cinta ditulis sebagai daftar bahan terukur Formula No. 12',
      'Acara tampil sebagai Label Botol I (Akad) & Label Botol II (Resepsi)',
      'Countdown tabung reaksi — cairan terisi perlahan menuju hari-H',
      'RSVP hasil uji laboratorium terstempel "COCOK" (demo lokal)',
      'Amplop digital berupa resep & musik latar sintesis WebAudio'
    ],
    preview: 'ramuan-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=ramuan-cinta',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'radio-cinta', name: 'Radio Cinta',
    tagline: 'Radio yang disetel sendiri oleh tamu — geser kenop melewati desis ke 98.6 FM sampai ON AIR menyala & penyiar menyapa namamu',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#241610,#3a2317 55%,#17100b)',
    ring: '#c9973f', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'orbs',
    swatch: ['#3a2317', '#c9973f', '#b3402e', '#f3ead8'],
    warna: WARNA['radio-cinta'],
    feats: [
      'Kenop frekuensi digeser tamu — desis statis memudar sampai terkunci di 98.6 FM',
      'Panel ON AIR menyala & penyiar menyapa nama tamu saat sinyal jernih',
      'Isi sebagai jadwal program siaran + galeri album request dengan lightbox',
      'RSVP telepon masuk ke studio — "Terhubung — Kehadiran Tercatat" (demo lokal)',
      'Musik & suara radio sintesis WebAudio setelah sinyal ditemukan'
    ].concat(WEB_FEATS),
    preview: 'radio-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=radio-cinta&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
  });

  ENTRIES.push({
    slug: 'observatorium', name: 'Observatorium',
    tagline: 'Di bawah bintang yang sama — rasi M·F terlukis saat dibuka, countdown teleskop & galeri planet kenangan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#0b1026,#1c2a4a 55%,#0b1026)',
    ring: '#c9973f', ring2: '#7a9cc6', font: "'Parisienne', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#0b1026', '#c9973f', '#2e4057', '#f3ead8'],
    warna: WARNA['observatorium'],
    feats: [
      'Rasi bintang "M·F" terlukis bintang demi bintang saat undangan dibuka',
      'Countdown teleskop dengan Pembacaan Astronom',
      'Galeri Planet Kenangan — ketuk planet untuk membaca kisahnya',
      'RSVP tiket misi terstempel "SIAP MELUNCUR" (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ],
    preview: 'observatorium?to=Tamu%20Undangan',
    order: 'checkout?tema=observatorium',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'kedai-kopi', name: 'Kedai Kopi',
    tagline: 'Menu kafe artisan — racikan kisah berharga momen & tanggal, RSVP struk tercetak & kartu stempel loyalitas',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f1e6d2,#e2cdb0 55%,#c8a97e)',
    ring: '#96613a', ring2: '#c08b57', font: "'Dancing Script', cursive", orn: '❦', shape: 'orbs',
    swatch: ['#f1e6d2', '#96613a', '#5e4028', '#8c2f39'],
    warna: WARNA['kedai-kopi'],
    feats: [
      'Cover cangkir mengepul dengan uap beranimasi',
      'Kisah cinta sebagai menu racikan — kolom harga diganti momen & tanggal',
      'RSVP tercetak keluar sebagai struk kasir berisi pesanan tamu (demo lokal)',
      'Amplop digital kartu stempel loyalitas (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ],
    preview: 'kedai-kopi?to=Tamu%20Undangan',
    order: 'checkout?tema=kedai-kopi',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'papan-permainan', name: 'Papan Permainan',
    tagline: 'Board game kisah cinta — lempar dadu sungguhan, bidak melompat petak demi petak membuka babak sampai finish AKAD',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#f6ecdc,#e9d9ae 55%,#c9b083)',
    ring: '#c9973f', ring2: '#5c7350', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#f6ecdc', '#c9973f', '#5c7350', '#8c2f39'],
    warna: WARNA['papan-permainan'],
    feats: [
      'Dadu digital sungguhan — lempar & bidak melompat petak demi petak',
      '12 petak papan, tiap petak membuka Kartu Babak kisah',
      'Finish AKAD memicu perayaan bintang emas',
      'Jalan pintas elegan ke info acara + RSVP Kartu Kesempatan terbalik 3D (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ].concat(WEB_FEATS),
    preview: 'papan-permainan?to=Tamu%20Undangan',
    order: 'checkout?tema=papan-permainan&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
  });

  ENTRIES.push({
    slug: 'oceanarium', name: 'Oceanarium',
    tagline: 'Tiket oceanarium — menyelam dari permukaan 0 m sampai penutup bioluminesensi di 40 m, amplop pesan dalam botol',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#0a2e4a,#0e4a66 55%,#04182b)',
    ring: '#1f7a72', ring2: '#c9973f', font: "'Parisienne', cursive", orn: '✦', shape: 'orbs',
    swatch: ['#0a2e4a', '#1f7a72', '#c9973f', '#eaf6f6'],
    warna: WARNA['oceanarium'],
    feats: [
      'Pengalaman menyelam — pengukur kedalaman tetap berubah 0 sampai 40 m mengikuti scroll',
      'Jendela akuarium berbingkai dengan ikan berenang, gelembung & cahaya caustics',
      'Amplop pesan dalam botol — gabus terlempar & gulungan terbuka (demo lokal)',
      'RSVP tiket terstempel "PENYELAM TERCATAT" (demo lokal)',
      'Penutup bioluminesensi bercahaya & musik WebAudio setelah undangan dibuka'
    ],
    preview: 'oceanarium?to=Tamu%20Undangan',
    order: 'checkout?tema=oceanarium',
    rec: '<b>Rekomendasi paket:</b> tema ilustrasi premium termasuk mulai <b>Paket Premium</b> (Rp110.000).'
  });

  ENTRIES.push({
    slug: 'pasar-malam', name: 'Pasar Malam',
    tagline: 'Festival malam burgundy-emas — gerbang marquee menyala huruf demi huruf & bianglala galeri yang bisa digeser',
    cat: 'interaktif',
    bg: 'linear-gradient(170deg,#1d0710,#57182a 55%,#12060b)',
    ring: '#c9973f', ring2: '#e3c26e', font: "'Great Vibes', cursive", orn: '✦', shape: 'crystals',
    swatch: ['#57182a', '#c9973f', '#e3a0b0', '#f8f1e6'],
    warna: WARNA['pasar-malam'],
    feats: [
      'Gerbang marquee "PASAR MALAM CINTA" menyala huruf demi huruf',
      'Bianglala galeri berputar otomatis & bisa digeser — ketuk kabin untuk foto besar',
      'Mempelai di komidi putar & set medali AI per wahana',
      'RSVP tiket wahana terstempel "SUDAH NAIK" (demo lokal)',
      'Musik latar sintesis WebAudio setelah undangan dibuka'
    ].concat(WEB_FEATS),
    preview: 'pasar-malam?to=Tamu%20Undangan',
    order: 'checkout?tema=pasar-malam&paket=luxury',
    rec: '<b>Rekomendasi paket:</b> tema interaktif termasuk di <b>Paket Luxury</b> (Rp280.000).'
  });

  ENTRIES.push({
    slug: 'kastil-dongeng', name: 'Kastil Dongeng',
    tagline: 'Kastil dongeng cat air tujuh menara — adegan hidup berlapis, bunga menari tertiup angin',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7e8f2,#f3d9e8 55%,#dfe9f7)',
    ring: '#b45a8c', ring2: '#7d9cc4', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b45a8c", "#7d9cc4", "#f3d9e8", "#fff7fb"],
    warna: ["Pink", "Biru"],
    feats: [
      'Kastil dongeng cat air tujuh menara — adegan hidup berlapis, bunga menari tertiup angin',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'kastil-dongeng?to=Tamu%20Undangan',
    order: 'checkout?tema=kastil-dongeng',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'joglo-pusaka', name: 'Joglo Pusaka',
    tagline: 'Joglo Jawa megah — scene hidup pusaka dengan gerak sepoi-sepoi',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2e1b0d,#4a2e1b 55%,#5c1622)',
    ring: '#c9a24b', ring2: '#e9c979', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#4a2e1b", "#c9a24b", "#7c1f2e", "#f8f1e6"],
    warna: ["Cokelat", "Emas"],
    feats: [
      'Joglo Jawa megah — scene hidup pusaka dengan gerak sepoi-sepoi',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'joglo-pusaka?to=Tamu%20Undangan',
    order: 'checkout?tema=joglo-pusaka',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'pusaka-sogan', name: 'Pusaka Sogan',
    tagline: 'Jawa sogan gelap — joglo jati berlampu damar, gebyok, batik parang & gunungan wayang',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#1c1108,#33200f 55%,#120a04)',
    ring: '#c9973f', ring2: '#8a5a2b', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#33200f", "#c9973f", "#8a5a2b", "#f3e6cf"],
    warna: ["Cokelat", "Emas"],
    feats: [
      'Jawa sogan gelap — joglo jati berlampu damar, gebyok, batik parang & gunungan wayang',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'pusaka-sogan?to=Tamu%20Undangan',
    order: 'checkout?tema=pusaka-sogan',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'flora-raya', name: 'Flora Raya',
    tagline: 'Taman flora raya super padat — hamparan bunga hidup di setiap section',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#fdf0f3,#f9dfe4 55%,#e7f0dc)',
    ring: '#c2607e', ring2: '#7d8b6f', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#c2607e", "#7d8b6f", "#f6ccd6", "#fff8f2"],
    warna: ["Pink", "Hijau"],
    feats: [
      'Taman flora raya super padat — hamparan bunga hidup di setiap section',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'flora-raya?to=Tamu%20Undangan',
    order: 'checkout?tema=flora-raya',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'maple-gugur', name: 'Maple Gugur',
    tagline: 'Musim gugur maple — daun berguguran melayang di atas taman senja',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#fbeedd,#f6d9b8 55%,#e8b07e)',
    ring: '#b45a2d', ring2: '#c9973f', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b45a2d", "#c9973f", "#f6d9b8", "#fff7ec"],
    warna: ["Oranye", "Emas"],
    feats: [
      'Musim gugur maple — daun berguguran melayang di atas taman senja',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'maple-gugur?to=Tamu%20Undangan',
    order: 'checkout?tema=maple-gugur',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'negeri-awan', name: 'Negeri Awan',
    tagline: 'Negeri di atas awan — istana melayang dan awan bergerak perlahan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#eef4fc,#dbe9fa 55%,#c3d9f5)',
    ring: '#5b84b8', ring2: '#c9a24b', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#5b84b8", "#c9a24b", "#dbe9fa", "#ffffff"],
    warna: ["Biru", "Putih"],
    feats: [
      'Negeri di atas awan — istana melayang dan awan bergerak perlahan',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'negeri-awan?to=Tamu%20Undangan',
    order: 'checkout?tema=negeri-awan',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'anime-senja', name: 'Anime Senja',
    tagline: 'Senja bergaya anime — langit gradasi dramatis dan siluet pasangan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#2c1e4f,#6b3062 55%,#e2703a)',
    ring: '#e2703a', ring2: '#f2b879', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#2c1e4f", "#e2703a", "#f2b879", "#ffe9d6"],
    warna: ["Ungu", "Oranye"],
    feats: [
      'Senja bergaya anime — langit gradasi dramatis dan siluet pasangan',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'anime-senja?to=Tamu%20Undangan',
    order: 'checkout?tema=anime-senja',
    rec: '<b>Kelas SIGNATURE:</b> tema aset padat ini mulai <b>Rp149.000</b>.'
  });

  ENTRIES.push({
    slug: 'pinus-rimba', name: 'Pinus Rimba',
    tagline: 'Hutan pinus pegunungan — kabut tipis dan cahaya sela kanopi',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Hutan pinus pegunungan — kabut tipis dan cahaya sela kanopi',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'pinus-rimba?to=Tamu%20Undangan',
    order: 'checkout?tema=pinus-rimba',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'samudra-bajak', name: 'Samudra Bajak',
    tagline: 'Petualangan bajak laut — kapal, peta harta, dan ombak samudra',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Petualangan bajak laut — kapal, peta harta, dan ombak samudra',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'samudra-bajak?to=Tamu%20Undangan',
    order: 'checkout?tema=samudra-bajak',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'sakura-hana', name: 'Sakura Hana',
    tagline: 'Sakura bermekaran — kelopak pink melayang di taman Jepang',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Sakura bermekaran — kelopak pink melayang di taman Jepang',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'sakura-hana?to=Tamu%20Undangan',
    order: 'checkout?tema=sakura-hana',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'balon-fajar', name: 'Balon Fajar',
    tagline: 'Balon udara saat fajar — langit keemasan dan lembah berkabut',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Balon udara saat fajar — langit keemasan dan lembah berkabut',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'balon-fajar?to=Tamu%20Undangan',
    order: 'checkout?tema=balon-fajar',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'lentera-ajaib', name: 'Lentera Ajaib',
    tagline: 'Lentera terbang ajaib — malam berbintang penuh cahaya hangat',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Lentera terbang ajaib — malam berbintang penuh cahaya hangat',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'lentera-ajaib?to=Tamu%20Undangan',
    order: 'checkout?tema=lentera-ajaib',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'onyx-luxury', name: 'Onyx Luxury',
    tagline: 'Kemewahan onyx hitam & emas — elegan, gelap, berkelas',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Kemewahan onyx hitam & emas — elegan, gelap, berkelas',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'onyx-luxury?to=Tamu%20Undangan',
    order: 'checkout?tema=onyx-luxury',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'monokrom-noir', name: 'Monokrom Noir',
    tagline: 'Noir hitam-putih sinematik — kontras tegas bergaya film klasik',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Noir hitam-putih sinematik — kontras tegas bergaya film klasik',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'monokrom-noir?to=Tamu%20Undangan',
    order: 'checkout?tema=monokrom-noir',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'rimba-jungle', name: 'Rimba Jungle',
    tagline: 'Rimba tropis lebat — dedaunan besar dan cahaya hutan hujan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Rimba tropis lebat — dedaunan besar dan cahaya hutan hujan',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'rimba-jungle?to=Tamu%20Undangan',
    order: 'checkout?tema=rimba-jungle',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'galaksi-jauh', name: 'Galaksi Jauh',
    tagline: 'Galaksi jauh — nebula, planet, dan bintang jatuh',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Galaksi jauh — nebula, planet, dan bintang jatuh',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'galaksi-jauh?to=Tamu%20Undangan',
    order: 'checkout?tema=galaksi-jauh',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'paris-romansa', name: 'Paris Romansa',
    tagline: 'Romansa Paris — menara Eiffel, kafe, dan senja keemasan',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Romansa Paris — menara Eiffel, kafe, dan senja keemasan',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'paris-romansa?to=Tamu%20Undangan',
    order: 'checkout?tema=paris-romansa',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'gadang-pusako', name: 'Gadang Pusako',
    tagline: 'Rumah Gadang Minangkabau — gonjong megah & ukiran pusako',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Rumah Gadang Minangkabau — gonjong megah & ukiran pusako',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'gadang-pusako?to=Tamu%20Undangan',
    order: 'checkout?tema=gadang-pusako',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'tongkonan-pusaka', name: 'Tongkonan Pusaka',
    tagline: 'Tongkonan Toraja — rumah adat beratap perahu & ukiran pusaka',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Tongkonan Toraja — rumah adat beratap perahu & ukiran pusaka',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'tongkonan-pusaka?to=Tamu%20Undangan',
    order: 'checkout?tema=tongkonan-pusaka',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'kebun-teh', name: 'Kebun Teh Pegunungan',
    tagline: 'Kebun teh pegunungan — hamparan hijau berundak sejuk berkabut',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Kebun teh pegunungan — hamparan hijau berundak sejuk berkabut',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'kebun-teh?to=Tamu%20Undangan',
    order: 'checkout?tema=kebun-teh',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'mercusuar-cinta', name: 'Mercusuar Cinta',
    tagline: 'Mercusuar di tepi laut — cahaya penuntun di senja pantai',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Mercusuar di tepi laut — cahaya penuntun di senja pantai',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'mercusuar-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=mercusuar-cinta',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'oasis-malam', name: 'Oasis Malam',
    tagline: 'Oasis di malam gurun — bulan purnama, palem, dan bintang',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Oasis di malam gurun — bulan purnama, palem, dan bintang',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'oasis-malam?to=Tamu%20Undangan',
    order: 'checkout?tema=oasis-malam',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'kerajaan-laut', name: 'Kerajaan Laut',
    tagline: 'Kerajaan bawah laut — istana karang, gelembung, dan cahaya biru',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Kerajaan bawah laut — istana karang, gelembung, dan cahaya biru',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'kerajaan-laut?to=Tamu%20Undangan',
    order: 'checkout?tema=kerajaan-laut',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'peri-lembah', name: 'Peri Lembah',
    tagline: 'Lembah peri — jamur bercahaya, kunang-kunang, dan bunga ajaib',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Lembah peri — jamur bercahaya, kunang-kunang, dan bunga ajaib',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'peri-lembah?to=Tamu%20Undangan',
    order: 'checkout?tema=peri-lembah',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'pustaka-cinta', name: 'Pustaka Cinta',
    tagline: 'Perpustakaan klasik — rak buku menjulang & cahaya lampu hangat',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Perpustakaan klasik — rak buku menjulang & cahaya lampu hangat',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'pustaka-cinta?to=Tamu%20Undangan',
    order: 'checkout?tema=pustaka-cinta',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'istana-joseon', name: 'Istana Joseon',
    tagline: 'Istana Joseon Korea — hanbok, gerbang istana, dan bunga persik',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Istana Joseon Korea — hanbok, gerbang istana, dan bunga persik',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'istana-joseon?to=Tamu%20Undangan',
    order: 'checkout?tema=istana-joseon',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'premiere-glam', name: 'Premiere Glam',
    tagline: 'Premiere glam Hollywood — karpet merah, lampu sorot, dan kilau emas',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Premiere glam Hollywood — karpet merah, lampu sorot, dan kilau emas',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'premiere-glam?to=Tamu%20Undangan',
    order: 'checkout?tema=premiere-glam',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'istana-salju', name: 'Istana Salju',
    tagline: 'Istana salju — kristal es, aurora, dan putih berkilau',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Istana salju — kristal es, aurora, dan putih berkilau',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'istana-salju?to=Tamu%20Undangan',
    order: 'checkout?tema=istana-salju',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'misi-rahasia', name: 'Misi Rahasia',
    tagline: 'Misi rahasia agen — berkas rahasia, kode sandi, dan target: menikah',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Misi rahasia agen — berkas rahasia, kode sandi, dan target: menikah',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'misi-rahasia?to=Tamu%20Undangan',
    order: 'checkout?tema=misi-rahasia',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'pahlawan-kota', name: 'Pahlawan Kota',
    tagline: 'Pahlawan kota — skyline malam, lampu kota, dan aksi heroik',
    cat: 'ilustrasi',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Pahlawan kota — skyline malam, lampu kota, dan aksi heroik',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'pahlawan-kota?to=Tamu%20Undangan',
    order: 'checkout?tema=pahlawan-kota',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'kertas-tinta', name: 'Kertas & Tinta',
    tagline: 'Kertas & tinta — bersih tonal, foto sebagai bintang utama',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Kertas & tinta — bersih tonal, foto sebagai bintang utama',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'kertas-tinta?to=Tamu%20Undangan',
    order: 'checkout?tema=kertas-tinta',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'terakota-senja', name: 'Terakota Senja',
    tagline: 'Terakota senja — hangat tanah liat dan cahaya sore',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Terakota senja — hangat tanah liat dan cahaya sore',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'terakota-senja?to=Tamu%20Undangan',
    order: 'checkout?tema=terakota-senja',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'linen-sage', name: 'Linen & Sage',
    tagline: 'Linen & sage — lembut natural bernapas tenang',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Linen & sage — lembut natural bernapas tenang',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'linen-sage?to=Tamu%20Undangan',
    order: 'checkout?tema=linen-sage',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'pesisir-putih', name: 'Pesisir Putih',
    tagline: 'Pesisir putih — terang pantai dan semilir laut',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Pesisir putih — terang pantai dan semilir laut',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'pesisir-putih?to=Tamu%20Undangan',
    order: 'checkout?tema=pesisir-putih',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'ladang-lavender', name: 'Ladang Lavender',
    tagline: 'Ladang lavender — ungu lembut sejauh mata memandang',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Ladang lavender — ungu lembut sejauh mata memandang',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'ladang-lavender?to=Tamu%20Undangan',
    order: 'checkout?tema=ladang-lavender',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'blush-krem', name: 'Blush & Krem',
    tagline: 'Blush & krem — manis pucat dengan sentuhan romantis',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Blush & krem — manis pucat dengan sentuhan romantis',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'blush-krem?to=Tamu%20Undangan',
    order: 'checkout?tema=blush-krem',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'washi-indigo', name: 'Washi Indigo',
    tagline: 'Washi indigo — kertas Jepang biru nila bertekstur',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Washi indigo — kertas Jepang biru nila bertekstur',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'washi-indigo?to=Tamu%20Undangan',
    order: 'checkout?tema=washi-indigo',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'garis-emas', name: 'Garis Emas',
    tagline: 'Garis emas — minimalis mewah beraksen garis emas',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Garis emas — minimalis mewah beraksen garis emas',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'garis-emas?to=Tamu%20Undangan',
    order: 'checkout?tema=garis-emas',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'senja-pastel', name: 'Senja Pastel',
    tagline: 'Senja pastel — gradasi lembut jingga ke ungu muda',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Senja pastel — gradasi lembut jingga ke ungu muda',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'senja-pastel?to=Tamu%20Undangan',
    order: 'checkout?tema=senja-pastel',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'anyaman-rotan', name: 'Anyaman Rotan',
    tagline: 'Anyaman rotan — tekstur alami hangat bernuansa tropis',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Anyaman rotan — tekstur alami hangat bernuansa tropis',
      'Galeri foto geser & lightbox, love story, dresscode, denah lokasi',
      'Countdown real-time & kalender (Google Calendar + .ICS)',
      'Musik latar Petals on the Stone Floor'
    ].concat(WEB_FEATS),
    preview: 'anyaman-rotan?to=Tamu%20Undangan',
    order: 'checkout?tema=anyaman-rotan',
    rec: '<b>Kelas ESSENTIAL:</b> tema fitur lengkap ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'gading-klasik', name: 'Gading Klasik',
    tagline: 'Slide klasik simetris — foto oval, nuansa gading elegan',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'gading-klasik?to=Tamu%20Undangan',
    order: 'checkout?tema=gading-klasik',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'anggur-maroon', name: 'Anggur Maroon',
    tagline: 'Slide foto penuh + panel maroon — warna berganti tiap layar',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'anggur-maroon?to=Tamu%20Undangan',
    order: 'checkout?tema=anggur-maroon',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'lumut-lembut', name: 'Lumut Lembut',
    tagline: 'Slide split foto atas & konten bawah — hijau lumut lembut',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'lumut-lembut?to=Tamu%20Undangan',
    order: 'checkout?tema=lumut-lembut',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'langit-powder', name: 'Langit Powder',
    tagline: 'Kartu melayang di atas foto penuh — biru langit powder',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'langit-powder?to=Tamu%20Undangan',
    order: 'checkout?tema=langit-powder',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'peach-susu', name: 'Peach Susu',
    tagline: 'Bingkai lengkung raksasa konsisten — peach susu manis',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'peach-susu?to=Tamu%20Undangan',
    order: 'checkout?tema=peach-susu',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'abu-mutiara', name: 'Abu Mutiara',
    tagline: 'Editorial zig-zag kiri-kanan — abu mutiara modern',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'abu-mutiara?to=Tamu%20Undangan',
    order: 'checkout?tema=abu-mutiara',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'kopi-susu', name: 'Kopi Susu',
    tagline: 'Tipografi raksasa + strip polaroid — kopi susu hangat',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'kopi-susu?to=Tamu%20Undangan',
    order: 'checkout?tema=kopi-susu',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'ungu-taro', name: 'Ungu Taro',
    tagline: 'Komposisi melingkar — foto bulat besar ungu taro',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'ungu-taro?to=Tamu%20Undangan',
    order: 'checkout?tema=ungu-taro',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'kuning-mentega', name: 'Kuning Mentega',
    tagline: 'Slide majalah — judul raksasa, foto kecil rapi, lega',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'kuning-mentega?to=Tamu%20Undangan',
    order: 'checkout?tema=kuning-mentega',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'putih-hitam-minim', name: 'Putih Hitam Minim',
    tagline: 'Tipografi murni hitam-putih — satu foto B/W per slide',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Slide layar penuh bergaya presentasi — tiap bagian satu layar',
      'Galeri 6 foto, RSVP & dinding ucapan (demo lokal)',
      'Countdown, acara + Google Maps & simpan kalender (.ICS)',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'putih-hitam-minim?to=Tamu%20Undangan',
    order: 'checkout?tema=putih-hitam-minim',
    rec: '<b>Kelas BASIC:</b> tema slide simple ini mulai <b>Rp49.000</b>.'
  });

  ENTRIES.push({
    slug: 'tinta-navy', name: 'Tinta Navy',
    tagline: 'Dua warna navy & putih kertas — klasik garis tipis, maks 2 foto',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Dua warna saja, bersih & ringan — maksimal 2 foto',
      'Countdown & acara + tombol Google Maps',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'tinta-navy?to=Tamu%20Undangan',
    order: 'checkout?tema=tinta-navy',
    rec: 'Tema <b>GRATIS</b> (Rp0) — fitur inti, maksimal 2 foto.'
  });

  ENTRIES.push({
    slug: 'daun-krem', name: 'Daun Krem',
    tagline: 'Dua warna hijau botol & krem — aksen daun gambar tangan, maks 2 foto',
    cat: 'simple',
    bg: 'linear-gradient(170deg,#f7efe0,#efe3cb 55%,#e9dcbf)',
    ring: '#b98a2f', ring2: '#d9b45c', font: "'Great Vibes', cursive", orn: '✦', shape: 'hearts',
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"],
    warna: ["Emas", "Krem"],
    feats: [
      'Dua warna saja, bersih & ringan — maksimal 2 foto',
      'Countdown & acara + tombol Google Maps',
      'Amplop digital & musik latar Petals on the Stone Floor'
    ],
    preview: 'daun-krem?to=Tamu%20Undangan',
    order: 'checkout?tema=daun-krem',
    rec: 'Tema <b>GRATIS</b> (Rp0) — fitur inti, maksimal 2 foto.'
  });

  ENTRIES.forEach(function (e) { bySlug[e.slug] = e; });

  /* ---------- Landing: HANYA 5 template terbaik ----------
     Perintah user 2026-11-13: grid koleksi di landing page hanya
     menampilkan 5 template terbaik. Data ENTRIES lengkap tetap
     dipertahankan (quick view & konsistensi slug); yang dibatasi
     hanya yang DITAMPILKAN di grid landing. Katalog lengkap tetap
     di halaman /katalog. */
  var FEATURED = ['kastil-dongeng', 'pusaka-sogan', 'joglo-pusaka', 'flora-raya', 'negeri-awan'];
  var LANDING = FEATURED.map(function (slug) { return bySlug[slug]; })
    .filter(function (e) { return !!e; });

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

  /* ---------- Kartu koleksi landing: mockup 3 HP (pola katalog) ----------
     Perintah user 2026-11-14: kartu grid koleksi landing diganti
     preview mockup HP seperti di katalog — komposisi 3 HP realistis
     per template (tengah sampul, kiri rangkaian acara, kanan galeri
     + RSVP), chip fitur melayang, nomor urut, lencana kelas + harga,
     tombol "Lihat Preview" (overlay satu HP besar berisi iframe
     tema asli) dan "Gunakan Template" (checkout). Kelas, harga &
     chip kelima template terbaik diselaraskan dengan data kanonis
     katalog.js. */
  var LP_CHIPS = ['Galeri Foto', 'RSVP', 'Countdown', 'Amplop Digital', 'Love Story', 'Musik'];
  var LP_META = {
    'kastil-dongeng': { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS },
    'pusaka-sogan': { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS },
    'joglo-pusaka': { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS },
    'flora-raya': { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS },
    'negeri-awan': { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS }
  };
  var LP_CHIP_ICON = {
    'Galeri Foto': 'ic-camera', 'RSVP': 'ic-check', 'Countdown': 'ic-clock',
    'Amplop Digital': 'ic-gift', 'Love Story': 'ic-heart', 'Musik': 'ic-music',
    'Maps': 'ic-pin'
  };
  var LP_CHIP_POS = ['pos-tl', 'pos-tr', 'pos-ml', 'pos-mr', 'pos-bl', 'pos-br'];
  function lpEsc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function lpRupiah(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function lpPriceHTML(m) {
    return '<span class="price"><small>Mulai</small>' + lpRupiah(m.price) + '</span>';
  }
  function lpBadgeHTML(m) {
    return '<span class="badge ' + m.kelas.toLowerCase() + '">' + m.kelas + '</span>';
  }
  function lpIcon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>'; }
  function lpPhoneOpen(cls) {
    return '<div class="phone ' + cls + '"><span class="notch"></span><span class="hw" aria-hidden="true"></span>';
  }
  function lpStageHTML(e) {
    var m = LP_META[e.slug];
    var thumb = 'assets/katalog/' + e.slug + '.webp';
    var alt = 'Cuplikan desain ' + lpEsc(e.name);
    var chips = m.chips.slice(0, 6).map(function (c, i) {
      var ic = LP_CHIP_ICON[c] || 'ic-heart';
      return '<span class="fchip ' + LP_CHIP_POS[i % LP_CHIP_POS.length] + '" style="--dl:' + (i * 0.35).toFixed(2) + 's">' +
        '<span class="ic">' + lpIcon(ic) + '</span><span class="tx">' + lpEsc(c) + '</span></span>';
    }).join('');
    return '<div class="stage">' +
      '<svg class="flora bl" aria-hidden="true"><use href="#flora"></use></svg>' +
      '<svg class="flora tr" aria-hidden="true"><use href="#flora"></use></svg>' +
      lpPhoneOpen('ph-left') +
        '<div class="scr sched">' +
          '<div class="sched-img"><img src="' + thumb + '" alt="" loading="lazy"></div>' +
          '<div class="sched-body"><h4>Rangkaian Acara</h4>' +
            '<div class="ev"><h5>Akad Nikah</h5><p><b>08.00 – 10.00 WIB</b></p></div>' +
            '<div class="ev"><h5>Resepsi</h5><p><b>11.00 – 13.00 WIB</b></p></div>' +
            '<span class="loc-btn">' + lpIcon('ic-pin') + 'Lihat Lokasi</span>' +
          '</div>' +
        '</div></div>' +
      lpPhoneOpen('ph-mid') +
        '<div class="scr"><img class="cover-img" src="' + thumb + '" alt="' + alt + '" loading="lazy"></div></div>' +
      lpPhoneOpen('ph-right') +
        '<div class="scr gal"><h4>Galeri Kami</h4>' +
          '<div class="tiles">' +
            '<div class="tile"><img class="tp1" src="' + thumb + '" alt="" loading="lazy"></div>' +
            '<div class="tile"><img class="tp2" src="' + thumb + '" alt="" loading="lazy"></div>' +
            '<div class="tile"><img class="tp3" src="' + thumb + '" alt="" loading="lazy"></div>' +
            '<div class="tile"><img class="tp4" src="' + thumb + '" alt="" loading="lazy"></div>' +
          '</div>' +
          '<div class="rsvp-mini"><h5>Konfirmasi Kehadiran</h5><span class="yes">Saya Hadir</span></div>' +
        '</div></div>' +
      chips +
      '</div>';
  }

  function cardHTML(e, i) {
    var m = LP_META[e.slug] || { kelas: 'SIGNATURE', price: 149000, chips: LP_CHIPS };
    var num = ('0' + (i + 1)).slice(-2);
    return '<article class="kcard" data-slug="' + lpEsc(e.slug) + '" data-kelas="' + m.kelas + '">' +
      '<span class="num">' + num + '</span>' +
      lpStageHTML(e) +
      '<div class="card-foot">' +
        '<h2>' + lpEsc(e.name) + '</h2>' +
        '<p class="k-tagline">' + lpEsc(e.tagline) + '</p>' +
        '<div class="meta">' + lpBadgeHTML(m) + lpPriceHTML(m) + '</div>' +
        '<div class="card-btns">' +
          '<button type="button" class="btn btn-line" data-preview="' + lpEsc(e.slug) + '">Lihat Preview</button>' +
          '<a class="btn btn-gold" href="' + e.order + '">Gunakan Template</a>' +
        '</div>' +
      '</div></article>';
  }

  function render() {
    /* Grid landing kini hanya menampilkan 5 template terbaik
       (LANDING) — filter kategori/warna/cari tidak lagi dipakai. */
    var list = LANDING;
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.textContent = 'Menampilkan ' + list.length + ' desain pilihan terbaik';
    if (emptyEl) emptyEl.hidden = list.length > 0;
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

  /* ---------- Overlay preview koleksi: satu HP besar (pola katalog) ---------- */
  var pvOverlay = $('#pvOverlay'), pvFrame = $('#pvFrame'),
      pvName = $('#pvName'), pvMeta = $('#pvMeta'),
      pvTagline = $('#pvTagline'), pvOrder = $('#pvOrder'), pvLastFocus = null;
  function openPreview(slug, opener) {
    var e = bySlug[slug], m = LP_META[slug];
    if (!e || !m || !pvOverlay) return;
    pvLastFocus = opener || document.activeElement;
    pvName.textContent = e.name;
    pvMeta.innerHTML = lpBadgeHTML(m) + lpPriceHTML(m);
    pvTagline.textContent = e.tagline;
    pvOrder.setAttribute('href', e.order);
    pvFrame.setAttribute('src', e.preview);
    pvOverlay.hidden = false;
    document.body.classList.add('pv-lock');
    var x = $('.pv-x', pvOverlay);
    if (x) x.focus();
  }
  function closePreview() {
    if (!pvOverlay || pvOverlay.hidden) return;
    pvOverlay.hidden = true;
    pvFrame.setAttribute('src', 'about:blank');
    document.body.classList.remove('pv-lock');
    if (pvLastFocus && pvLastFocus.focus) pvLastFocus.focus();
  }
  if (grid) grid.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-preview]');
    if (b) openPreview(b.dataset.preview, b);
  });
  if (pvOverlay) {
    $$('[data-close]', pvOverlay).forEach(function (el) {
      el.addEventListener('click', closePreview);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closePreview();
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
