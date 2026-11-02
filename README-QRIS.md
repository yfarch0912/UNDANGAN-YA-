# Payment Gateway QRIS — pola repo QrisMerchantID

Alternatif untuk checkout Midtrans (`PAYMENT.md`), dibangun atas permintaan user
memakai repo **[AlfinAI/QrisMerchantID](https://github.com/AlfinAI/QrisMerchantID)** (MIT).

Demo live: **https://undangan-3d.vercel.app/qris.html**

## ⚠️ Baca dulu — status repo sumber

Repo itu menulis sendiri di README-nya:

- Proyek riset **tidak resmi** — tidak berafiliasi dengan GoTo/GoPay/GoBiz/Shopee.
- Untuk **riset & edukasi**; memakai API tidak resmi **dapat melanggar Ketentuan
  Layanan** penyedia dan berisiko rate-limit sampai penangguhan akun. Risiko ditanggung pemakai.
- Status pengembangan **Alpha**; verifikasi langsung ke akun partner asli masih
  berstatus TODO di roadmap penulisnya.

Jadi gateway ini cocok sebagai **prototipe / eksperimen dengan akun merchant milik
sendiri**, bukan untuk jualan produksi. Untuk transaksi sungguhan, Midtrans
(gateway resmi berlisensi) tetap jalur yang aman — lihat `PAYMENT.md`.

## Cara kerja (dua bagian)

```
[ Vercel — situs ini ]                                [ Komputer/server pemilik merchant ]
qris.html                                             qris-watcher/watcher_service.py
  | POST /api/qris-create                               | login OTP ke GoPay Merchant SENDIRI
  |   harga dari lib/pricing.js + kode unik 100–999     |   (library QrisMerchantID)
  |   payload statis -> suntik tag 54 -> CRC ulang      | watcher.seed() lalu
  v                                                     | watcher.wait_for_payment(total × 100 sen)
QR dinamis ditampilkan                                  |
  ^                                                     v
Pembeli scan & bayar nominal PERSIS ──── uang masuk ke akun merchant (QRIS resmi)
                                                        | ketemu nominal cocok
  POST /api/qris-webhook  <── HMAC-SHA256 ──────────────┘
  verifikasi signature -> order LUNAS (TODO(db): simpan ke database)
```

**Kenapa kode unik?** QRIS statis tidak membawa nomor order. Sama seperti pola
di repo sumber (`wait_for_payment(amount)`), satu-satunya identitas pembayaran
adalah **nominal yang unik** — makanya total = harga paket + kode unik 3 digit,
dan pembeli wajib membayar persis sampai digit terakhir.

## Yang dibangun dari repo

| Bagian repo | Pemakaian di sini |
|---|---|
| `gopay/qris.py` — `parse`, `get_tag`, `crc16_ccitt`, `inject_amount` | Di-port ke `lib/qris.js`; hasil diverifikasi **byte-identik** dengan Python asli untuk nominal 199000 / 299123 / 399499 |
| Konsep `PaymentWatcher.wait_for_payment` | `qris-watcher/watcher_service.py` (Python, memakai library aslinya via pip) |
| Konversi minor unit GoPay (`gopay/money.py`) | Watcher mengalikan total rupiah × 100 |
| `examples/04_qris_dynamic.py` | Bukti QR dinamis bisa dibuat offline tanpa login — dasar mode demo |

## File

| File | Fungsi |
|---|---|
| `qris.html` | Halaman checkout QRIS (render QR, hitung mundur 15 menit, cek status) |
| `lib/qris.js` | Port EMVCo QRIS: TLV parse, inject nominal, CRC16-CCITT, payload demo |
| `api/qris-create.js` | Buat order + QR dinamis (harga server-side + kode unik) |
| `api/qris-webhook.js` | Terima callback watcher, verifikasi HMAC-SHA256 |
| `qris-watcher/watcher_service.py` | Watcher self-hosted (jalan di mesin pemilik merchant, bukan Vercel) |

## Mengaktifkan mode LIVE

1. Kamu perlu **QRIS statis resmi milikmu** (dari aplikasi GoPay Merchant/GoBiz,
   ShopeePay Merchant, atau bank) — ambil *payload teks*-nya (string panjang
   berawalan `000201...` yang terkandung di QR statismu; bisa dibaca dengan
   aplikasi QR scanner apa pun).
2. Di Vercel (project `undangan-3d`) → Settings → Environment Variables:
   - `QRIS_STATIC_PAYLOAD` = payload statis itu
   - `QRIS_WEBHOOK_SECRET` = **sudah dipasang 2026-10-27** (nilai yang sama ada di
     `qris-watcher/.env` lokal — jangan dishare). Webhook live sudah menegakkan
     HMAC: callback tanpa signature benar ditolak 401 (terverifikasi).
3. Redeploy. Banner di `qris.html` berubah jadi **MODE LIVE**.
4. Jalankan watcher di komputermu — versi 2 sudah mode daemon banyak order:
   sesi login tersimpan (OTP hanya saat sesi mati), `.env` dimuat otomatis,
   dan ada panduan + skrip khusus Windows di `qris-watcher/PANDUAN-WINDOWS.md`
   (`jalankan-watcher.bat` / `tambah-order.bat`, paket ZIP siap salin ke PC).
   ```bash
   pip install QrisMerchantID httpx
   # isi GOPAY_PHONE di qris-watcher/.env (MERCHANT_ID boleh kosong — dicari otomatis)
   python3 qris-watcher/watcher_service.py --add QRIS-XXXX-AB12 299871
   python3 qris-watcher/watcher_service.py   # daemon memantau semua order waiting
   ```
5. Watcher login OTP ke akun merchant-mu, menunggu nominal unik tiap order,
   lalu menembak webhook — order terkonfirmasi tanpa kamu cek mutasi manual.

Tanpa langkah 1–4, situs berjalan **MODE DEMO**: payload QR memakai merchant
fiktif “UNDANGAN-YA DEMO” (akun berisi nol — QR tidak bisa dibayar) dan
pengecekan status disimulasikan, semata untuk mencoba alurnya.

## Bukti loop end-to-end (2026-10-27)

Dengan feed transaksi tiruan (bentuk analytics GoPay, nominal dalam sen), seluruh
loop terbukti memakai kode asli repo + kode project ini:

1. Order dibuat lewat API live Vercel → `QRIS-MVQT07PI-4B5D`, total Rp299.871 (Gold + kode unik 871).
2. Payload dinamis dari API live **identik** dengan hasil `qris.inject_amount` library Python repo.
3. `PaymentWatcher` asli repo (seed → `wait_for_payment(29987100)`) mendeteksi transaksi cocok.
4. `watcher_service.send_paid_callback` → webhook menerima: `{"verified": true, "status": "paid"}`.

Yang belum dibuktikan (dan memang tidak bisa dari sisi Muse): pembayaran uang
asli ke akun merchant user — itu butuh payload statis + login OTP merchant milik user.

## Batasan yang jujur

- Watcher **tidak bisa** berjalan di Vercel (serverless tidak bisa polling 15 menit
  dan tidak boleh menyimpan sesi login) — memang dirancang self-hosted seperti repo sumber.
- Dua order bersamaan dengan total unik yang sama bisa tertukar; versi produksi
  perlu penyimpanan order aktif (database) agar kode unik tidak tabrakan.
- Webhook saat ini stateless (status masuk log Vercel) — sama seperti catatan
  `TODO(db)` di webhook Midtrans.
