/* ============================================================
   UNDANGAN-YA! 3D — 10 TEMA
   Setiap tema mengganti: palet warna (CSS variables), font
   tulisan tangan, warna cincin/partikel 3D, dan bentuk benda
   melayang di scene Three.js (hati / kristal / orb).
   Tema aktif dipilih dari: ?tema=<slug> → localStorage → default.
   ============================================================ */
window.THEMES = [
  {
    slug: "senja-emas", name: "Senja Emas", tagline: "Emas hangat & sage — klasik, timeless",
    font: "'Great Vibes', cursive", orn: "✦",
    css: { gold: "#b98a2f", gold2: "#d9b45c", goldSoft: "#e9d9ae", sage: "#7d8b6f", cream: "#f3ead8", bg: "linear-gradient(180deg,#f7efe0,#efe3cb 45%,#e9dcbf)" },
    three: { ring: "#c99b3f", ring2: "#e3c26e", particle: "#d9b45c", fog: "#f3ead8", gem: "#ffffff", shape: "hearts" },
    swatch: ["#b98a2f", "#d9b45c", "#7d8b6f", "#faf6ee"]
  },
  {
    slug: "royal-navy", name: "Royal Navy", tagline: "Biru malam & emas — megah dan formal",
    font: "'Pinyon Script', cursive", orn: "❖",
    css: { gold: "#1f3a68", gold2: "#c9a227", goldSoft: "#d8c98a", sage: "#35507e", cream: "#e6ebf5", bg: "linear-gradient(180deg,#e8edf6,#d9e2f0 45%,#c3d2e8)" },
    three: { ring: "#c9a227", ring2: "#e8d284", particle: "#c9a227", fog: "#d9e2f0", gem: "#bcd2ff", shape: "crystals" },
    swatch: ["#1f3a68", "#c9a227", "#35507e", "#eef2fa"]
  },
  {
    slug: "rose-blush", name: "Rose Blush", tagline: "Rose gold & merah muda — romantis lembut",
    font: "'Parisienne', cursive", orn: "❀",
    css: { gold: "#c2607e", gold2: "#e3a0b0", goldSoft: "#f6ccd6", sage: "#b76e79", cream: "#fbeef0", bg: "linear-gradient(180deg,#fdf0f0,#f9e0e3 45%,#f5d3d9)" },
    three: { ring: "#e0a387", ring2: "#efc3ab", particle: "#e59cae", fog: "#f9e0e3", gem: "#ffd7e2", shape: "hearts" },
    swatch: ["#c2607e", "#e3a0b0", "#b76e79", "#fff5f6"]
  },
  {
    slug: "forest-botanical", name: "Forest Botanical", tagline: "Hijau hutan & krem — natural, adem",
    font: "'Great Vibes', cursive", orn: "❧",
    css: { gold: "#5c7350", gold2: "#a8b98a", goldSoft: "#d3dfc0", sage: "#8a6d3b", cream: "#eef3e2", bg: "linear-gradient(180deg,#eef3e6,#e0ead0 45%,#cfdeb6)" },
    three: { ring: "#a8a04c", ring2: "#c9bd7a", particle: "#9db38d", fog: "#e0ead0", gem: "#eaffd0", shape: "orbs" },
    swatch: ["#5c7350", "#a8b98a", "#8a6d3b", "#f6f9ef"]
  },
  {
    slug: "lavender-dream", name: "Lavender Dream", tagline: "Ungu muda dreamy — manis dan magis",
    font: "'Dancing Script', cursive", orn: "✧",
    css: { gold: "#7a5fa8", gold2: "#b79ae0", goldSoft: "#ddd0f5", sage: "#8e7cc3", cream: "#f1ebfc", bg: "linear-gradient(180deg,#f1ecfb,#e4d9f8 45%,#d5c4f2)" },
    three: { ring: "#b79ae0", ring2: "#d3bcf2", particle: "#a678e0", fog: "#e4d9f8", gem: "#e6dcff", shape: "crystals" },
    swatch: ["#7a5fa8", "#b79ae0", "#8e7cc3", "#faf7ff"]
  },
  {
    slug: "monochrome-luxe", name: "Monochrome Luxe", tagline: "Hitam-putih-perak — minimalis mewah",
    font: "'Pinyon Script', cursive", orn: "◆",
    css: { gold: "#26262a", gold2: "#8f8f96", goldSoft: "#d6d6da", sage: "#55565c", cream: "#efefec", bg: "linear-gradient(180deg,#f5f5f3,#e9e9e7 45%,#dbdbd8)" },
    three: { ring: "#b9b9c2", ring2: "#d9d9e0", particle: "#9a9aa2", fog: "#e9e9e7", gem: "#ffffff", shape: "crystals" },
    swatch: ["#26262a", "#8f8f96", "#55565c", "#ffffff"]
  },
  {
    slug: "rustic-kayu", name: "Rustic Kayu", tagline: "Cokelat kayu & krem — vintage hangat",
    font: "'Dancing Script', cursive", orn: "❦",
    css: { gold: "#96613a", gold2: "#c08b57", goldSoft: "#e2cba6", sage: "#77815a", cream: "#f6ecdc", bg: "linear-gradient(180deg,#f6ecdd,#eddcc0 45%,#e0c99f)" },
    three: { ring: "#b07a3f", ring2: "#d1a468", particle: "#c08b57", fog: "#eddcc0", gem: "#ffe9c9", shape: "orbs" },
    swatch: ["#96613a", "#c08b57", "#77815a", "#fbf5ea"]
  },
  {
    slug: "ocean-teal", name: "Ocean Toska", tagline: "Toska laut & perak — segar seperti pantai",
    font: "'Parisienne', cursive", orn: "✿",
    css: { gold: "#1f7a72", gold2: "#57b8ad", goldSoft: "#bfe6df", sage: "#c9a227", cream: "#e8f6f3", bg: "linear-gradient(180deg,#e6f4f2,#d2ebe8 45%,#b7ddd8)" },
    three: { ring: "#7fc8bd", ring2: "#a8ded4", particle: "#3fae9f", fog: "#d2ebe8", gem: "#d8fff8", shape: "orbs" },
    swatch: ["#1f7a72", "#57b8ad", "#c9a227", "#f2fbfa"]
  },
  {
    slug: "crimson-royal", name: "Crimson Royal", tagline: "Marun & emas — anggun bak bangsawan",
    font: "'Great Vibes', cursive", orn: "♛",
    css: { gold: "#8c2f39", gold2: "#c9973f", goldSoft: "#eccf9a", sage: "#5c1f24", cream: "#f9eeee", bg: "linear-gradient(180deg,#f9ecec,#f2dbdb 45%,#eac6c6)" },
    three: { ring: "#c9973f", ring2: "#e3c26e", particle: "#c05a64", fog: "#f2dbdb", gem: "#ffd9d9", shape: "hearts" },
    swatch: ["#8c2f39", "#c9973f", "#5c1f24", "#fdf5f5"]
  },
  {
    slug: "sakura", name: "Sakura", tagline: "Pink sakura & daun muda — manis ala Jepang",
    font: "'Parisienne', cursive", orn: "🌸",
    css: { gold: "#d16a92", gold2: "#edaec2", goldSoft: "#f9d3e0", sage: "#8fb996", cream: "#fdf0f3", bg: "linear-gradient(180deg,#fdf3f5,#fbe4ec 45%,#f6d2e0)" },
    three: { ring: "#edaec2", ring2: "#f8cbdc", particle: "#ef9fbc", fog: "#fbe4ec", gem: "#ffe3ee", shape: "hearts" },
    swatch: ["#d16a92", "#edaec2", "#8fb996", "#fff7f9"]
  },
  {
    slug: "adat-jawa", name: "Adat Jawa", tagline: "Konsep Gerbang Gunungan — keraton malam, sogan & emas",
    adat: "Jawa", motif: "Batik Kawung & Sogan Solo", salam: "Sugeng Rawuh · Rahayu tansah pinanggih",
    concept: "gunungan", conceptName: "Gerbang Gunungan Wayang",
    music: [[293.66, 369.99, 440], [246.94, 293.66, 369.99], [220, 293.66, 349.23], [261.63, 329.63, 440]],
    font: "'Pinyon Script', cursive", orn: "❁",
    css: { gold: "#7a4a21", gold2: "#c9973f", goldSoft: "#e8d3a0", sage: "#4a3520", cream: "#f7efe0", bg: "linear-gradient(180deg,#f3e7d3,#e9d5ae 45%,#d9bd8a)" },
    three: { ring: "#b8862e", ring2: "#d9ab4a", particle: "#c9973f", fog: "#e9d5ae", gem: "#fff3d6", shape: "orbs" },
    swatch: ["#7a4a21", "#c9973f", "#4a3520", "#fbf4e4"]
  },
  {
    slug: "adat-sunda", name: "Adat Sunda", tagline: "Konsep Mega Mendung — langit Priangan, siger emas, aksen bambu",
    adat: "Sunda", motif: "Mega Mendung & Siger", salam: "Wilujeng Sumping · Mugia rahayu salawasna",
    concept: "mega-mendung", conceptName: "Pita Awan Mega Mendung",
    music: [[261.63, 311.13, 392], [293.66, 349.23, 440], [261.63, 329.63, 392], [196, 261.63, 392]],
    font: "'Parisienne', cursive", orn: "❦",
    css: { gold: "#2e5f8a", gold2: "#7fb2d9", goldSoft: "#c3dcf0", sage: "#6a994e", cream: "#eef5fb", bg: "linear-gradient(180deg,#e9f2fa,#d5e6f5 45%,#bcd6ee)" },
    three: { ring: "#d4a017", ring2: "#7fb2d9", particle: "#7fb2d9", fog: "#d5e6f5", gem: "#eaf6ff", shape: "crystals" },
    swatch: ["#2e5f8a", "#7fb2d9", "#6a994e", "#f4f9fd"]
  },
  {
    slug: "adat-bali", name: "Adat Bali", tagline: "Konsep Gapura Candi Bentar — gerbang belahnya terbuka saat undangan dibuka",
    adat: "Bali", motif: "Kamboja & Endek Gringsing", salam: "Om Swastiastu · Mogi rahayu sareng sami",
    concept: "candi-bentar", conceptName: "Gapura Candi Bentar Terbuka",
    music: [[311.13, 392, 466.16], [349.23, 440, 523.25], [311.13, 370, 466.16], [277.18, 349.23, 466.16]],
    font: "'Great Vibes', cursive", orn: "🌺",
    css: { gold: "#9d2c2c", gold2: "#e0a526", goldSoft: "#f2d38a", sage: "#386641", cream: "#fbf0e4", bg: "linear-gradient(180deg,#faeee0,#f3d9b8 45%,#e9c491)" },
    three: { ring: "#e0a526", ring2: "#f2d38a", particle: "#e0a526", fog: "#f3d9b8", gem: "#fff6da", shape: "hearts" },
    swatch: ["#9d2c2c", "#e0a526", "#386641", "#fff8ec"]
  }
];

/* Resolusi tema aktif: ?tema= > localStorage > default senja-emas */
(function () {
  var bySlug = {};
  window.THEMES.forEach(function (t) { bySlug[t.slug] = t; });
  var slug = new URLSearchParams(location.search).get('tema');
  if (!slug) { try { slug = localStorage.getItem('undangan3d_tema'); } catch (e) {} }
  window.__THEME = bySlug[slug] || window.THEMES[0];
  window.__themeBySlug = bySlug;
})();
