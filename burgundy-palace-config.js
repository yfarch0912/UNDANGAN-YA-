// ============================================================
// UndangYa! — Burgundy Royal Palace · KONFIGURASI (edit di sini)
// Semua data contoh bertanda JELAS sebagai sampel. Ganti dengan
// data asli pasangan sebelum dipakai untuk acara nyata.
// Nama pasangan diambil dari video referensi (Meyzsa & Fahrezzi).
// Tanggal, venue, orang tua = PLACEHOLDER sampel (bukan dari referensi).
// ============================================================
window.BP_CONFIG = {
  brand: "UndangYa!",
  themeName: "Burgundy Royal Palace",

  couple: {
    bride: {
      short: "Meyzsa",
      full: "Meyzsa Ayu Lestari, S.E.",          // SAMPEL — ganti
      father: "Bapak H. Contoh Ayah Meyzsa",     // SAMPEL — ganti
      mother: "Ibu Hj. Contoh Ibu Meyzsa",       // SAMPEL — ganti
      photo: "assets/undangya/burgundy-palace/photos/portrait-bride.webp",
      instagram: "@meyzsa.contoh"                  // SAMPEL — ganti
    },
    groom: {
      short: "Fahrezzi",
      full: "Fahrezzi Rizky Pratama, S.T.",        // SAMPEL — ganti
      father: "Bapak H. Contoh Ayah Fahrezzi",     // SAMPEL — ganti
      mother: "Ibu Hj. Contoh Ibu Fahrezzi",       // SAMPEL — ganti
      photo: "assets/undangya/burgundy-palace/photos/portrait-groom.webp",
      instagram: "@fahrezzi.contoh"                // SAMPEL — ganti
    },
    photo: "assets/undangya/burgundy-palace/photos/couple.webp" // foto FIKSI demo, tergantikan
  },

  // Tanggal utama (untuk countdown + kalender mini) — SAMPEL
  weddingDateISO: "2027-06-12T08:00:00+07:00",
  weddingDateLabel: "Sabtu, 12 Juni 2027",

  greeting: {
    salam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    verse: "“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”",
    verseSource: "QS. Ar-Rum: 21 — teks sampel, sesuaikan di config",
    intro: "Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:"
  },

  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      dateLabel: "Sabtu, 12 Juni 2027",
      timeLabel: "08.00 – 10.00 WIB",
      startISO: "2027-06-12T08:00:00+07:00",
      endISO: "2027-06-12T10:00:00+07:00",
      venue: "The Royal Ballroom — Nama Venue Sampel",
      address: "Jl. Contoh No. 1, Jakarta — ALAMAT SAMPEL, ganti dengan alamat asli",
      mapsQuery: "Monas Jakarta",
      banner: "assets/undangya/burgundy-palace/stage/gate-detail.webp",
      dresscode: "Burgundy / Emas / Krem — contoh"
    },
    {
      id: "resepsi",
      name: "Resepsi",
      dateLabel: "Sabtu, 12 Juni 2027",
      timeLabel: "11.00 – 13.00 WIB",
      startISO: "2027-06-12T11:00:00+07:00",
      endISO: "2027-06-12T13:00:00+07:00",
      venue: "The Royal Ballroom — Nama Venue Sampel",
      address: "Jl. Contoh No. 1, Jakarta — ALAMAT SAMPEL, ganti dengan alamat asli",
      mapsQuery: "Monas Jakarta",
      banner: "assets/undangya/burgundy-palace/stage/staircase-detail.webp",
      dresscode: "Burgundy / Emas / Krem — contoh"
    }
  ],

  gallery: [
    { src: "assets/undangya/burgundy-palace/photos/couple.webp", caption: "Meyzsa & Fahrezzi" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-closeup.webp", caption: "Dua Hati, Satu Pandang" },
    { src: "assets/undangya/burgundy-palace/photos/portrait-bride.webp", caption: "Mempelai Wanita" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-dance.webp", caption: "Dansa di Ballroom" },
    { src: "assets/undangya/burgundy-palace/photos/portrait-groom.webp", caption: "Mempelai Pria" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-fountain.webp", caption: "Di Air Mancur Emas" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-stairs.webp", caption: "Tawa di Tangga Istana" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-garden.webp", caption: "Langkah Berdua" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-grand-stairs.webp", caption: "Senyum di Tangga Agung" },
    { src: "assets/undangya/burgundy-palace/photos/prewed-fountain-dusk.webp", caption: "Senja di Air Mancur Emas" }
  ],

  // Amplop digital = MODE DEMO. Nomor di bawah ini CONTOH, bukan rekening asli.
  gift: {
    demo: true,
    note: "Mode demo — nomor di bawah ini contoh tampilan. Ganti dengan data asli di burgundy-palace-config.js sebelum digunakan.",
    items: [
      { type: "Bank — CONTOH", name: "Bank Contoh", number: "0000 0000 00", holder: "a.n. Nama Contoh" },
      { type: "E-Wallet — CONTOH", name: "DANA (contoh)", number: "0800 0000 0000", holder: "a.n. Nama Contoh" }
    ]
  },

  closing: {
    text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami beserta keluarga apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.",
    salam: "Wassalamu'alaikum Warahmatullahi Wabarakatuh"
  },

  music: { enabled: true, autoplayAfterOpen: true }
};
