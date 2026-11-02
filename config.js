/* ============================================================
   UNDANGAN-YA! 3D — SEMUA DATA DIEDIT DI FILE INI SAJA
   Terinspirasi pola "single config file" dari repo
   gorillaworkout/undangan-nikah (MIT). Kode situs ini original.
   ============================================================ */
window.UNDANGAN_CONFIG = {
  bride: {
    nick: "Meyzsa",
    full: "Meyzsa Ayu Lestari, S.Pd.",
    father: "Bapak Bambang Lestari",
    mother: "Ibu Sari Lestari",
    order: "Putri kedua dari",
    photo: "https://picsum.photos/seed/nadia-mempelai/560/680",
    instagram: "@meyzsa.contoh"
  },
  groom: {
    nick: "Fahrezzi",
    full: "Fahrezzi Aditya Pratama, S.T.",
    father: "Bapak Agus Pratama",
    mother: "Ibu Dewi Pratama",
    order: "Putra pertama dari",
    photo: "https://picsum.photos/seed/bima-mempelai/560/680",
    instagram: "@fahrezzi.contoh"
  },
  // Sabtu, 12 Juni 2027 — dipakai countdown & kalender
  weddingISO: "2027-06-12T08:00:00+07:00",
  events: [
    {
      name: "Akad Nikah",
      day: "Sabtu",
      dateLabel: "12 Juni 2027",
      time: "08.00 – 10.00 WIB",
      venue: "Masjid Agung Al-Azhar",
      address: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      maps: "https://www.google.com/maps/search/?api=1&query=Masjid+Agung+Al-Azhar+Jakarta"
    },
    {
      name: "Resepsi",
      day: "Sabtu",
      dateLabel: "12 Juni 2027",
      time: "11.00 – 13.00 WIB",
      venue: "The Sultan Hotel & Residence",
      address: "Jl. Gatot Subroto, Senayan, Jakarta Pusat",
      maps: "https://www.google.com/maps/search/?api=1&query=The+Sultan+Hotel+Jakarta"
    }
  ],
  story: [
    { year: "2019", title: "Pertama Bertemu", text: "Di sebuah seminar kampus di Jakarta, Fahrezzi meminjamkan payung saat hujan deras. Meyzsa membalasnya dengan secangkir kopi — dan nomor telepon." },
    { year: "2022", title: "Satu Frekuensi", text: "Tiga tahun, dua kota, ratusan panggilan video. Jarak mengajarkan kami bahwa pulang bukan selalu tempat — kadang, pulang adalah orang." },
    { year: "2026", title: "Lamaran", text: "Di bawah langit senja, Fahrezzi berlutut dengan cincin sederhana. Meyzsa menangis, tertawa, lalu mengangguk. Sisanya adalah persiapan hari ini." }
  ],
  gallerySeeds: ["senja-emas-1","senja-emas-2","senja-emas-3","senja-emas-4","senja-emas-5","senja-emas-6"],
  gifts: [
    { bank: "BCA", number: "1234567890", holder: "Meyzsa Ayu Lestari" },
    { bank: "Mandiri", number: "0987654321", holder: "Fahrezzi Aditya Pratama" }
  ],
  giftAddress: "Jl. Mawar No. 10, Kebayoran Baru, Jakarta Selatan 12120 (a.n. Meyzsa Ayu Lestari)",
  dresscode: ["Emas", "Sage", "Krem", "Cokelat muda"],
  musicTitle: "Senja Emas — melodi latar (sintesis)"
};
