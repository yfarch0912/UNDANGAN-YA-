/* GET /api/payment-config
   Info publik untuk frontend: mode pembayaran + Client Key.
   Client Key memang dirancang untuk publik (dipakai Snap JS).
   Server Key TIDAK PERNAH dikirim lewat endpoint ini.
*/
module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const hasServerKey = Boolean(process.env.MIDTRANS_SERVER_KEY);
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    mode: hasServerKey ? (isProduction ? "production" : "sandbox") : "simulated",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || null,
    snapJsUrl: isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js",
  });
};
