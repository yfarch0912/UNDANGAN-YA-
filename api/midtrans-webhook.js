/* POST /api/midtrans-webhook
   Endpoint notifikasi pembayaran dari Midtrans (Payment Notification URL).

   Daftarkan URL ini di dashboard Midtrans Sandbox:
   Settings > Payment > Payment Notification URL =
   https://undangan-3d.vercel.app/api/midtrans-webhook

   Verifikasi WAJIB: signature_key harus sama dengan
   SHA512(order_id + status_code + gross_amount + ServerKey)
   Notifikasi yang signature-nya tidak cocok ditolak (400) — jangan pernah
   percaya redirect "sukses" dari browser sebagai bukti pembayaran.

   Catatan demo: endpoint ini stateless (belum ada database), jadi status
   hanya dicatat di log Vercel. Untuk production sungguhan, simpan status
   order ke database (mis. Supabase) di titik bertanda TODO(db) di bawah,
   lalu aktifkan undangan pembeli saat status menjadi "paid".
*/
const crypto = require("crypto");
const { PACKAGES } = require("../lib/pricing");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

function expectedSignature(orderId, statusCode, grossAmount, serverKey) {
  return crypto
    .createHash("sha512")
    .update(String(orderId) + String(statusCode) + String(grossAmount) + String(serverKey))
    .digest("hex");
}

function mapStatus(notification) {
  const t = notification.transaction_status;
  const fraud = notification.fraud_status;
  if (t === "settlement") return "paid";
  if (t === "capture") return fraud === "challenge" ? "challenge" : "paid";
  if (t === "pending") return "pending";
  if (t === "deny" || t === "cancel") return "failed";
  if (t === "expire") return "expired";
  if (t === "refund" || t === "partial_refund") return "refunded";
  return "unknown";
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const notification = await readBody(req);
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (!serverKey) {
    // Demo belum dikonfigurasi: terima agar mudah diuji, tapi tandai jelas.
    console.warn("[webhook] MIDTRANS_SERVER_KEY belum dipasang — notifikasi diterima TANPA verifikasi:", notification.order_id);
    res.status(200).json({ received: true, verified: false, demo: true, orderId: notification.order_id || null });
    return;
  }

  const expected = expectedSignature(notification.order_id, notification.status_code, notification.gross_amount, serverKey);
  const given = String(notification.signature_key || "");
  const valid =
    given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));

  if (!valid) {
    console.warn("[webhook] Signature TIDAK cocok — ditolak. order_id:", notification.order_id);
    res.status(400).json({ received: false, verified: false, error: "Signature tidak valid" });
    return;
  }

  const internalStatus = mapStatus(notification);

  // Sanity check nominal untuk order kita (jika order_id pola UND3D- dan ada paket yang cocok tidak wajib di demo)
  console.log("[webhook] OK", JSON.stringify({
    order_id: notification.order_id,
    transaction_status: notification.transaction_status,
    payment_type: notification.payment_type,
    gross_amount: notification.gross_amount,
    internal_status: internalStatus,
    known_packages: Object.keys(PACKAGES),
  }));

  // TODO(db): di production, update baris order di database di sini:
  // - internalStatus === "paid"  -> tandai LUNAS + aktifkan undangan pembeli
  // - "pending"                  -> simpan nomor VA / link bayar
  // - "failed"/"expired"         -> tandai order gagal/kedaluwarsa

  res.status(200).json({ received: true, verified: true, orderId: notification.order_id, status: internalStatus });
}

module.exports = handler;
module.exports.expectedSignature = expectedSignature;
module.exports.mapStatus = mapStatus;
