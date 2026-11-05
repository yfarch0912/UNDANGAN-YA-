/* POST /api/auth/reset — pasang kata sandi baru dari tautan email.
   Body: {token, password}. Token sekali pakai, berlaku 1 jam (lihat
   _lib/users.js). Berhasil: kata sandi terganti + sesi langsung
   diterbitkan (pengguna langsung masuk). Env: AUTH_SECRET,
   BLOB_READ_WRITE_TOKEN. */
const { issueSession, sessionCookie } = require("../_lib/session");
const users = require("../_lib/users");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 20000) req.destroy(); });
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}
function clientIp(req) {
  const fwd = (req.headers && req.headers["x-forwarded-for"]) || "";
  return String(fwd).split(",")[0].trim() || "unknown";
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
  if (!process.env.AUTH_SECRET || !users.configured()) {
    res.status(503).json({ error: "auth_not_configured" });
    return;
  }
  const body = await readBody(req);
  const token = String(body.token || "");
  const password = String(body.password || "");
  if (password.length < 8) {
    res.status(400).json({ error: "weak_password", message: "Kata sandi minimal 8 karakter." });
    return;
  }
  try {
    if (await users.rateLimitCheck("reset:" + clientIp(req), 20, 60 * 60 * 1000)) {
      res.status(429).json({ error: "too_many_attempts", message: "Terlalu banyak percobaan. Coba lagi nanti." });
      return;
    }
    const passwordHash = await users.hashPassword(password);
    const user = await users.consumePasswordReset(token, passwordHash);
    if (!user) {
      res.status(400).json({
        error: "invalid_or_expired_token",
        message: "Tautan atur ulang tidak berlaku atau sudah kedaluwarsa. Minta tautan baru.",
      });
      return;
    }
    const sessionUser = { sub: "email:" + user.email, email: user.email, name: user.name || "", picture: "", provider: "email" };
    res.setHeader("Set-Cookie", sessionCookie(issueSession(sessionUser)));
    res.status(200).json({ ok: true, user: { email: user.email, name: sessionUser.name, picture: "" } });
  } catch (e) {
    res.status(502).json({ error: "store_failed", message: "Server penyimpanan tidak merespons. Coba lagi sebentar." });
  }
};
