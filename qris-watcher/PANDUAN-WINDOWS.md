# Panduan Watcher QRIS di PC Windows

Watcher ini yang membuat pembayaran QRIS terkonfirmasi **otomatis**: ia login
ke akun GoPay Merchant kamu (memakai library QrisMerchantID), menunggu
transaksi masuk bernominal unik order, lalu memberi tahu website bahwa order
sudah LUNAS. Tanpa watcher yang menyala, pembayaran tetap masuk ke akunmu,
hanya konfirmasinya manual.

> ⚠️ Library ini tidak resmi (riset, reverse-engineering aplikasi merchant).
> Repo-nya sendiri memperingatkan kemungkinan melanggar ketentuan GoPay dan
> risiko akun dibatasi. Gunakan hanya akun merchant milikmu sendiri.

## Persiapan akun (yang kamu siapkan)

1. **Akun GoPay Merchant / GoBiz aktif** — daftar lewat aplikasi GoPay Merchant
   bila belum punya, selesaikan verifikasi tokonya sampai bisa menerima QRIS.
2. **QRIS statis toko itu** — dari aplikasi, buka QRIS tokomu, lalu salin
   *payload teksnya*: scan gambar QR-nya dengan aplikasi QR scanner biasa,
   hasilnya teks panjang berawalan `000201...`. Kirim teks itu ke Muse untuk
   dipasang ke website (sekali saja).
3. **Nomor HP** yang terdaftar di akun merchant (untuk OTP login watcher).

## Instalasi di PC (sekali saja, ±10 menit)

1. Install **Python 3.11+** dari https://www.python.org/downloads/ —
   saat instalasi **centang "Add python.exe to PATH"**.
2. Salin folder `qris-watcher` ini ke PC (mis. ke `Documents\qris-watcher`).
   Di dalamnya harus ada: `watcher_service.py`, `.env`,
   `jalankan-watcher.bat`, `tambah-order.bat`.
   ⚠️ File `.env` berisi secret webhook — jangan kirim file ini ke siapa pun.
3. Buka folder itu, klik address bar File Explorer, ketik `cmd`, Enter. Jalankan:
   ```
   pip install QrisMerchantID httpx
   ```
4. Buka `.env` dengan Notepad, isi:
   - `GOPAY_PHONE=` nomor HP merchant (format 08xxxx)
   - `MERCHANT_ID=` boleh dikosongkan — watcher mencari otomatis dari akunmu.
     Kalau akunmu punya beberapa toko, watcher akan menampilkan daftarnya;
     isi salah satu ID-nya di sini.
   - Sisanya (SITE_URL, QRIS_WEBHOOK_SECRET) **sudah terisi, jangan diubah**.

## Pemakaian sehari-hari

1. Ada order masuk dari website? Catat **Order ID** dan **total uniknya**
   (contoh: `QRIS-MVQT07PI-4B5D` — Rp299.871).
2. Klik dua kali **`tambah-order.bat`**, masukkan Order ID dan totalnya.
   (Boleh ditambah sebelum watcher jalan maupun saat watcher sedang jalan.)
3. Klik dua kali **`jalankan-watcher.bat`** dan biarkan jendelanya terbuka.
   - Pertama kali: watcher meminta **kode OTP** yang dikirim ke HP merchant.
     Ketik lalu Enter. Sesi tersimpan di `.gopay-session.json` — berikutnya
     langsung jalan; OTP hanya diminta lagi kalau sesi kedaluwarsa dan
     refresh gagal.
   - Saat pembayaran pembeli masuk dengan nominal persis, watcher mencetak
     "Pembayaran cocok" dan website menandai order LUNAS.
4. Selesai memantau? Tutup jendela watcher (Ctrl+C lalu tutup).

## Kalau ada masalah

- **`pip` tidak dikenal** → Python belum masuk PATH; install ulang Python dan
  centang opsi PATH, atau pakai perintah `py -m pip install QrisMerchantID httpx`.
- **OTP tidak masuk** → pastikan nomor di `.env` sama dengan nomor merchant;
  tunggu 1–2 menit sebelum minta kode baru (terlalu sering meminta bisa dibatasi).
- **"Ada beberapa merchant"** → isi `MERCHANT_ID` di `.env` dengan salah satu
  ID yang ditampilkan.
- **Pembeli bayar tapi tidak terdeteksi** → hampir selalu karena nominalnya
  tidak persis (kode unik terlewat). Minta pembeli membayar tepat sampai 3
  digit terakhir; kalau terlanjur beda, konfirmasi manual saja untuk order itu.
- **Jendela watcher tertutup** → pembayaran tetap masuk ke akun merchant,
  hanya konfirmasi otomatisnya berhenti. Jalankan lagi watcher-nya; order
  yang masih "waiting" di `orders.json` akan tetap dicocokkan dengan
  transaksi BARU yang masuk setelah watcher jalan lagi.
