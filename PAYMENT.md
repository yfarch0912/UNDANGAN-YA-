# Demo Payment Gateway — Midtrans Sandbox untuk UNDANGAN-YA! 3D

Demo checkout: **https://undangan-3d.vercel.app/checkout.html**
(Dari katalog: tombol “Checkout Demo” / “Pesan Tema Ini”.)

## Cara kerja

```
Browser (checkout.html)
  1. Pilih paket + tema, isi nama/email
  2. POST /api/create-transaction        -> server menghitung harga dari lib/pricing.js
  3a. Belum ada Server Key  -> mode SIMULASI: popup pembayaran tiruan di browser
  3b. Ada Server Key Sandbox -> server memanggil Midtrans Snap API,
      browser membuka popup Snap asli dengan token (snap.pay)
  4. Midtrans mengirim notifikasi ke POST /api/midtrans-webhook
     -> server memverifikasi signature_key = SHA512(order_id+status_code+gross_amount+ServerKey)
     -> status settlement/capture = LUNAS. Redirect browser TIDAK pernah dipercaya.
```

Harga paket (sumber satu-satunya di server: `lib/pricing.js`):

| Paket | Harga | Isi ringkas |
|---|---|---|
| SILVER | Rp199.000 | 1 tema standar, RSVP, galeri, amplop digital, aktif 1 tahun |
| GOLD | Rp299.000 | Semua 13 tema incl. adat, aktif 2 tahun |
| PLATINUM | Rp399.000 | Gold + Taman Rahasia interaktif + video MP4 9:16, aktif selamanya |

## File yang ditambahkan

| File | Fungsi |
|---|---|
| `checkout.html` | Halaman checkout + popup simulasi + integrasi Snap JS |
| `api/create-transaction.js` | Buat transaksi Snap (harga dari server, Server Key dari env) |
| `api/midtrans-webhook.js` | Terima & verifikasi notifikasi pembayaran |
| `api/payment-config.js` | Beri tahu frontend mode aktif + Client Key (publik) |
| `lib/pricing.js` | Daftar paket & harga (server-side, anti-manipulasi harga) |

## Aktivasi Sandbox asli (≈10 menit, gratis)

1. Daftar di https://midtrans.com → masuk **Dashboard Sandbox**.
2. Ambil key: **Settings → Access Keys** — ada `Server Key` (awalan `SB-Mid-server-`) dan `Client Key` (awalan `SB-Mid-client-`).
3. Di Vercel (project `undangan-3d`) → **Settings → Environment Variables**, tambahkan untuk Production (+ Preview bila perlu):
   - `MIDTRANS_SERVER_KEY` = Server Key Sandbox
   - `MIDTRANS_CLIENT_KEY` = Client Key Sandbox
   - `MIDTRANS_IS_PRODUCTION` = `false`
4. Redeploy project (Deployments → ⋯ → Redeploy) supaya env terbaca.
5. Di dashboard Midtrans Sandbox → **Settings → Payment**, isi:
   - **Payment Notification URL:** `https://undangan-3d.vercel.app/api/midtrans-webhook`
   - Finish / Unfinish / Error redirect URL (opsional): `https://undangan-3d.vercel.app/checkout.html`
6. Buka `checkout.html` — banner berubah jadi **MODE SANDBOX MIDTRANS**. Checkout akan membuka popup Snap asli.

### Data test Sandbox

- Kartu: `4811 1111 1111 1114`, exp `01/39`, CVV `123`, OTP `112233`
- VA / e-wallet / QRIS: bayar lewat **Midtrans Simulator** https://simulator.sandbox.midtrans.com
- Cek transaksi & log notifikasi: dashboard Sandbox → Transactions; log webhook ada di Vercel → project → Logs (cari `[webhook] OK`).

## Menuju Production (uang asli)

1. Aktivasi akun Midtrans Production: siapkan dokumen —
   perorangan: KTP (+ NPWP untuk kartu kredit); CV/PT: KTP direktur, NPWP bisnis, akta pendirian/perubahan, SK Kemenkumham, rekening atas nama badan usaha.
2. Setelah disetujui, ambil Server/Client Key **Production** (tanpa awalan `SB-`), ganti env di Vercel, set `MIDTRANS_IS_PRODUCTION=true`, redeploy.
3. Ganti Payment Notification URL di dashboard **Production** ke URL webhook yang sama.
4. **Sebelum jualan sungguhan:** webhook saat ini masih stateless (status hanya masuk log Vercel). Tambahkan database (mis. Supabase) di titik `TODO(db)` dalam `api/midtrans-webhook.js` untuk menyimpan order & mengaktifkan undangan pembeli otomatis saat status `paid`.

## Keamanan

- Server Key tidak pernah dikirim ke browser dan tidak disimpan di repo — hanya di Environment Variables Vercel.
- Harga selalu dari `lib/pricing.js` di server; nominal dari browser diabaikan.
- Webhook menolak notifikasi yang signature-nya tidak cocok (HTTP 400).
