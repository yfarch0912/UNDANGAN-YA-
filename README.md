# UNDANGAN-YA! 3D — “Senja Emas”

Web undangan pernikahan digital **3D** (statis, tanpa build step): buka `index.html`, edit data di `config.js`, deploy.

**Live pattern / fitur**
- Latar **Three.js real-time**: dua cincin emas saling mengait + berlian, hati emas melayang, 420 partikel cahaya; kamera mengikuti pointer & scroll.
- Sampul kartu **3D tilt** mengikuti kursor/sentuhan, segel mempelai, nama tamu personal dari `?to=Nama%20Tamu`.
- Animasi buka undangan: semburan partikel emas (gold burst) + cincin 3D membesar.
- Countdown live, tombol Google Calendar, kartu Akad & Resepsi 3D tilt + Google Maps, dress code.
- Love story timeline, galeri + lightbox (keyboard ←/→/Esc), amplop digital salin nomor, alamat hadiah.
- RSVP + buku tamu (demo localStorage), **Generator Link Tamu** (+ tombol WhatsApp), musik latar lembut via WebAudio (tanpa file MP3).
- Responsif mobile-first, hormati `prefers-reduced-motion`, fallback anggun bila WebGL/CDN gagal.

## 13 Tema 3D
Di dalam undangan ada section **“Pilih Tema 3D”** — tamu/mempelai bisa mengganti tema secara live, dan ada halaman **`katalog.html`** berisi katalog 13 tema (setiap kartu membuka undangan dengan tema itu, `?tema=<slug>`):

1. **Senja Emas** — emas & sage, hati emas (Great Vibes)
2. **Royal Navy** — biru malam & emas, kristal (Pinyon Script)
3. **Rose Blush** — rose gold, hati emas (Parisienne)
4. **Forest Botanical** — hijau hutan, orb cahaya (Great Vibes)
5. **Lavender Dream** — ungu dreamy, kristal (Dancing Script)
6. **Monochrome Luxe** — hitam-putih-perak, kristal (Pinyon Script)
7. **Rustic Kayu** — cokelat kayu vintage, orb (Dancing Script)
8. **Ocean Toska** — toska laut, orb gelembung (Parisienne)
9. **Crimson Royal** — marun & emas, hati emas (Great Vibes)
10. **Sakura** — pink sakura, hati emas (Parisienne)
11. **Adat Jawa — konsep Gerbang Gunungan**: kartu sampul keraton malam (sogan gelap, tepi emas), tekstur pola Kawung di seluruh latar, orb damar, musik laras pelog, salam “Sugeng Rawuh” (Pinyon Script)
12. **Adat Sunda — konsep Mega Mendung**: pita awan mega mendung berlapis di latar, bingkai siger emas + aksen bambu, kristal, musik laras degung, salam “Wilujeng Sumping” (Parisienne)
13. **Adat Bali — konsep Gapura Candi Bentar**: dua menara gerbang belah batu merah di sisi sampul yang **sungguh terbuka menyamping** saat “Buka Undangan” ditekan (`.gates-open`), hati emas kamboja, musik laras slendro, salam “Om Swastiastu” (Great Vibes)

Tema adat mengganti salam pembuka (`#salamLine`), mengaktifkan `body[data-concept]` (gunungan / mega-mendung / candi-bentar), label konsep di sampul, dan tangga nada musik latar khas daerah (`theme.music`).

Setiap tema mengganti palet CSS, font script, warna cincin/partikel/fog 3D, dan bentuk benda melayang. Definisi tema di `themes.js`; pilihan tersimpan di localStorage dan terbawa di Generator Link Tamu (`&tema=`).

## Cara pakai
1. Edit **`config.js`** — nama mempelai, tanggal (`weddingISO`), tempat, cerita, rekening, seed foto galeri.
2. Ganti foto: isi URL foto Anda di `bride.photo` / `groom.photo` dan daftar galeri.
3. Deploy: seret folder ini ke Vercel / Netlify / Cloudflare Pages, atau `vercel --prod` dari folder ini.
4. Kirim undangan: `https://domain-anda/?to=Nama%20Tamu` atau pakai Generator Link Tamu di halaman.

## Riset repo (dicek 27 Okt 2026)
Kode situs ini **original**, terinspirasi pola terbaik dari repo publik berikut:

| Repo | Stack | Yang diadopsi sebagai ide | Lisensi (per README) |
|---|---|---|---|
| [gorillaworkout/undangan-nikah](https://github.com/gorillaworkout/undangan-nikah) | Next.js 16, TS, Tailwind, Framer Motion, **Three.js/R3F** | 3D floating rings & particles, **semua kustomisasi di satu file config**, 8 preset tema, `?to=` | MIT |
| [dewanakl/undangan](https://github.com/dewanakl/undangan) | HTML, Bootstrap, AOS, Confetti | Template Indonesia terpopuler (±170★), struktur section klasik undangan ID | cek repo |
| [arifintajul4/nikahfix](https://github.com/arifintajul4/nikahfix) | React, Vite, Tailwind, Supabase | Konsep undangan sinematik gaya Netflix (69★, 31 fork) | cek repo |
| [arapcihuy/undangan-gratis-2d](https://github.com/arapcihuy/undangan-gratis-2d) | 1 file HTML, tanpa framework | Segel interaktif, QRIS, ringan ±40KB; versi 3D sinematiknya berbayar | Bebas pakai & modifikasi |
| mustvlad/wedding-lp | React Three Fiber, GLSL shaders | Referensi visual ethereal: parallax & shader fluida untuk pengembangan lanjutan | cek repo |

**Rekomendasi:** untuk produksi berskala (RSVP tersimpan server, banyak tema) fork `gorillaworkout/undangan-nikah` (MIT, Three.js asli). Untuk yang ringan & langsung jadi, situs ini siap pakai; RSVP-nya masih demo localStorage — sambungkan ke Supabase mengikuti pola repo di atas bila perlu data terpusat.

## ⭐ Taman Rahasia — Tema Interaktif (halaman tersendiri)
`taman-rahasia.html` (+ `garden.css`, `garden.js`) — pengalaman interaktif penuh, desain original:
- **Kelopak interaktif** (canvas): kelopak berjatuhan terus, menghindar dari kursor/jari, dan meledak jadi semburan kelopak saat layar disentuh/diklik.
- **Kupu-kupu & lebah** yang beterbangan dan mendekati kursor bila dibiarkan.
- **Tiga suasana**: Pagi / Senja / Malam mengubah seluruh palet + warna kelopak secara live.
- **Countdown flip** yang berputar tiap detik berubah; **sulur tanaman** di sisi kiri tumbuh mengikuti progres scroll; elemen **parallax** berlapis.
- **Galeri strip** yang bisa diseret (drag) + lightbox.
- **Kebun Doa**: tamu bisa *menanam bunga* dengan mengklik tanah di kebun; ucapan dari formulir RSVP mekar jadi bunga bernama pengirimnya. Semua tersimpan di localStorage.
- Musik latar WebAudio, kartu mempelai/acara 3D tilt, nama tamu `?to=`, data dari `config.js` yang sama.

## Berkas
- `index.html` — struktur halaman
- `styles.css` — tema Senja Emas (ivory, emas, sage)
- `config.js` — **satu-satunya file yang perlu diedit untuk data**
- `three-scene.js` — scene Three.js (cincin, hati, partikel)
- `app.js` — countdown, tilt, lightbox, RSVP, generator, musik
