/* ============================================================
   UNDANGYA! — katalog.js (Katalog Baru: kartu 3 HP per template)
   Data CATALOG: 78 entri kanonis dari themes.json
   (slug, name, kelas, price, tagline, acara, grup, chips).
   Urutan data: entri grup 'lama' dulu sesuai urutan sumber,
   lalu sisanya sesuai urutan sumber. Urutan TAMPIL diatur
   filter + sort (default Termurah → Termahal).
   State filter tersimpan di sessionStorage.
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

  /* ---------- Data katalog kanonis (78 entri) ---------- */
  var CATALOG = [
 {
  "slug": "taman-rahasia",
  "name": "Taman Rahasia",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Taman interaktif — kelopak mengikuti sentuhan, kupu-kupu beterbangan, ucapan mekar jadi bunga",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "javanese-illustrated",
  "name": "Javanese Illustrated",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Undangan ilustrasi Jawa berlapis — animasi pembuka, batik kawung-parang, foto prewedding asli",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "masjid-bunga",
  "name": "Masjid Bunga",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Masjid cat air di tengah taman bunga — lengkung emas & intro sinematik berlapis",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "pink-garden-fountain",
  "name": "Pink Garden Fountain",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Taman merah muda & air mancur yang semburannya membentuk gaun pengantin",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "bali-pastel",
  "name": "Bali Pastel Romance",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Romansa pastel Bali — sampul adegan hidup, bale & candi bentar, kelopak beterbangan",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "burgundy-palace",
  "name": "Burgundy Royal Palace",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Istana burgundy & emas — kemegahan royal untuk hari besar",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "palace-garden-gate",
  "name": "Palace Garden Gate",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Gerbang istana taman yang terbuka — jalan masuk menuju perayaan",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "engraved-highland",
  "name": "Engraved Highland",
  "price": 199000,
  "kelas": "SIGNATURE",
  "tagline": "Ilustrasi ukiran klasik — rumah & lanskap dataran tinggi dalam garis tinta",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "ivory-botanical",
  "name": "Ivory Botanical",
  "price": 49000,
  "kelas": "ESSENTIAL",
  "tagline": "Botani ivory yang tenang — daun & bunga krem di atas gading, ringan dan bersih",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "emerald-luxe",
  "name": "Emerald Luxe 3D",
  "price": 299000,
  "kelas": "SIGNATURE",
  "tagline": "Istana taman emerald & emas hidup dengan Three.js — cincin emas 3D & partikel melayang",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "bioskop-mini",
  "name": "Bioskop Mini",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Premier film pribadi — poster sinematik, opening trailer, galeri filmstrip & RSVP tiket yang disobek",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "piringan-hitam",
  "name": "Piringan Hitam",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Album vinyl kisah cinta — tonearm turun, piringan berputar, isi berupa tracklist lagu",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "perjalanan-kereta",
  "name": "Perjalanan Kereta",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Perjalanan KRL modern menyamping — geser antar-stasiun, kereta berjalan mengikuti ritme, tanpa scroll",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "surat-hidup",
  "name": "Surat Hidup",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Surat cinta yang hidup — segel lilin dipecahkan, taman kertas tumbuh mengikuti scroll",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "paspor-cinta",
  "name": "Paspor Cinta",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Buku paspor dua hati — cap visa di tiap section, galeri cap kota & RSVP boarding pass",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "museum-cinta",
  "name": "Museum Cinta",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Galeri seni cinta — lukisan pasangan yang hidup bernapas, ruang pamer per bab & RSVP buku tamu pameran",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "koran-cinta",
  "name": "Koran Cinta",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Edisi khusus \"Harian Bahagia\" — headline \"AKHIRNYA MENIKAH!\", kolom kisah, cuaca hari-H & RSVP kupon disobek",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "peta-ekspedisi",
  "name": "Peta Ekspedisi",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Peta petualangan — rute kisah terlukis menganimasi, pin koordinat kenangan & countdown kompas berputar",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "ramuan-cinta",
  "name": "Ramuan Cinta",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Apotek cinta vintage — Formula No. 12 \"Dua Hati\", label botol acara, countdown tabung reaksi & RSVP hasil uji COCOK",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "radio-cinta",
  "name": "Radio Cinta",
  "price": 199000,
  "kelas": "SIGNATURE",
  "tagline": "Radio yang disetel sendiri oleh tamu — geser kenop melewati desis ke 98.6 FM sampai ON AIR menyala & penyiar menyapa namamu",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "observatorium",
  "name": "Observatorium",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Di bawah bintang yang sama — rasi M·F terlukis saat dibuka, countdown teleskop & galeri planet kenangan",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "kedai-kopi",
  "name": "Kedai Kopi",
  "price": 79000,
  "kelas": "ESSENTIAL",
  "tagline": "Menu kafe artisan — racikan kisah berharga momen & tanggal, RSVP struk tercetak & kartu stempel loyalitas",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "papan-permainan",
  "name": "Papan Permainan",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Board game kisah cinta — lempar dadu sungguhan, bidak melompat petak demi petak membuka babak sampai finish AKAD",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "oceanarium",
  "name": "Oceanarium",
  "price": 155000,
  "kelas": "SIGNATURE",
  "tagline": "Tiket oceanarium — menyelam dari permukaan 0 m sampai penutup bioluminesensi di 40 m, amplop pesan dalam botol",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "pasar-malam",
  "name": "Pasar Malam",
  "price": 99000,
  "kelas": "ESSENTIAL",
  "tagline": "Festival malam burgundy-emas — gerbang marquee menyala huruf demi huruf & bianglala galeri yang bisa digeser",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "video",
  "name": "Video Undangan",
  "price": 199000,
  "kelas": "SIGNATURE",
  "tagline": "Undangan sinematik berupa file MP4 portrait 9:16 — dibagikan lewat WhatsApp, bukan tautan web",
  "acara": "pernikahan",
  "grup": "lama",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "kastil-dongeng",
  "name": "Kastil Dongeng",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Kastil dongeng cat air tujuh menara — adegan hidup berlapis, bunga menari tertiup angin",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "joglo-pusaka",
  "name": "Joglo Pusaka",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Joglo Jawa megah — scene hidup pusaka dengan gerak sepoi-sepoi",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "pusaka-sogan",
  "name": "Pusaka Sogan",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Jawa sogan gelap — joglo jati berlampu damar, gebyok, batik parang & gunungan wayang",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "flora-raya",
  "name": "Flora Raya",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Taman flora raya super padat — hamparan bunga hidup di setiap section",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "maple-gugur",
  "name": "Maple Gugur",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Musim gugur maple — daun berguguran melayang di atas taman senja",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "negeri-awan",
  "name": "Negeri Awan",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Negeri di atas awan — istana melayang dan awan bergerak perlahan",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "anime-senja",
  "name": "Anime Senja",
  "kelas": "SIGNATURE",
  "price": 149000,
  "tagline": "Senja bergaya anime — langit gradasi dramatis dan siluet pasangan",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Musik"
  ]
 },
 {
  "slug": "pinus-rimba",
  "name": "Pinus Rimba",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Hutan pinus pegunungan — kabut tipis dan cahaya sela kanopi",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "samudra-bajak",
  "name": "Samudra Bajak",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Petualangan bajak laut — kapal, peta harta, dan ombak samudra",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "sakura-hana",
  "name": "Sakura Hana",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Sakura bermekaran — kelopak pink melayang di taman Jepang",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "balon-fajar",
  "name": "Balon Fajar",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Balon udara saat fajar — langit keemasan dan lembah berkabut",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "lentera-ajaib",
  "name": "Lentera Ajaib",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Lentera terbang ajaib — malam berbintang penuh cahaya hangat",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "onyx-luxury",
  "name": "Onyx Luxury",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Kemewahan onyx hitam & emas — elegan, gelap, berkelas",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "monokrom-noir",
  "name": "Monokrom Noir",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Noir hitam-putih sinematik — kontras tegas bergaya film klasik",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "rimba-jungle",
  "name": "Rimba Jungle",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Rimba tropis lebat — dedaunan besar dan cahaya hutan hujan",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "galaksi-jauh",
  "name": "Galaksi Jauh",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Galaksi jauh — nebula, planet, dan bintang jatuh",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "paris-romansa",
  "name": "Paris Romansa",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Romansa Paris — menara Eiffel, kafe, dan senja keemasan",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "gadang-pusako",
  "name": "Gadang Pusako",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Rumah Gadang Minangkabau — gonjong megah & ukiran pusako",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "tongkonan-pusaka",
  "name": "Tongkonan Pusaka",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Tongkonan Toraja — rumah adat beratap perahu & ukiran pusaka",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "kebun-teh",
  "name": "Kebun Teh Pegunungan",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Kebun teh pegunungan — hamparan hijau berundak sejuk berkabut",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "mercusuar-cinta",
  "name": "Mercusuar Cinta",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Mercusuar di tepi laut — cahaya penuntun di senja pantai",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "oasis-malam",
  "name": "Oasis Malam",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Oasis di malam gurun — bulan purnama, palem, dan bintang",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "kerajaan-laut",
  "name": "Kerajaan Laut",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Kerajaan bawah laut — istana karang, gelembung, dan cahaya biru",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "peri-lembah",
  "name": "Peri Lembah",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Lembah peri — jamur bercahaya, kunang-kunang, dan bunga ajaib",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "pustaka-cinta",
  "name": "Pustaka Cinta",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Perpustakaan klasik — rak buku menjulang & cahaya lampu hangat",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "istana-joseon",
  "name": "Istana Joseon",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Istana Joseon Korea — hanbok, gerbang istana, dan bunga persik",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "premiere-glam",
  "name": "Premiere Glam",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Premiere glam Hollywood — karpet merah, lampu sorot, dan kilau emas",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "istana-salju",
  "name": "Istana Salju",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Istana salju — kristal es, aurora, dan putih berkilau",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "misi-rahasia",
  "name": "Misi Rahasia",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Misi rahasia agen — berkas rahasia, kode sandi, dan target: menikah",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "pahlawan-kota",
  "name": "Pahlawan Kota",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Pahlawan kota — skyline malam, lampu kota, dan aksi heroik",
  "acara": "pernikahan",
  "grup": "bespoke",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "kertas-tinta",
  "name": "Kertas & Tinta",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Kertas & tinta — bersih tonal, foto sebagai bintang utama",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "terakota-senja",
  "name": "Terakota Senja",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Terakota senja — hangat tanah liat dan cahaya sore",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "linen-sage",
  "name": "Linen & Sage",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Linen & sage — lembut natural bernapas tenang",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "pesisir-putih",
  "name": "Pesisir Putih",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Pesisir putih — terang pantai dan semilir laut",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "ladang-lavender",
  "name": "Ladang Lavender",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Ladang lavender — ungu lembut sejauh mata memandang",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "blush-krem",
  "name": "Blush & Krem",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Blush & krem — manis pucat dengan sentuhan romantis",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "washi-indigo",
  "name": "Washi Indigo",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Washi indigo — kertas Jepang biru nila bertekstur",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "garis-emas",
  "name": "Garis Emas",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Garis emas — minimalis mewah beraksen garis emas",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "senja-pastel",
  "name": "Senja Pastel",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Senja pastel — gradasi lembut jingga ke ungu muda",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "anyaman-rotan",
  "name": "Anyaman Rotan",
  "kelas": "ESSENTIAL",
  "price": 49000,
  "tagline": "Anyaman rotan — tekstur alami hangat bernuansa tropis",
  "acara": "pernikahan",
  "grup": "menengah",
  "chips": [
   "Galeri Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Love Story",
   "Maps"
  ]
 },
 {
  "slug": "gading-klasik",
  "name": "Gading Klasik",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Slide klasik simetris — foto oval, nuansa gading elegan",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "anggur-maroon",
  "name": "Anggur Maroon",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Slide foto penuh + panel maroon — warna berganti tiap layar",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "lumut-lembut",
  "name": "Lumut Lembut",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Slide split foto atas & konten bawah — hijau lumut lembut",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "langit-powder",
  "name": "Langit Powder",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Kartu melayang di atas foto penuh — biru langit powder",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "peach-susu",
  "name": "Peach Susu",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Bingkai lengkung raksasa konsisten — peach susu manis",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "abu-mutiara",
  "name": "Abu Mutiara",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Editorial zig-zag kiri-kanan — abu mutiara modern",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "kopi-susu",
  "name": "Kopi Susu",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Tipografi raksasa + strip polaroid — kopi susu hangat",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "ungu-taro",
  "name": "Ungu Taro",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Komposisi melingkar — foto bulat besar ungu taro",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "kuning-mentega",
  "name": "Kuning Mentega",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Slide majalah — judul raksasa, foto kecil rapi, lega",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "putih-hitam-minim",
  "name": "Putih Hitam Minim",
  "kelas": "BASIC",
  "price": 49000,
  "tagline": "Tipografi murni hitam-putih — satu foto B/W per slide",
  "acara": "pernikahan",
  "grup": "murah",
  "chips": [
   "Galeri 6 Foto",
   "RSVP",
   "Countdown",
   "Amplop Digital",
   "Maps",
   "Musik"
  ]
 },
 {
  "slug": "tinta-navy",
  "name": "Tinta Navy",
  "kelas": "FREE",
  "price": 0,
  "tagline": "Dua warna navy & putih kertas — klasik garis tipis, maks 2 foto",
  "acara": "pernikahan",
  "grup": "gratis",
  "chips": [
   "Countdown",
   "Maps",
   "Amplop Digital",
   "Musik"
  ]
 },
 {
  "slug": "daun-krem",
  "name": "Daun Krem",
  "kelas": "FREE",
  "price": 0,
  "tagline": "Dua warna hijau botol & krem — aksen daun gambar tangan, maks 2 foto",
  "acara": "pernikahan",
  "grup": "gratis",
  "chips": [
   "Countdown",
   "Maps",
   "Amplop Digital",
   "Musik"
  ]
 }
];

  /* ---------- Label & ikon chip ---------- */
  var ACARA_LABEL = { pernikahan: 'Pernikahan' };
  var KELAS_LIST = ['FREE', 'BASIC', 'ESSENTIAL', 'SIGNATURE'];
  var CHIP_ICON = {
    'Galeri Foto': 'ic-camera', 'Galeri 6 Foto': 'ic-camera',
    'RSVP': 'ic-check', 'Countdown': 'ic-clock',
    'Amplop Digital': 'ic-gift', 'Love Story': 'ic-heart',
    'Musik': 'ic-music', 'Maps': 'ic-pin'
  };
  var CHIP_POS = ['pos-tl', 'pos-tr', 'pos-ml', 'pos-mr', 'pos-bl', 'pos-br'];

  /* Filter acara dibangun DARI DATA: hanya kategori yang
     benar-benar memiliki template yang ditampilkan. */
  var ACARA = [{ id: 'semua', label: 'Semua' }];
  Object.keys(ACARA_LABEL).forEach(function (id) {
    if (CATALOG.some(function (e) { return e.acara === id; })) {
      ACARA.push({ id: id, label: ACARA_LABEL[id] });
    }
  });

  /* ---------- State + persistensi (sessionStorage) ---------- */
  var KEY = 'uy-katalog-state-v3';
  var SORT_IDS = ['murah', 'mahal', 'nama'];
  var DEFAULTS = { kelas: 'semua', acara: 'semua', q: '', sort: 'murah' };
  var state = { kelas: 'semua', acara: 'semua', q: '', sort: 'murah' };
  function fromStorage() {
    try {
      var raw = window.sessionStorage.getItem(KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      ['kelas', 'acara', 'q', 'sort'].forEach(function (k) {
        if (typeof s[k] === 'string') state[k] = s[k];
      });
    } catch (e) { /* abaikan */ }
  }
  function save() {
    try { window.sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ }
  }
  fromStorage();
  if (state.kelas !== 'semua' && KELAS_LIST.indexOf(state.kelas) === -1) state.kelas = 'semua';
  if (!ACARA.some(function (a) { return a.id === state.acara; })) state.acara = 'semua';
  if (SORT_IDS.indexOf(state.sort) === -1) state.sort = 'murah';

  /* ---------- Elemen ---------- */
  var kelasEl = $('#kelasChips'), chipsEl = $('#catChips'), grid = $('#grid'),
      countEl = $('#count'), emptyEl = $('#empty'),
      searchEl = $('#q'), sortEl = $('#sortBy'),
      overlay = $('#pvOverlay'), pvFrame = $('#pvFrame'),
      pvName = $('#pvName'), pvMeta = $('#pvMeta'),
      pvTagline = $('#pvTagline'), pvOrder = $('#pvOrder');

  kelasEl.innerHTML = [{ id: 'semua', label: 'Semua' }].concat(KELAS_LIST.map(function (k) {
    return { id: k, label: k };
  })).map(function (k) {
    return '<button type="button" class="chip-filter" data-kelas="' + k.id + '" aria-pressed="false">' + k.label + '</button>';
  }).join('');
  chipsEl.innerHTML = ACARA.map(function (a) {
    return '<button type="button" class="chip-filter acara" data-acara="' + a.id + '" aria-pressed="false">' + a.label + '</button>';
  }).join('');

  /* ---------- Util ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function rupiah(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  /* Harga: gratis → "Gratis"; grup lama → format penuh;
     grup baru (bespoke/menengah/murah) → "Mulai" kecil + harga. */
  function priceHTML(e) {
    if (e.price === 0) return '<span class="price">Gratis</span>';
    if (e.grup === 'lama') return '<span class="price">' + rupiah(e.price) + '</span>';
    return '<span class="price"><small>Mulai</small>' + rupiah(e.price) + '</span>';
  }
  function badgeHTML(e) {
    return '<span class="badge ' + e.kelas.toLowerCase() + '">' + esc(e.kelas) + '</span>';
  }
  function icon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>'; }
  function phoneOpen(cls) {
    return '<div class="phone ' + cls + '"><span class="notch"></span><span class="hw" aria-hidden="true"></span>';
  }

  /* ---------- Render kartu ----------
     Komposisi 3 HP realistis: tengah = sampul (thumbnail menutupi
     layar), kiri = Rangkaian Acara (thumbnail crop berbeda + panel
     teks mini), kanan = kisi galeri 4 petak (thumbnail yang sama,
     object-position berbeda-beda). Chip fitur melayang maks 6. */
  function stageHTML(e) {
    var thumb = 'assets/katalog/' + e.slug + '.webp';
    var alt = 'Cuplikan desain ' + esc(e.name);
    var chips = e.chips.slice(0, 6).map(function (c, i) {
      var ic = CHIP_ICON[c] || 'ic-heart';
      return '<span class="fchip ' + CHIP_POS[i % CHIP_POS.length] + '" style="--dl:' + (i * 0.35).toFixed(2) + 's">' +
        '<span class="ic">' + icon(ic) + '</span><span class="tx">' + esc(c) + '</span></span>';
    }).join('');
    return '<div class="stage">' +
      '<svg class="flora bl" aria-hidden="true"><use href="#flora"></use></svg>' +
      '<svg class="flora tr" aria-hidden="true"><use href="#flora"></use></svg>' +
      phoneOpen('ph-left') +
        '<div class="scr sched">' +
          '<div class="sched-img"><img src="' + thumb + '" alt="" loading="lazy"></div>' +
          '<div class="sched-body"><h4>Rangkaian Acara</h4>' +
            '<div class="ev"><h5>Akad Nikah</h5><p><b>08.00 – 10.00 WIB</b></p></div>' +
            '<div class="ev"><h5>Resepsi</h5><p><b>11.00 – 13.00 WIB</b></p></div>' +
            '<span class="loc-btn">' + icon('ic-pin') + 'Lihat Lokasi</span>' +
          '</div>' +
        '</div></div>' +
      phoneOpen('ph-mid') +
        '<div class="scr"><img class="cover-img" src="' + thumb + '" alt="' + alt + '" loading="lazy"></div></div>' +
      phoneOpen('ph-right') +
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

  function cardHTML(e, idx) {
    if (e.slug === 'video') {
      /* Varian video (non-HTML): satu petak poster lebar, tanpa
         tombol preview iframe; order mengikuti pola lama. */
      return '<article class="kcard kcard-video" data-slug="video" data-kelas="' + esc(e.kelas) + '">' +
        '<span class="num">' + pad2(idx + 1) + '</span>' +
        '<div class="video-poster"><img src="assets/katalog/video.webp" alt="Cuplikan Video Undangan" loading="lazy">' +
          '<span class="video-play">' + icon('ic-play') + '</span>' +
          '<span class="video-label">' + icon('ic-play') + 'Video MP4 9:16</span></div>' +
        '<div class="card-foot">' +
          '<h2>' + esc(e.name) + '</h2>' +
          '<p class="k-tagline">' + esc(e.tagline) + '</p>' +
          '<div class="meta">' + badgeHTML(e) + priceHTML(e) + '</div>' +
          '<div class="card-btns">' +
            '<a class="btn btn-gold" href="checkout?paket=luxury">Gunakan Template</a>' +
          '</div>' +
        '</div></article>';
    }
    return '<article class="kcard" data-slug="' + esc(e.slug) + '" data-kelas="' + esc(e.kelas) + '">' +
      '<span class="num">' + pad2(idx + 1) + '</span>' +
      stageHTML(e) +
      '<div class="card-foot">' +
        '<h2>' + esc(e.name) + '</h2>' +
        '<p class="k-tagline">' + esc(e.tagline) + '</p>' +
        '<div class="meta">' + badgeHTML(e) + priceHTML(e) + '</div>' +
        '<div class="card-btns">' +
          '<button type="button" class="btn btn-line" data-preview="' + esc(e.slug) + '">Lihat Preview</button>' +
          '<a class="btn btn-gold" href="checkout?tema=' + esc(e.slug) + '">Gunakan Template</a>' +
        '</div>' +
      '</div></article>';
  }

  function matches(e) {
    if (state.kelas !== 'semua' && e.kelas !== state.kelas) return false;
    if (state.acara !== 'semua' && e.acara !== state.acara) return false;
    if (state.q) {
      var hay = (e.name + ' ' + e.tagline + ' ' + e.kelas + ' ' +
        (ACARA_LABEL[e.acara] || e.acara) + ' ' + e.chips.join(' ')).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function byName(a, b) { return a.name.localeCompare(b.name, 'id'); }
  function applySort(list) {
    var arr = list.slice();
    if (state.sort === 'mahal') {
      arr.sort(function (a, b) { return (b.price - a.price) || byName(a, b); });
    } else if (state.sort === 'nama') {
      arr.sort(byName);
    } else {
      arr.sort(function (a, b) { return (a.price - b.price) || byName(a, b); });
    }
    return arr;
  }

  function syncControls() {
    $$('button[data-kelas]', kelasEl).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.kelas === state.kelas));
    });
    $$('button[data-acara]', chipsEl).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.acara === state.acara));
    });
    if (searchEl) searchEl.value = state.q || '';
    if (sortEl) sortEl.value = state.sort;
  }

  function render() {
    var list = applySort(CATALOG.filter(matches));
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.textContent = 'Menampilkan ' + list.length + ' dari ' + CATALOG.length + ' template';
    emptyEl.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    syncControls();
    save();
  }

  /* ---------- Overlay preview: satu HP besar berisi iframe ---------- */
  var lastFocus = null;
  function openPreview(slug) {
    var e = null;
    CATALOG.forEach(function (x) { if (x.slug === slug) e = x; });
    if (!e || e.slug === 'video') return;
    lastFocus = document.activeElement;
    pvName.textContent = e.name;
    pvMeta.innerHTML = badgeHTML(e) + priceHTML(e);
    pvTagline.textContent = e.tagline;
    pvOrder.setAttribute('href', 'checkout?tema=' + e.slug);
    pvFrame.setAttribute('src', e.slug + '?to=Tamu%20Undangan');
    overlay.hidden = false;
    document.body.classList.add('pv-lock');
    var x = $('.pv-x', overlay);
    if (x) x.focus();
  }
  function closePreview() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    pvFrame.setAttribute('src', 'about:blank');
    document.body.classList.remove('pv-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  grid.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-preview]');
    if (!b) return;
    openPreview(b.getAttribute('data-preview'));
  });
  $$('[data-close]', overlay).forEach(function (el) {
    el.addEventListener('click', closePreview);
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closePreview();
  });

  /* ---------- Peristiwa filter & sort ---------- */
  kelasEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-kelas]');
    if (!b) return;
    state.kelas = b.dataset.kelas;
    render();
  });
  chipsEl.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-acara]');
    if (!b) return;
    state.acara = b.dataset.acara;
    render();
  });
  if (searchEl) searchEl.addEventListener('input', function () {
    state.q = searchEl.value.trim().toLowerCase();
    render();
  });
  if (sortEl) sortEl.addEventListener('change', function () {
    state.sort = SORT_IDS.indexOf(sortEl.value) !== -1 ? sortEl.value : 'murah';
    render();
  });
  function resetAll() {
    state = { kelas: DEFAULTS.kelas, acara: DEFAULTS.acara, q: DEFAULTS.q, sort: DEFAULTS.sort };
    render();
  }
  $('#resetBtn').addEventListener('click', resetAll);
  $('#emptyReset').addEventListener('click', resetAll);

  render();
})();
