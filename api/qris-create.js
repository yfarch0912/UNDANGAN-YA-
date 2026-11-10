/* POST /api/qris-create
   Buat order QRIS dinamis memakai algoritma dari repo QrisMerchantID
   (port di lib/qris.js, terverifikasi identik dengan Python aslinya).

   Cara kerja gateway model repo ini:
   1. Harga paket diambil dari lib/pricing.js (server), BUKAN dari browser.
   2. Ditambah KODE UNIK 3 digit (100-999) -> total unik per order.
      Kode unik inilah identitas pembayaran: watcher mencocokkan nominal
      persis seperti PaymentWatcher.wait_for_payment() di repo sumber.
   3. Payload QRIS statis merchant disuntik nominal total (tag 54) dan
      CRC dihitung ulang -> QR dinamis siap dirender browser.

   Mode:
   - QRIS_STATIC_PAYLOAD belum dipasang di env -> MODE DEMO: payload contoh
     merchant fiktif "UNDANGAN-YA DEMO" (akun berisi nol, tidak bisa menerima
     uang). Untuk uji alur & tampilan QR saja.
   - QRIS_STATIC_PAYLOAD dipasang (payload statis dari aplikasi merchant
     resmi user, mis. GoPay Merchant/GoBiz atau bank) -> MODE LIVE.
*/
const crypto = require("crypto");
const { PACKAGES, THEME_SLUGS, resolvePackage } = require("./_lib/pricing");
const { injectAmount, getTag, buildDemoStaticPayload, isValidCrc } = require("./_lib/qris");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

function sanitize(s, max) { return String(s || "").trim().slice(0, max || 100); }

module.exports = async function handler(req, res) {
  /* Mode config (bekas fungsi /api/qris-config, digabung demi batas
     jumlah fungsi serverless; URL lama dipertahankan lewat rewrite
     di vercel.json -> /api/qris-create?mode=config):
     "live" bila payload statis merchant terpasang, selain itu "demo".
     Payload statis TIDAK PERNAH dikirim ke browser. */
  if (req.query && req.query.mode === "config") {
    if (req.method !== "GET") { res.status(405).json({ error: "Method not allowed" }); return; }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ mode: process.env.QRIS_STATIC_PAYLOAD ? "live" : "demo" });
    return;
  }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const body = await readBody(req);
  const pkg = resolvePackage(body.packageId);
  if (!pkg) { res.status(400).json({ error: "Paket tidak dikenal. Pilih Basic, Premium, Eksklusif, atau Luxury." }); return; }

  const themeSlug = THEME_SLUGS.includes(body.themeSlug) ? body.themeSlug : "senja-emas";
  const name = sanitize(body.name, 80);
  const email = sanitize(body.email, 120);
  if (name.length < 3) { res.status(400).json({ error: "Nama pemesan minimal 3 karakter." }); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { res.status(400).json({ error: "Format email tidak valid." }); return; }

  const staticPayload = process.env.QRIS_STATIC_PAYLOAD || null;
  const mode = staticPayload ? "live" : "demo";
  const sourcePayload = staticPayload || buildDemoStaticPayload();

  if (!isValidCrc(sourcePayload)) {
    console.error("[qris-create] QRIS_STATIC_PAYLOAD tidak valid (CRC/parse gagal)");
    res.status(500).json({ error: "Payload QRIS statis di server tidak valid. Periksa env QRIS_STATIC_PAYLOAD." });
    return;
  }

  const uniqueCode = crypto.randomInt(100, 1000); // 100-999
  const totalAmount = pkg.price + uniqueCode;
  const orderId = "QRIS-" + Date.now().toString(36).toUpperCase() + "-" + crypto.randomBytes(2).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  let dynamicPayload;
  try {
    dynamicPayload = injectAmount(sourcePayload, totalAmount);
  } catch (err) {
    console.error("[qris-create] injectAmount gagal:", err.message);
    res.status(500).json({ error: "Gagal membuat QRIS dinamis: " + err.message });
    return;
  }

  res.status(200).json({
    mode,
    orderId,
    package: { id: pkg.id, name: pkg.name },
    themeSlug,
    baseAmount: pkg.price,
    uniqueCode,
    totalAmount,
    merchantName: getTag(sourcePayload, "59") || "Merchant",
    payload: dynamicPayload,
    expiresAt,
    note: mode === "demo"
      ? "Payload contoh fiktif — QR ini TIDAK bisa dipakai membayar. Pasang QRIS_STATIC_PAYLOAD untuk mode live."
      : "QRIS dinamis dari payload statis merchant. Verifikasi otomatis butuh watcher berjalan (lihat qris-watcher/).",
  });
};
