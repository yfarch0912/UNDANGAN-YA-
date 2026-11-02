/* Harga resmi di server — JANGAN percaya harga dari browser.
   Halaman checkout menampilkan angka yang sama untuk UI saja;
   api/create-transaction.js selalu menghitung ulang dari file ini. */
const PACKAGES = {
  silver: {
    id: "silver",
    name: "Paket SILVER — Undangan Web 3D",
    price: 199000,
    features: ["1 tema standar (10 tema warna)", "Countdown, galeri, RSVP & buku tamu", "Amplop digital", "Link tamu personal (?to=Nama)", "Masa aktif 1 tahun"],
  },
  gold: {
    id: "gold",
    name: "Paket GOLD — Undangan Web 3D + Adat",
    price: 299000,
    features: ["Semua 13 tema termasuk Adat Jawa / Sunda / Bali", "Semua fitur Silver", "Musik latar & peta lokasi", "Dresscode & cerita cinta (timeline)", "Masa aktif 2 tahun"],
  },
  platinum: {
    id: "platinum",
    name: "Paket PLATINUM — Web Interaktif + Video MP4",
    price: 399000,
    features: ["Semua fitur Gold", "Tema interaktif Taman Rahasia", "Video undangan MP4 portrait 9:16 (±60 detik, Full HD)", "Prioritas pengerjaan", "Masa aktif selamanya"],
  },
};

/* Slug tema yang boleh dipesan (samakan dengan themes.js + taman-rahasia) */
const THEME_SLUGS = [
  "senja-emas", "royal-navy", "rose-blush", "forest-botanical", "lavender-dream",
  "monochrome-luxe", "rustic-kayu", "ocean-teal", "crimson-royal", "sakura",
  "adat-jawa", "adat-sunda", "adat-bali", "taman-rahasia",
];

module.exports = { PACKAGES, THEME_SLUGS };
