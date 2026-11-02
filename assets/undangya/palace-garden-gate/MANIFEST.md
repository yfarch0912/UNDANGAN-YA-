# Asset Manifest — Palace Garden Gate (Rimsha & Zafer)

Total file aset produksi: **58** (+ 4 master originals di `originals/` = 62 file gambar/SVG, 66 termasuk sidecar JSON master).
Semua aset **orisinal**: 4 master digenerate AI sesi ini (watercolor Eropa klasik), sisanya turunan rembg/crop/komposit dari master tersebut, prosedural PIL, atau SVG gambar tangan. Tidak ada potongan frame video referensi.
Alpha semua layer transparan terverifikasi dari log build: extrema (0,255) per aset (script `~/workspace/pgg-build/build_assets.py`, venv rembg u2netp, boost alfa ×1,3 tanpa threshold keras).

## Master originals (4)
| File | Isi |
|---|---|
| originals/…exterior-arch…webp | Lengkung batu abu + crest bersayap + istana + flora bingkai (1120×2240) |
| originals/…interior-fountain…webp | Lengkung terracotta + rococo + gerbang dalam + lentera + air mancur (1120×2240) |
| originals/…bronze-gate…webp | Gerbang bronze filigree simetris di latar putih (1280×1920) |
| originals/…flora-sheet…webp | 6 klaster bunga terpisah di latar putih (1920×1280) |

## scenes/ (9, RGB WebP)
exterior-full · interior-full · closing-bg (= interior) · palace-vista (crop) · fountain-scene (crop) · gallery-gate-detail (crop) · gallery-arch-detail (crop) · gallery-flora-detail (crop) · texture-paper · texture-pink-wash — *itu 10 nama file; exterior/interior/closing dihitung 3, total folder scenes = 10 file.*

## layers/ (8, transparan, rembg)
gate-full (640×920, diturunkan dari 872×1254 pada refinement 2026-10-29 — hanya tampil 240px di Lokasi) · gate-left (436×1254) · gate-right (436×1254) — belahan persis di sumbu tengah gate-full · rococo-frame · fountain · lantern-left · lantern-right · crest-medallion · inner-gate-top *(10 file; inner-gate-top alfa tipis — cadangan, tidak dipakai halaman)* · gapura (1000×1333, diturunkan dari 1344×1792 pada refinement; lengkung batu paling depan dari master AI ke-5 di latar putih; rembg gagal membuka bukaan tengah → flood-fill white-key; dipasang PALING DEPAN di cover — gerbang membuka di balik bukaannya, kamera menembusnya saat intro)

## flora/ (17, transparan kecuali bottom-band ber-feather)
Dari flora-sheet (rembg per sel): peony-magenta, calla, roses-white, branch-terracotta, lily-pink, sage-sprig + varian cermin (flip) untuk 5 pertama = 11 file.
Dari master eksterior/interior: side-left & side-right (dibangun ulang 2026-10-29 sebagai komposit klaster vertikal peony/calla/mawar/ranting — ekstraksi lama hanya ghost ±2%; tetap cadangan, tidak dipakai halaman), ground-left & ground-right (komposit klaster transparan PIL, diganti dari ekstraksi crop yang membawa struktur kolom), bottom-band (crop bawah eksterior, tepi atas feather gradien), frame-overlay (komposit klaster di kanvas transparan 900×1600). *Refinement 2026-10-29: branch-top-left/right DIHAPUS — keduanya salinan byte-identik branch-terracotta(-flip); hero kini mereferensikan file aslinya langsung.*

## fx/ (8, PNG prosedural PIL)
petal-pink-1 · petal-pink-2 · petal-magenta · petal-cream · petal-terracotta · leaf-sage · leaf-green · sparkle-gold

## ornaments/ (14, SVG gambar tangan)
divider · corner-tl/tr/bl/br · monogram (R&Z) · icon-ring · icon-calendar · icon-map-pin · icon-gift · icon-music · icon-envelope · icon-clock · icon-heart

## photos/ (2, placeholder netral berlabel "FOTO DEMO")
placeholder-bride (monogram R + flora) · placeholder-groom (monogram Z + flora) — **bukan foto orang**, wajib diganti foto asli pasangan via config · couple-photo (ilustrasi AI pasangan fiktif dari master ke-6, crop rapat 4:5 — tampil di hero setelah masuk gerbang, berlabel "Foto Contoh"; ganti via config couple.photo).

## Catatan kejujuran
- fountain.webp & rococo-frame.webp diekstrak dari elemen yang juga menyatu di interior-full; di halaman, rococo dipakai sebagai overlay yang **diselaraskan posisinya** dengan versi menyatu (top 3,5%, lebar 61%), sedangkan fountain-layer overlay **dihapus** dari HTML agar tidak dobel — air mancur tampil dari adegan interior.
- crest-medallion overlay di cover diselaraskan ke crest menyatu di eksterior (top 10,5%, lebar 28%).
- Untuk deploy preview, 8 file >95KB di-re-encode kualitas lebih rendah **hanya di folder staging**; file proyek utama tidak berubah.

- scenes/venue-path.webp — 1000×667, jalan taman menuju venue (khusus section Lokasi; master originals/venue-path-master.webp 2736×912, AI orisinal 2026-10-29 atas permintaan user menggantikan ilustrasi gerbang di Lokasi)
