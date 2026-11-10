/* Harga resmi di server — JANGAN percaya harga dari browser.
   Halaman checkout menampilkan angka yang sama untuk UI saja;
   api/create-transaction.js selalu menghitung ulang dari file ini.

   Paket DISAMAKAN dengan paket dashboard (app.html) atas keputusan user
   2026-11-10: Basic Rp50rb · Premium Rp110rb · Eksklusif Rp180rb ·
   Luxury Rp280rb (kuota foto/tamu/masa aktif mengikuti dashboard).
   Paket lama Silver/Gold/Platinum sudah tidak dijual; id lamanya
   dipetakan diam-diam ke padanan baru (LEGACY_PACKAGE_ALIASES) agar
   tautan order lama yang terlanjur dibagikan tidak rusak. */
const PACKAGES = {
  basic: {
    id: "basic",
    name: "Paket BASIC — Undangan Digital UndangYa!",
    price: 50000,
    features: ["Pilihan desain standar (tema tier Basic)", "Galeri 4 foto", "Kuota 50 tamu", "RSVP kehadiran", "Jadwal acara tanpa batas", "Masa aktif s/d H+30"],
  },
  premium: {
    id: "premium",
    name: "Paket PREMIUM — Undangan Digital UndangYa!",
    price: 110000,
    features: ["Semua fitur Basic", "Galeri 10 foto", "Kuota 100 tamu", "Amplop digital", "Ucapan & doa + cerita cinta", "Desain Premium", "Masa aktif s/d H+30"],
  },
  eksklusif: {
    id: "eksklusif",
    name: "Paket EKSKLUSIF — Undangan Digital UndangYa!",
    price: 180000,
    features: ["Semua fitur Premium", "Galeri 20 foto", "Tamu tanpa batas + impor CSV", "Desain Eksklusif", "Live streaming", "Masa aktif s/d H+60"],
  },
  luxury: {
    id: "luxury",
    name: "Paket LUXURY — Undangan Digital UndangYa!",
    price: 280000,
    features: ["Semua fitur Eksklusif", "Galeri 50 foto", "Tamu tanpa batas", "Semua desain termasuk tier Luxury + sampul video", "Video undangan MP4 9:16 ±60 detik Full HD", "Jadwal berbeda per tamu", "Alamat link rapi tanpa kode acak", "Masa aktif s/d H+90"],
  },
};

/* Id paket lama -> padanan baru (silver->basic, gold->premium,
   platinum->luxury). Dipakai server & checkout untuk menormalkan
   tautan/permintaan lama; respons selalu memakai paket baru. */
const LEGACY_PACKAGE_ALIASES = { silver: "basic", gold: "premium", platinum: "luxury" };

function resolvePackage(id) {
  if (PACKAGES[id]) return PACKAGES[id];
  var mapped = LEGACY_PACKAGE_ALIASES[id];
  return mapped ? PACKAGES[mapped] : null;
}

/* Slug tema yang boleh dipesan: tema warisan themes.js + 25 tema katalog
   saat ini (samakan dengan checkout.html). */
const THEME_SLUGS = [
  "senja-emas", "royal-navy", "rose-blush", "forest-botanical", "lavender-dream",
  "monochrome-luxe", "rustic-kayu", "ocean-teal", "crimson-royal", "sakura",
  "adat-jawa", "adat-sunda", "adat-bali", "taman-rahasia",
  "javanese-illustrated", "masjid-bunga", "pink-garden-fountain", "bali-pastel",
  "burgundy-palace", "palace-garden-gate", "engraved-highland", "ivory-botanical",
  "emerald-luxe", "bioskop-mini", "piringan-hitam", "perjalanan-kereta",
  "surat-hidup", "paspor-cinta", "museum-cinta", "koran-cinta", "peta-ekspedisi",
  "ramuan-cinta", "radio-cinta", "observatorium", "kedai-kopi", "papan-permainan",
  "oceanarium", "pasar-malam",
];

module.exports = { PACKAGES, THEME_SLUGS, LEGACY_PACKAGE_ALIASES, resolvePackage };
