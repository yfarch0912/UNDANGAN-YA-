/* GET /api/qris-config
   Mode QRIS untuk banner halaman pembayaran sejak halaman dibuka:
   "live" bila payload statis merchant terpasang, selain itu "demo".
   Tidak ada data sensitif — payload statis TIDAK PERNAH dikirim ke browser.
*/
module.exports = function handler(req, res) {
  if (req.method !== "GET") { res.status(405).json({ error: "Method not allowed" }); return; }
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ mode: process.env.QRIS_STATIC_PAYLOAD ? "live" : "demo" });
};
