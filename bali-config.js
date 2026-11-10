/* UndangYa! — Bali Pastel Romance — konfigurasi tunggal (data CONTOH, mudah diganti) */
window.BALI_CONFIG = {
  musicTitle: "Petals on the Stone Floor — instrumental",
  couple: {
    bride: { nick: "Meyzsa", full: "Meyzsa Ayu Lestari, S.Par.", father: "Bapak I Made Sudarma", mother: "Ibu Ni Wayan Sari", origin: "Banjar Tengah, Ubud, Gianyar", photo: "assets/undangya/bali-pastel/photos/portrait-bride.webp" },
    groom: { nick: "Fahrezzi", full: "Fahrezzi Wirawan, S.T.", father: "Bapak I Nyoman Rai", mother: "Ibu Ni Ketut Ayu", origin: "Banjar Kaja, Denpasar", photo: "assets/undangya/bali-pastel/photos/portrait-groom.webp" },
    couplePhoto: "assets/undangya/bali-pastel/photos/couple.webp",
    heroPhoto: "assets/undangya/bali-pastel/photos/couple-hero.webp",
    monogram: "M · F"
  },
  /* Sabtu, 15 Mei 2027 — terverifikasi hari Sabtu. Sumber tanggal/waktu tunggal = events[].startISO/endISO di bawah (WITA +08:00). */
  dateLabel: "Sabtu, 15 Mei 2027",
  greeting: "Om Swastiastu",
  greetingText: "Dengan memohon rahmat dan karunia Ida Sang Hyang Widhi Wasa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada hari bahagia kami.",
  quote: { text: "Cinta adalah taman yang dirawat dua hati — disiram kesetiaan, dipupuk pengertian, dan mekar dalam restu keluarga.", source: "Untuk Meyzsa & Fahrezzi — kutipan contoh, dapat diganti" },
  events: [
    { key: "pawiwahan", name: "Pawiwahan", title: "Upacara Pawiwahan", dateLabel: "Sabtu, 15 Mei 2027", time: "09.00 – 11.00 WITA", venue: "Puri Taman Saraswati Garden", address: "Jl. Raya Ubud No. 88, Ubud, Gianyar, Bali (alamat contoh)", mapsQuery: "Puri Taman Saraswati Ubud Bali", startISO: "2027-05-15T09:00:00+08:00", endISO: "2027-05-15T11:00:00+08:00" },
    { key: "resepsi", name: "Resepsi", title: "Resepsi Pernikahan", dateLabel: "Sabtu, 15 Mei 2027", time: "13.00 – 16.00 WITA", venue: "Puri Taman Saraswati Garden", address: "Jl. Raya Ubud No. 88, Ubud, Gianyar, Bali (alamat contoh)", mapsQuery: "Puri Taman Saraswati Ubud Bali", startISO: "2027-05-15T13:00:00+08:00", endISO: "2027-05-15T16:00:00+08:00" }
  ],
  story: [
    { year: "2019", title: "Pertemuan di Ubud", text: "Di sebuah sore di taman teratai Ubud, Meyzsa dan Fahrezzi bertemu untuk pertama kalinya. (Cerita contoh — ganti dengan kisah nyata pasangan.)" },
    { year: "2022", title: "Tumbuh Bersama", text: "Dari secangkir kopi di tepi danau hingga rencana masa depan, kebersamaan mereka tumbuh seperti kamboja yang mekar perlahan. (Contoh.)" },
    { year: "2026", title: "Lamaran di Tepi Danau", text: "Di bawah langit lavender, Fahrezzi meminang Meyzsa disaksikan keluarga tercinta. (Contoh.)" }
  ],
  gallery: [
    { src: "assets/undangya/bali-pastel/panel-01-floral-gate.webp", pos: "50% 30%", cap: "Gerbang Bunga — Candi Bentar" },
    { src: "assets/undangya/bali-pastel/panel-02-garden-hero.webp", pos: "50% 65%", cap: "Meru di Taman Kamboja" },
    { src: "assets/undangya/bali-pastel/panel-03-lake-garden.webp", pos: "50% 70%", cap: "Danau Teratai" },
    { src: "assets/undangya/bali-pastel/panel-04-courtyard.webp", pos: "50% 75%", cap: "Jalur Batu Halaman Pura" },
    { src: "assets/undangya/bali-pastel/panel-01-floral-gate.webp", pos: "15% 55%", cap: "Anggrek & Wisteria Lavender" },
    { src: "assets/undangya/bali-pastel/panel-03-lake-garden.webp", pos: "50% 20%", cap: "Kamboja di Atas Danau" },
    { src: "assets/undangya/bali-pastel/library/details/detail-gate-carving.webp", cap: "Ukiran Candi Bentar" },
    { src: "assets/undangya/bali-pastel/library/details/detail-lantern.webp", cap: "Lentera Batu Taman Salam" },
    { src: "assets/undangya/bali-pastel/library/details/detail-lotus.webp", cap: "Teratai di Tepi Danau" },
    { src: "assets/undangya/bali-pastel/library/details/detail-reflection.webp", cap: "Pantulan Gerbang Senja" },
    { src: "assets/undangya/bali-pastel/library/details/detail-pavilion.webp", cap: "Bale Paviliun Berbunga" },
    { src: "assets/undangya/bali-pastel/library/details/detail-lake-path.webp", cap: "Jalur Batu ke Gerbang Danau" }
  ],
  gift: { bank: "BCA (contoh)", number: "1234567890", holder: "Meyzsa Ayu Lestari" },
  rsvp: { storageKey: "undangya-bali-pastel-rsvp-v1", deadlineLabel: "Mohon konfirmasi sebelum 8 Mei 2027" },
  panels: {
    gate: "assets/undangya/bali-pastel/panel-01-floral-gate.webp",
    garden: "assets/undangya/bali-pastel/panel-02-garden-hero.webp",
    lake: "assets/undangya/bali-pastel/panel-03-lake-garden.webp",
    courtyard: "assets/undangya/bali-pastel/panel-04-courtyard.webp",
    pavilion: "assets/undangya/bali-pastel/panel-05-pavilion.webp",
    greeting: "assets/undangya/bali-pastel/panel-06-greeting.webp",
    gallery: "assets/undangya/bali-pastel/panel-07-gallery.webp",
    location: "assets/undangya/bali-pastel/panel-08-location.webp",
    closing: "assets/undangya/bali-pastel/panel-09-closing.webp",
    rsvp: "assets/undangya/bali-pastel/panel-10-rsvp.webp",
    gift: "assets/undangya/bali-pastel/panel-11-gift.webp"
  }
};
