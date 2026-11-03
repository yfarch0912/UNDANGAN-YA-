/* GET /api/auth/me — kembalikan profil pengguna dari cookie sesi (401 bila belum masuk). */
const { readSession } = require("../_lib/session");

module.exports = (req, res) => {
  const s = readSession(req);
  if (!s) { res.status(401).json({ error: "not_logged_in" }); return; }
  res.status(200).json({ user: { email: s.email, name: s.name, picture: s.picture, provider: s.provider || "" } });
};
