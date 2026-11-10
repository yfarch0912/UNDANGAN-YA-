/* UndangYa! — Palace Garden Gate · SEMUA TEKS CONTOH DIEDIT DI FILE INI
   Tema watercolor taman istana Eropa: ganti isi di sini, layout, aset & animasi tidak berubah.
   ⚠️ SEMUA DATA DI BAWAH ADALAH DATA CONTOH (SAMPLE) untuk demo tema.
   Nama orang tua, venue, dan rekening adalah contoh — ganti dengan data asli pasangan
   sebelum undangan disebar. Rekening bertanda DEMO tidak boleh dipakai menerima dana. */
window.PALACE_CONFIG = {
  musicTitle: "Petals on the Stone Floor — instrumental",
  theme: {
    slug: "palace-garden-gate",
    name: "Palace Garden Gate",
    assets: "assets/undangya/palace-garden-gate/"
  },
  event: {
    openingLabel: "Casamento",           /* kata pembuka di video referensi (Portugis: pernikahan) — bebas diganti "The Wedding of" dll. */
    greeting: "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan berbagi kebahagiaan di hari pernikahan kami, di taman yang menjadi saksi awal kisah ini.",
    quote: "Di antara taman dan cahaya pagi, dua hati memilih untuk pulang ke satu sama lain — selamanya.",
    quoteSource: "Untuk Meyzsa & Fahrezzi",
    /* Tanggal utama acara (ISO + zona waktu eksplisit). Hari/tanggal di halaman
       SELALU dihitung dari nilai ini via JavaScript — tidak ditulis manual. */
    dateISO: "2027-06-12T08:00:00+07:00",
    venue: "The Palace Garden Hall, Jakarta",         /* CONTOH */
    address: "Jl. Taman Istana Contoh No. 1, Jakarta (alamat contoh)", /* CONTOH */
    maps: "https://www.google.com/maps/search/?api=1&query=The+Palace+Garden+Hall+Jakarta"
  },
  couple: {
    photo: "photos/couple-photo.webp",   /* ilustrasi contoh pasangan fiktif — ganti dengan foto asli */
    photoAlt: "Ilustrasi contoh pasangan fiktif di taman istana — ganti dengan foto asli",
    bride: {
      nick: "Meyzsa",
      full: "Meyzsa Zahra, S.E.",                        /* CONTOH */
      parents: "Putri dari Bapak Ahmad Zahra & Ibu Fatimah Zahra (nama contoh)",
      photo: "photos/placeholder-bride.webp",
      photoAlt: "Foto placeholder demo mempelai wanita — ganti dengan foto asli"
    },
    groom: {
      nick: "Fahrezzi",
      full: "Fahrezzi Mahendra, S.T.",                      /* CONTOH */
      parents: "Putra dari Bapak Mahendra Saputra & Ibu Ratna Saputra (nama contoh)",
      photo: "photos/placeholder-groom.webp",
      photoAlt: "Foto placeholder demo mempelai pria — ganti dengan foto asli"
    }
  },
  schedule: [
    { name: "Akad Nikah", label: "Ceremony", time: "08.00 – 10.00 WIB", note: "Paviliun Utama Taman", startISO: "2027-06-12T08:00:00+07:00", endISO: "2027-06-12T10:00:00+07:00" },
    { name: "Resepsi", label: "Reception", time: "11.00 – 13.00 WIB", note: "Balairung Palace Garden Hall", startISO: "2027-06-12T11:00:00+07:00", endISO: "2027-06-12T13:00:00+07:00" }
  ],
  story: [
    { year: "2021", title: "Pertemuan di Taman", img: "flora/peony-magenta.webp", text: "Sebuah sore hujan di taman kota mempertemukan Meyzsa & Fahrezzi di bawah lengkung gerbang yang sama — awal dari segalanya. (teks contoh)" },
    { year: "2023", title: "Lamaran di Air Mancur", img: "flora/calla.webp", text: "Dua tahun kemudian, di tepi air mancur taman istana, Fahrezzi berlutut dan Meyzsa menjawab ya di antara bunga peony. (teks contoh)" },
    { year: "2027", title: "Hari Bahagia", img: "flora/lily-pink.webp", text: "Kini gerbang itu terbuka untuk selamanya. Meyzsa & Fahrezzi mengundang Anda menjadi saksi babak terindah mereka. (teks contoh)" }
  ],
  gallery: [
    { src: "photos/gallery-couple-gate.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi berjalan melewati gerbang taman istana", cap: "Melewati Gerbang Taman" },
    { src: "photos/gallery-couple-fountain.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi duduk tertawa di tepi air mancur istana", cap: "Tawa di Air Mancur" },
    { src: "photos/gallery-couple-arch.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi di bawah lengkung terracotta dengan buket peony", cap: "Di Bawah Lengkung" },
    { src: "photos/gallery-couple-dance.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi berdansa di paviliun taman", cap: "Dansa di Paviliun" },
    { src: "photos/gallery-couple-close.webp", alt: "Ilustrasi watercolor potret dekat Meyzsa & Fahrezzi di antara mawar putih", cap: "Dua Hati, Satu Pandang" },
    { src: "photos/gallery-couple-terrace.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi di teras istana saat senja keemasan", cap: "Senja di Teras Istana" },
    { src: "photos/gallery-couple-path.webp", alt: "Ilustrasi watercolor Meyzsa & Fahrezzi berjalan bergandengan di jalan setapak peony", cap: "Jalan Setapak Peony" },
    { src: "photos/gallery-couple-ring.webp", alt: "Ilustrasi watercolor Fahrezzi menyematkan cincin untuk Meyzsa di depan gerbang bronze", cap: "Janji di Gerbang Bronze" },
    { src: "scenes/palace-vista.webp", alt: "Panorama taman istana dan lengkung batu", cap: "Palace Vista" },
    { src: "scenes/fountain-scene.webp", alt: "Air mancur tiga tingkat di tengah taman", cap: "Air Mancur" },
    { src: "scenes/gallery-gate-detail.webp", alt: "Detail ukiran gerbang bronze", cap: "Detail Gerbang" },
    { src: "scenes/gallery-arch-detail.webp", alt: "Detail lengkung terracotta dan kolom", cap: "Lengkung Dalam" },
    { src: "scenes/interior-full.webp", alt: "Komposisi interior taman istana", cap: "Interior Taman" },
    { src: "scenes/exterior-full.webp", alt: "Komposisi eksterior gerbang istana", cap: "Gerbang Luar" }
  ],
  gift: {
    note: "Kehadiran Anda adalah hadiah terindah. Namun apabila berkenan memberi tanda kasih, kami sediakan dengan penuh terima kasih:",
    accounts: [
      { bank: "Bank Contoh (DEMO)", number: "0000000000", holder: "a.n. Meyzsa Zahra (CONTOH)" },
      { bank: "E-Wallet Contoh (DEMO)", number: "080000000000", holder: "a.n. Fahrezzi Mahendra (CONTOH)" }
    ]
  },
  closing: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran serta doa yang tulus, kami mengucapkan terima kasih."
};
