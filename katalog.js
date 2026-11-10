/* ============================================================
   UNDANGYA! — katalog.js (v2, multi-format)
   Halaman Katalog: empat koleksi format (Simple 2D, Motion 2D,
   Cinematic, 3D Interactive) di atas galeri template nyata.
   Slug, tautan preview & pesan disamakan persis dengan katalog
   beranda (site.js ENTRIES) — dijaga test_katalog.js.
   Harga contoh terpusat di PRICING (mudah diubah, bukan harga
   permanen); harga tiap template = salah satu tingkat formatnya.
   State filter tersimpan di sessionStorage + query URL agar
   tetap ada saat pengguna kembali dari halaman preview.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Mobile nav (sama seperti site.js) ---------- */
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
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Konfigurasi harga (EDIT DI SINI) ---------- */
  var PRICING = {
    'simple-2d':      { base: 49000 },
    'motion-2d':      { base: 79000, advanced: 99000 },
    'cinematic':      { base: 155000, premium: 199000 },
    '3d-interactive': { base: 299000, premium: 399000, exclusive: 499000 }
  };

  var FORMATS = [
    { id: 'simple-2d', label: 'Simple 2D', tagline: 'Elegan, minimalis, dan terjangkau.', thumb: 'ivory-botanical' },
    { id: 'motion-2d', label: 'Motion 2D', tagline: 'Lebih hidup dengan animasi yang memikat.', thumb: 'bali-pastel' },
    { id: 'cinematic', label: 'Cinematic', tagline: 'Ceritakan momen istimewa dengan visual sinematik.', thumb: 'burgundy-palace' },
    { id: '3d-interactive', label: '3D Interactive', tagline: 'Jelajahi pengalaman undangan tiga dimensi.', thumb: 'emerald-luxe' }
  ];
  var FORMAT_LABEL = {};
  FORMATS.forEach(function (f) { FORMAT_LABEL[f.id] = f.label; });

  /* ---------- Data katalog (template nyata) ---------- */
  var ACARA = [
    { id: 'semua', label: 'Semua' },
    { id: 'pernikahan', label: 'Pernikahan' },
    { id: 'aqiqah', label: 'Aqiqah' },
    { id: 'ulang-tahun', label: 'Ulang Tahun' },
    { id: 'khitanan', label: 'Khitanan' },
    { id: 'bisnis', label: 'Bisnis' },
    { id: 'wisuda', label: 'Wisuda' },
    { id: 'lainnya', label: 'Acara Lainnya' }
  ];
  var ACARA_LABEL = { pernikahan: 'Pernikahan', aqiqah: 'Aqiqah', 'ulang-tahun': 'Ulang Tahun', khitanan: 'Khitanan', bisnis: 'Bisnis', wisuda: 'Wisuda', lainnya: 'Acara Lainnya' };
  var DOT = { Burgundy: '#8c2f39', Ivory: '#f3ead8', Gold: '#c9973f', Emerald: '#0e5c46', Sage: '#9caf88', Blush: '#e3a0b0', Navy: '#2e4057', Monochrome: '#26262a' };
  var HARGA_BAND = {
    b100: { label: 'Di bawah Rp100.000', test: function (p) { return p < 100000; } },
    m100: { label: 'Rp100.000 – Rp200.000', test: function (p) { return p >= 100000 && p <= 200000; } },
    a200: { label: 'Di atas Rp200.000', test: function (p) { return p > 200000; } }
  };

  var CATALOG = [
    { slug: 'taman-rahasia', name: 'Taman Rahasia', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Botanical', 'Floral'], warna: ['Blush', 'Sage'],
      tagline: 'Taman interaktif — kelopak mengikuti sentuhan, kupu-kupu beterbangan, ucapan mekar jadi bunga',
      preview: 'taman-rahasia?to=Tamu%20Undangan', order: 'checkout?tema=taman-rahasia&paket=platinum',
      cari: 'taman interaktif kelopak kupu-kupu kebun doa flip countdown sentuh canvas' },
    { slug: 'javanese-illustrated', name: 'Javanese Illustrated', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Jawa'], style: ['Royal', 'Floral'], warna: ['Gold'],
      tagline: 'Undangan ilustrasi Jawa berlapis — animasi pembuka, batik kawung-parang, foto prewedding asli',
      preview: 'javanese-illustrated?to=Tamu%20Undangan', order: 'checkout?tema=javanese-illustrated',
      cari: 'jawa adat ilustrasi joglo gunungan batik pawiwahan tradisional lukisan motion' },
    { slug: 'masjid-bunga', name: 'Masjid Bunga', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Nusantara'], style: ['Islamic', 'Floral'], warna: ['Ivory', 'Gold', 'Sage'],
      tagline: 'Masjid cat air di tengah taman bunga — lengkung emas & intro sinematik berlapis',
      preview: 'masjid-bunga', order: 'checkout?tema=masjid-bunga',
      cari: 'masjid islami islamic mosque cat air bunga taman kubah cinematic sinematik' },
    { slug: 'pink-garden-fountain', name: 'Pink Garden Fountain', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Floral', 'Luxury'], warna: ['Blush', 'Sage'],
      tagline: 'Taman merah muda & air mancur yang semburannya membentuk gaun pengantin',
      preview: 'pink-garden-fountain', order: 'checkout?tema=pink-garden-fountain',
      cari: 'pink garden fountain air mancur gaun taman bunga motion animasi' },
    { slug: 'bali-pastel', name: 'Bali Pastel Romance', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Bali'], style: ['Floral', 'Botanical'], warna: ['Blush', 'Ivory'],
      tagline: 'Romansa pastel Bali — sampul adegan hidup, bale & candi bentar, kelopak beterbangan',
      preview: 'bali-pastel?to=Tamu%20Undangan', order: 'checkout?tema=bali-pastel',
      cari: 'bali pastel ubud candi bentar bale tropis romantis motion animasi' },
    { slug: 'burgundy-palace', name: 'Burgundy Royal Palace', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Royal', 'Luxury'], warna: ['Burgundy', 'Gold'],
      tagline: 'Istana burgundy & emas — kemegahan royal untuk hari besar',
      preview: 'burgundy-palace', order: 'checkout?tema=burgundy-palace',
      cari: 'burgundy maroon royal istana palace mewah merak peacock cinematic sinematik' },
    { slug: 'palace-garden-gate', name: 'Palace Garden Gate', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Royal', 'Botanical'], warna: ['Sage', 'Gold'],
      tagline: 'Gerbang istana taman yang terbuka — jalan masuk menuju perayaan',
      preview: 'palace-garden-gate?to=Tamu%20Undangan', order: 'checkout?tema=palace-garden-gate',
      cari: 'istana gerbang gapura taman gate palace gerbang terbuka cinematic sinematik' },
    { slug: 'engraved-highland', name: 'Engraved Highland', format: 'cinematic', price: PRICING['cinematic'].premium, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Rustic', 'Botanical'], warna: ['Sage', 'Ivory'],
      tagline: 'Ilustrasi ukiran klasik — rumah & lanskap dataran tinggi dalam garis tinta',
      preview: 'engraved-highland', order: 'checkout?tema=engraved-highland',
      cari: 'ukiran engraving klasik vintage dataran tinggi tinta taman cinematic sinematik premium' },
    { slug: 'ivory-botanical', name: 'Ivory Botanical', format: 'simple-2d', price: PRICING['simple-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Botanical', 'Minimalist'], warna: ['Ivory', 'Sage'],
      tagline: 'Botani ivory yang tenang — daun & bunga krem di atas gading, ringan dan bersih',
      preview: 'ivory-botanical', order: 'checkout?tema=ivory-botanical',
      cari: 'ivory botanical botani daun krem gading garden tenang simple minimalis 2d' },
    { slug: 'emerald-luxe', name: 'Emerald Luxe 3D', format: '3d-interactive', price: PRICING['3d-interactive'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Luxury', 'Botanical'], warna: ['Emerald', 'Gold'],
      tagline: 'Istana taman emerald & emas hidup dengan Three.js — cincin emas 3D & partikel melayang',
      preview: 'emerald-luxe?to=Tamu%20Undangan', order: 'checkout?tema=emerald-luxe&paket=platinum',
      cari: 'emerald hijau emas 3d three.js interaktif cincin luxe interactive' },
    { slug: 'bioskop-mini', name: 'Bioskop Mini', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Luxury', 'Modern Editorial'], warna: ['Burgundy', 'Gold', 'Monochrome'],
      tagline: 'Premier film pribadi — poster sinematik, opening trailer, galeri filmstrip & RSVP tiket yang disobek',
      preview: 'bioskop-mini?to=Tamu%20Undangan', order: 'checkout?tema=bioskop-mini',
      cari: 'bioskop film cinema sinematik poster trailer tiket premier movie meyzsa fahrezzi' },
    { slug: 'piringan-hitam', name: 'Piringan Hitam', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Rustic'], warna: ['Ivory', 'Burgundy', 'Monochrome'],
      tagline: 'Album vinyl kisah cinta — tonearm turun, piringan berputar, isi berupa tracklist lagu',
      preview: 'piringan-hitam?to=Tamu%20Undangan', order: 'checkout?tema=piringan-hitam',
      cari: 'vinyl piringan hitam album retro musik turntable lagu record meyzsa fahrezzi' },
    { slug: 'perjalanan-kereta', name: 'Perjalanan Kereta', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial'], warna: ['Emerald', 'Gold'],
      tagline: 'Perjalanan KRL modern menyamping — geser antar-stasiun, kereta berjalan mengikuti ritme, tanpa scroll',
      preview: 'perjalanan-kereta?to=Tamu%20Undangan', order: 'checkout?tema=perjalanan-kereta&paket=platinum',
      cari: 'kereta krl modern stasiun tiket perjalanan geser horizontal train etiket meyzsa fahrezzi' },
    { slug: 'surat-hidup', name: 'Surat Hidup', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Floral', 'Botanical'], warna: ['Ivory', 'Sage', 'Blush'],
      tagline: 'Surat cinta yang hidup — segel lilin dipecahkan, taman kertas tumbuh mengikuti scroll',
      preview: 'surat-hidup?to=Tamu%20Undangan', order: 'checkout?tema=surat-hidup',
      cari: 'surat amplop segel lilin wax seal taman kertas tumbuh letter pos meyzsa fahrezzi' },
    { slug: 'paspor-cinta', name: 'Paspor Cinta', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Luxury', 'Modern Editorial'], warna: ['Burgundy', 'Navy', 'Gold'],
      tagline: 'Buku paspor dua hati — cap visa di tiap section, galeri cap kota & RSVP boarding pass',
      preview: 'paspor-cinta?to=Tamu%20Undangan', order: 'checkout?tema=paspor-cinta',
      cari: 'paspor passport visa boarding pass perjalanan travel cap stempel bandara meyzsa fahrezzi' },
    { slug: 'museum-cinta', name: 'Museum Cinta', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Royal', 'Luxury'], warna: ['Burgundy', 'Gold', 'Ivory'],
      tagline: 'Galeri seni cinta — lukisan pasangan yang hidup bernapas, ruang pamer per bab & RSVP buku tamu pameran',
      preview: 'museum-cinta?to=Tamu%20Undangan', order: 'checkout?tema=museum-cinta',
      cari: 'museum galeri seni lukisan pameran bingkai emas karya meyzsa fahrezzi cinematic sinematik' },
    { slug: 'koran-cinta', name: 'Koran Cinta', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial', 'Rustic'], warna: ['Ivory', 'Monochrome'],
      tagline: 'Edisi khusus "Harian Bahagia" — headline "AKHIRNYA MENIKAH!", kolom kisah, cuaca hari-H & RSVP kupon disobek',
      preview: 'koran-cinta?to=Tamu%20Undangan', order: 'checkout?tema=koran-cinta',
      cari: 'koran surat kabar newspaper headline berita vintage jurnalistik sepia meyzsa fahrezzi' },
    { slug: 'peta-ekspedisi', name: 'Peta Ekspedisi', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Rustic', 'Modern Editorial'], warna: ['Sage', 'Gold', 'Ivory'],
      tagline: 'Peta petualangan — rute kisah terlukis menganimasi, pin koordinat kenangan & countdown kompas berputar',
      preview: 'peta-ekspedisi?to=Tamu%20Undangan', order: 'checkout?tema=peta-ekspedisi&paket=platinum',
      cari: 'peta ekspedisi petualangan rute kompas koordinat pin penjelajah adventure map meyzsa fahrezzi interaktif' },
    { slug: 'ramuan-cinta', name: 'Ramuan Cinta', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Rustic', 'Botanical'], warna: ['Sage', 'Ivory', 'Emerald'],
      tagline: 'Apotek cinta vintage — Formula No. 12 "Dua Hati", label botol acara, countdown tabung reaksi & RSVP hasil uji COCOK',
      preview: 'ramuan-cinta?to=Tamu%20Undangan', order: 'checkout?tema=ramuan-cinta',
      cari: 'ramuan apotek apoteker formula botol lab vintage resep meyzsa fahrezzi' },
    { slug: 'radio-cinta', name: 'Radio Cinta', format: 'cinematic', price: PRICING['cinematic'].premium, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial', 'Luxury'], warna: ['Burgundy', 'Gold', 'Monochrome'],
      tagline: 'Radio yang disetel sendiri oleh tamu — geser kenop melewati desis ke 98.6 FM sampai ON AIR menyala & penyiar menyapa namamu',
      preview: 'radio-cinta?to=Tamu%20Undangan', order: 'checkout?tema=radio-cinta&paket=platinum',
      cari: 'radio fm tuning frekuensi on air penyiar studio siaran 98.6 meyzsa fahrezzi interaktif flagship' },
    { slug: 'observatorium', name: 'Observatorium', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial', 'Luxury'], warna: ['Navy', 'Gold', 'Monochrome'],
      tagline: 'Di bawah bintang yang sama — rasi M·F terlukis saat dibuka, countdown teleskop & galeri planet kenangan',
      preview: 'observatorium?to=Tamu%20Undangan', order: 'checkout?tema=observatorium',
      cari: 'observatorium bintang rasi teleskop astronom planet luar angkasa malam meyzsa fahrezzi cinematic' },
    { slug: 'kedai-kopi', name: 'Kedai Kopi', format: 'motion-2d', price: PRICING['motion-2d'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Rustic', 'Modern Editorial'], warna: ['Ivory', 'Gold'],
      tagline: 'Menu kafe artisan — racikan kisah berharga momen & tanggal, RSVP struk tercetak & kartu stempel loyalitas',
      preview: 'kedai-kopi?to=Tamu%20Undangan', order: 'checkout?tema=kedai-kopi',
      cari: 'kopi kafe cafe menu barista latte struk kasir racikan meyzsa fahrezzi' },
    { slug: 'papan-permainan', name: 'Papan Permainan', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial'], warna: ['Gold', 'Emerald', 'Burgundy'],
      tagline: 'Board game kisah cinta — lempar dadu sungguhan, bidak melompat petak demi petak membuka babak sampai finish AKAD',
      preview: 'papan-permainan?to=Tamu%20Undangan', order: 'checkout?tema=papan-permainan&paket=platinum',
      cari: 'papan permainan board game dadu bidak petak ular tangga monopoli meyzsa fahrezzi interaktif' },
    { slug: 'oceanarium', name: 'Oceanarium', format: 'cinematic', price: PRICING['cinematic'].base, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial', 'Botanical'], warna: ['Navy', 'Emerald', 'Gold'],
      tagline: 'Tiket oceanarium — menyelam dari permukaan 0 m sampai penutup bioluminesensi di 40 m, amplop pesan dalam botol',
      preview: 'oceanarium?to=Tamu%20Undangan', order: 'checkout?tema=oceanarium',
      cari: 'oceanarium akuarium aquarium laut menyelam kedalaman ikan botol pesan meyzsa fahrezzi cinematic' },
    { slug: 'pasar-malam', name: 'Pasar Malam', format: 'motion-2d', price: PRICING['motion-2d'].advanced, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Luxury', 'Modern Editorial'], warna: ['Burgundy', 'Gold'],
      tagline: 'Festival malam burgundy-emas — gerbang marquee menyala huruf demi huruf & bianglala galeri yang bisa digeser',
      preview: 'pasar-malam?to=Tamu%20Undangan', order: 'checkout?tema=pasar-malam&paket=platinum',
      cari: 'pasar malam festival karnaval bianglala ferris wheel marquee lampu komidi putar meyzsa fahrezzi interaktif' },
    { slug: 'video', name: 'Video Undangan', format: 'cinematic', price: PRICING['cinematic'].premium, acara: 'pernikahan',
      budaya: ['Modern'], style: ['Modern Editorial', 'Luxury'], warna: ['Gold', 'Monochrome'],
      tagline: 'Undangan sinematik berupa file MP4 portrait 9:16 — dibagikan lewat WhatsApp, bukan tautan web',
      preview: null, order: 'checkout?paket=platinum',
      cari: 'video mp4 sinematik whatsapp portrait film cinematic premium' }
  ];

  /* ---------- State + persistensi ---------- */
  var KEY = 'uy-katalog-state-v2';
  var FIELDS = ['format', 'acara', 'budaya', 'style', 'warna', 'harga', 'q'];
  var state = { format: '', acara: 'semua', budaya: '', style: '', warna: '', harga: '', q: '' };

  function fromURL() {
    try {
      var p = new URLSearchParams(window.location.search);
      FIELDS.forEach(function (k) { if (p.get(k)) state[k] = p.get(k); });
    } catch (e) { /* abaikan */ }
  }
  function fromStorage() {
    try {
      var raw = window.sessionStorage.getItem(KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      FIELDS.forEach(function (k) { if (typeof s[k] === 'string') state[k] = s[k]; });
    } catch (e) { /* abaikan */ }
  }
  function save() {
    try { window.sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ }
    try {
      var p = new URLSearchParams();
      FIELDS.forEach(function (k) { if (state[k] && state[k] !== 'semua') p.set(k, state[k]); });
      var qs = p.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
    } catch (e) { /* abaikan */ }
  }
  fromStorage();
  fromURL();

  /* ---------- Bangun kontrol ---------- */
  var chipsEl = $('#catChips'), panel = $('#filterPanel'), grid = $('#grid'),
      countEl = $('#count'), emptyEl = $('#empty'), emptyText = $('#emptyText'),
      searchEl = $('#q'), badge = $('#filterBadge'), filterOpen = $('#filterOpen'),
      collectionsEl = $('#collections'), activeEl = $('#activeFilters');

  function rupiah(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function formatMin(id) {
    var m = null;
    CATALOG.forEach(function (e) { if (e.format === id && (m === null || e.price < m)) m = e.price; });
    return m;
  }
  function formatCount(id) { return CATALOG.filter(function (e) { return e.format === id; }).length; }

  collectionsEl.innerHTML = FORMATS.map(function (f) {
    return '<button type="button" class="ccard" data-format="' + f.id + '" aria-pressed="false">' +
      '<span class="ccard-art"><img src="assets/katalog/' + f.thumb + '.webp" alt="" width="640" height="800" loading="lazy"></span>' +
      '<span class="ccard-body"><span class="ccard-name">' + f.label + '</span>' +
      '<span class="ccard-tag">' + f.tagline + '</span>' +
      '<span class="ccard-foot"><b>Mulai ' + rupiah(formatMin(f.id)) + '</b><i>' + formatCount(f.id) + ' desain</i></span></span></button>';
  }).join('');

  chipsEl.innerHTML = ACARA.map(function (a) {
    return '<button type="button" class="chip" data-acara="' + a.id + '" aria-pressed="false">' + a.label + '</button>';
  }).join('');

  function optionsFor(key) {
    var seen = {}, out = [];
    CATALOG.forEach(function (e) {
      e[key].forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
    });
    out.sort();
    return out.map(function (v) { return '<option value="' + v + '">' + v + '</option>'; }).join('');
  }
  panel.innerHTML =
    '<div class="f-group"><label for="fBudaya">Tema Budaya</label><select id="fBudaya"><option value="">Semua budaya</option>' +
      optionsFor('budaya') + '</select></div>' +
    '<div class="f-group"><label for="fStyle">Gaya Visual</label><select id="fStyle"><option value="">Semua gaya</option>' +
      optionsFor('style') + '</select></div>' +
    '<div class="f-group"><label for="fWarna">Warna Dominan</label><select id="fWarna"><option value="">Semua warna</option>' +
      optionsFor('warna') + '</select></div>' +
    '<div class="f-group"><label for="fHarga">Harga</label><select id="fHarga">' +
      '<option value="">Semua harga</option>' +
      Object.keys(HARGA_BAND).map(function (k) { return '<option value="' + k + '">' + HARGA_BAND[k].label + '</option>'; }).join('') +
      '</select></div>' +
    '<div class="f-actions"><button type="button" class="btn btn-gold" id="applyBtn">Terapkan</button>' +
    '<button type="button" class="btn btn-line" id="clearBtn">Atur Ulang</button></div>';

  var sel = { budaya: $('#fBudaya'), style: $('#fStyle'), warna: $('#fWarna'), harga: $('#fHarga') };

  /* ---------- Render kartu ---------- */
  function cardHTML(e) {
    var tags = e.budaya.map(function (b) { return '<span>' + b + '</span>'; }).join('') +
      e.style.map(function (s) { return '<span>' + s + '</span>'; }).join('');
    var dots = e.warna.map(function (w) { return '<i style="background:' + (DOT[w] || '#ccc') + '" title="' + w + '"></i>'; }).join('');
    var actions = e.preview
      ? '<a class="btn btn-line" href="' + e.preview + '">Lihat Preview</a>' +
        '<a class="btn btn-gold" href="' + e.order + '">Gunakan Template</a>'
      : '<span class="k-note">Deliverable file MP4 — tidak ada preview web.</span>' +
        '<a class="btn btn-gold" href="' + e.order + '">Gunakan Template</a>';
    return '<article class="kcard" data-slug="' + e.slug + '">' +
      '<span class="kcard-art"><img src="assets/katalog/' + e.slug + '.webp" alt="Cuplikan desain ' + e.name + '" width="640" height="800" loading="lazy">' +
      '<span class="kcard-acara">' + FORMAT_LABEL[e.format] + '</span></span>' +
      '<div class="kcard-body">' +
        '<h2 class="kcard-name">' + e.name + '</h2>' +
        '<p class="kcard-meta">' + ACARA_LABEL[e.acara] + ' · ' + FORMAT_LABEL[e.format] + '</p>' +
        '<p class="kcard-tag">' + e.tagline + '</p>' +
        '<div class="k-tags">' + tags + '<span class="k-dots" aria-label="Warna dominan: ' + e.warna.join(', ') + '">' + dots + '</span></div>' +
        '<p class="k-price"><b>' + rupiah(e.price) + '</b> · ' + FORMAT_LABEL[e.format] + '</p>' +
        '<div class="k-actions">' + actions + '</div>' +
      '</div></article>';
  }

  function matches(e) {
    if (state.format && e.format !== state.format) return false;
    if (state.acara !== 'semua' && e.acara !== state.acara) return false;
    if (state.budaya && e.budaya.indexOf(state.budaya) === -1) return false;
    if (state.style && e.style.indexOf(state.style) === -1) return false;
    if (state.warna && e.warna.indexOf(state.warna) === -1) return false;
    if (state.harga && HARGA_BAND[state.harga] && !HARGA_BAND[state.harga].test(e.price)) return false;
    if (state.q) {
      var hay = (e.name + ' ' + e.tagline + ' ' + e.cari + ' ' + e.budaya.join(' ') + ' ' +
        e.style.join(' ') + ' ' + e.warna.join(' ') + ' ' + FORMAT_LABEL[e.format] + ' ' +
        ACARA_LABEL[e.acara]).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function activeList() {
    var out = [];
    if (state.format) out.push({ k: 'format', label: FORMAT_LABEL[state.format] });
    if (state.acara !== 'semua') out.push({ k: 'acara', label: ACARA_LABEL[state.acara] });
    if (state.budaya) out.push({ k: 'budaya', label: state.budaya });
    if (state.style) out.push({ k: 'style', label: state.style });
    if (state.warna) out.push({ k: 'warna', label: state.warna });
    if (state.harga && HARGA_BAND[state.harga]) out.push({ k: 'harga', label: HARGA_BAND[state.harga].label });
    if (state.q) out.push({ k: 'q', label: '“' + state.q + '”' });
    return out;
  }

  function syncControls() {
    $$('.ccard', collectionsEl).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.format === state.format));
    });
    $$('button[data-acara]', chipsEl).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.acara === state.acara));
    });
    Object.keys(sel).forEach(function (k) { if (sel[k]) sel[k].value = state[k] || ''; });
    if (searchEl) searchEl.value = state.q || '';
    var n = activeList().length;
    badge.hidden = n === 0;
    badge.textContent = String(n);
    var act = activeList();
    activeEl.hidden = act.length === 0;
    activeEl.innerHTML = act.map(function (a) {
      return '<button type="button" class="af-chip" data-clear="' + a.k + '">' + a.label + ' <span aria-hidden="true">×</span></button>';
    }).join('') + (act.length ? '<button type="button" class="af-clear" id="afClear">Hapus semua</button>' : '');
    var clr = $('#afClear');
    if (clr) clr.addEventListener('click', resetAll);
  }

  function render() {
    var list = CATALOG.filter(matches);
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.textContent = 'Menampilkan ' + list.length + ' dari ' + CATALOG.length + ' desain';
    emptyEl.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    if (list.length === 0 && state.acara !== 'semua' && state.acara !== 'pernikahan') {
      emptyText.textContent = 'Koleksi UndangYA! saat ini berisi desain pernikahan. Desain ' +
        ACARA_LABEL[state.acara] + ' belum tersedia — coba kategori Pernikahan atau Semua.';
    } else {
      emptyText.textContent = 'Coba longgarkan filter atau kata kuncimu.';
    }
    syncControls();
    save();
  }

  /* ---------- Peristiwa ---------- */
  collectionsEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-format]');
    if (!b) return;
    state.format = state.format === b.dataset.format ? '' : b.dataset.format;
    render();
  });
  chipsEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-acara]');
    if (!b) return;
    state.acara = b.dataset.acara;
    render();
  });
  Object.keys(sel).forEach(function (k) {
    sel[k].addEventListener('change', function () { state[k] = sel[k].value; render(); });
  });
  if (searchEl) searchEl.addEventListener('input', function () {
    state.q = searchEl.value.trim().toLowerCase();
    render();
  });
  activeEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-clear]');
    if (!b) return;
    var k = b.dataset.clear;
    state[k] = k === 'acara' ? 'semua' : '';
    render();
  });
  filterOpen.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    filterOpen.setAttribute('aria-expanded', String(open));
  });
  $('#applyBtn').addEventListener('click', function () {
    panel.classList.remove('open');
    filterOpen.setAttribute('aria-expanded', 'false');
  });
  function resetAll() {
    state = { format: '', acara: 'semua', budaya: '', style: '', warna: '', harga: '', q: '' };
    render();
  }
  $('#clearBtn').addEventListener('click', resetAll);
  $('#resetBtn').addEventListener('click', resetAll);

  render();
})();
