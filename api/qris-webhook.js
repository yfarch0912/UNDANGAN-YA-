/* POST /api/qris-webhook
   Callback untuk watcher pembayaran self-hosted (qris-watcher/watcher_service.py)
   yang memakai repo QrisMerchantID: watcher login ke akun merchant SENDIRI
   (GoPay Merchant/GoBiz), menunggu nominal unik order, lalu menembak endpoint
   ini saat pembayaran terdeteksi.

   Keamanan: header `x-qris-signature` = hex HMAC-SHA256 dari string
   "<orderId>.<amount>.<txId>" dengan kunci QRIS_WEBHOOK_SECRET (env).
   Jika secret belum dipasang, endpoint menerima dalam mode demo dengan
   verified:false (sama seperti webhook Midtrans demo) — JANGAN pakai
   mode tanpa secret untuk transaksi sungguhan.
*/
const crypto = require("crypto");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

function expectedSignature(orderId, amount, txId, secret) {
  return crypto.createHmac("sha256", String(secret))
    .update(String(orderId) + "." + String(amount) + "." + String(txId))
    .digest("hex");
}

async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const body = await readBody(req);
  const { orderId, amount, txId, provider } = body || {};
  if (!orderId || !amount || !txId) {
    res.status(400).json({ error: "Field wajib: orderId, amount, txId" });
    return;
  }

  const secret = process.env.QRIS_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[qris-webhook] QRIS_WEBHOOK_SECRET belum dipasang — diterima TANPA verifikasi:", orderId, amount);
    res.status(200).json({ received: true, verified: false, demo: true, orderId, status: "paid" });
    return;
  }

  const expected = expectedSignature(orderId, amount, txId, secret);
  const given = String((req.headers && (req.headers["x-qris-signature"] || req.headers["X-Qris-Signature"])) || "");
  const valid = given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));

  if (!valid) {
    console.warn("[qris-webhook] Signature TIDAK cocok — ditolak. orderId:", orderId);
    res.status(401).json({ received: false, verified: false, error: "Signature tidak valid" });
    return;
  }

  console.log("[qris-webhook] PAID terverifikasi", JSON.stringify({ orderId, amount, txId, provider: provider || "gopay" }));
  // TODO(db): versi production — tandai order LUNAS di database & aktifkan
  // undangan pembeli di sini (sama seperti catatan di api/midtrans-webhook.js).
  res.status(200).json({ received: true, verified: true, orderId, status: "paid" });
}

module.exports = handler;
module.exports.expectedSignature = expectedSignature;
