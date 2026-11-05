/* GET /api/auth/me — kembalikan profil pengguna dari cookie sesi (401 bila belum masuk
   atau bila sesi sudah dicabut lewat logout). */
const { readSession } = require("../_lib/session");
const { isSessionRevoked } = require("../_lib/users");

module.exports = async (req, res) => {
  const s = readSession(req);
  if (!s) { res.status(401).json({ error: "not_logged_in" }); return; }
  if (s.jti && (await isSessionRevoked(s.jti))) {
    res.status(401).json({ error: "session_revoked" });
    return;
  }
  res.status(200).json({ user: { email: s.email, name: s.name, picture: s.picture, provider: s.provider || "" } });
};
