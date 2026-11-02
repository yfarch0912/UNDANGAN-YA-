/* POST /api/auth/logout — hapus cookie sesi. */
const { clearCookie } = require("../../lib/session");

module.exports = (req, res) => {
  res.setHeader("Set-Cookie", clearCookie());
  res.status(200).json({ ok: true });
};
