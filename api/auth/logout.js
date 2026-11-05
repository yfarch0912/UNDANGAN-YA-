/* POST /api/auth/logout — cabut sesi di server (deny-list jti) lalu hapus cookie.
   Tanpa pencabutan, token stateless tetap berlaku sampai kedaluwarsa
   walau pengguna sudah keluar. */
const { clearCookie, readSession } = require("../_lib/session");
const { revokeSession } = require("../_lib/users");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
  try {
    const s = readSession(req);
    if (s && s.jti) await revokeSession(s.jti, s.exp);
  } catch (e) {
    /* Pencabutan gagal (mis. Blob gangguan): cookie tetap dibersihkan;
       token lama kedaluwarsa sendiri paling lambat 7 hari. */
  }
  res.setHeader("Set-Cookie", clearCookie());
  res.status(200).json({ ok: true });
};
