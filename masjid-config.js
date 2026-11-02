/* UndangYa! — Masjid Bunga · SEMUA TEKS CONTOH DIEDIT DI FILE INI
   Tema 2D berlapis dari video referensi "The Wedding of Meyzsa & Fahrezzi".
   Hanya NAMA yang berasal dari referensi; tanggal, venue, nama lengkap,
   orang tua & rekening adalah DATA CONTOH — ganti sebelum dipakai nyata.
   Foto pasangan diganti dengan menimpa file di path photo. */
window.MASJID_CONFIG = {
  musicTitle: "Senandung Sakura — instrumental romantis (sintesis)",
  theme: {
    slug: "masjid-bunga",
    name: "Masjid Bunga",
    assets: "assets/undangya/masjid-bunga/"
  },
  event: {
    type: "Wedding Celebration",
    title: "The Wedding of",
    greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami.",
    dateISO: "2027-11-20T08:00:00+07:00",
    dateLabel: "Sabtu, 20 November 2027",
    venue: "Grand Masjid Ballroom (contoh)",
    address: "Jl. Contoh No. 1, Jakarta Selatan (data contoh — edit di masjid-config.js)",
    maps: "https://www.google.com/maps/search/?api=1&query=Masjid+Jakarta+Selatan"
  },
  couple: {
    bride: { nick: "Meyzsa", full: "Meyzsa Nur Ramadhani, S.Pd.", parents: "Putri dari Bapak H. Ahmad Ramadhan & Ibu Hj. Siti Aminah (contoh)", photo: "photos/portrait-bride.webp" },
    groom: { nick: "Fahrezzi", full: "Fahrezzi Rizky Pratama, S.T.", parents: "Putra dari Bapak H. Bambang Pratama & Ibu Hj. Dewi Lestari (contoh)", photo: "photos/portrait-groom.webp" },
    photo: "photos/couple-sample.webp",
    photoAlt: "Ilustrasi contoh pasangan pengantin Meyzsa & Fahrezzi dalam busana gading berhias emas"
  },
  verses: [
    {
      utama: true,
      arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
      arti: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
      sumber: "QS. Ar-Rūm (30) : 21"
    },
    {
      arab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      arti: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.",
      sumber: "QS. Al-Furqān (25) : 74"
    }
  ],
  story: [
    { year: "2023", title: "Pertemuan Pertama", text: "Di sebuah kajian sore di masjid kampus, Fahrezzi menitipkan payung saat hujan turun — dan percakapan singkat itu tidak pernah benar-benar selesai. (teks contoh)" },
    { year: "2025", title: "Ta'aruf & Keluarga", text: "Dengan niat baik dan restu kedua keluarga, kami saling mengenal dalam adab yang dijaga, hingga yakin untuk melangkah lebih jauh. (teks contoh)" },
    { year: "2027", title: "Lamaran", text: "Di bawah rindang pohon sakura buatan di taman kota, Fahrezzi menyampaikan pinangan. Meyzsa mengangguk — dan hari bahagia itu kini menanti. (teks contoh)" }
  ],
  schedule: [
    { name: "Akad Nikah", time: "08.00 – 10.00 WIB", note: "Ruang Utama Masjid (contoh)" },
    { name: "Resepsi", time: "11.00 – 13.00 WIB", note: "Grand Ballroom (contoh)" }
  ],
  gallery: [
    { src: "gallery/gal-ceremony.webp", alt: "Ilustrasi interior masjid gading dengan pelaminan bunga", cap: "Pelaminan Masjid" },
    { src: "gallery/gal-garden.webp", alt: "Ilustrasi taman gazebo gading di antara pohon berbunga", cap: "Taman Gazebo" },
    { src: "gallery/gal-arch.webp", alt: "Ilustrasi lengkung emas berhiaskan mawar merah dan lentera", cap: "Lengkung Emas" },
    { src: "gallery/gal-falls.webp", alt: "Ilustrasi air terjun ganda dan kolam berbatu", cap: "Air Terjun" },
    { src: "gallery/gal-mosque-dome.webp", alt: "Ilustrasi kubah dan menara masjid dari dekat", cap: "Kubah & Menara" },
    { src: "gallery/gal-waterfall-rocks.webp", alt: "Ilustrasi bebatuan dan air terjun di depan masjid", cap: "Kolam Batu" }
  ],
  gift: [
    { bank: "BCA (contoh)", number: "1234567890", name: "a.n. Meyzsa Nur Ramadhani" },
    { bank: "DANA (contoh)", number: "081234567890", name: "a.n. Fahrezzi Rizky Pratama" }
  ],
  closing: "Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran serta doa yang tulus, kami mengucapkan terima kasih. Wassalamu'alaikum Warahmatullahi Wabarakatuh."
};
