/* POST /api/auth/login — masuk dengan email + kata sandi.
   Kegagalan dibatasi 8x per 15 menit per email+IP; pesan kesalahan selalu generik.
   Env: AUTH_SECRET, BLOB_READ_WRITE_TOKEN. */
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
  const email = users.normalizeEmail(body.email);
  const password = String(body.password || "");
  if (!users.validEmail(email) || !password) {
    res.status(400).json({ error: "invalid_input", message: "Isi email dan kata sandi dengan benar." });
    return;
  }
  const rlKey = "login:" + email + ":" + clientIp(req);
  try {
    const user = await users.getUser(email);
    const ok = user && user.passwordHash
      ? await users.verifyPassword(password, user.passwordHash)
      : false;
    if (!ok) {
      const limited = await users.rateLimitCheck(rlKey, 8, 15 * 60 * 1000);
      if (limited) {
        res.status(429).json({ error: "too_many_attempts", message: "Terlalu banyak percobaan gagal. Tunggu 15 menit lalu coba lagi." });
        return;
      }
      if (user && !user.passwordHash && user.provider === "google") {
        res.status(401).json({ error: "google_account", message: "Akun ini terdaftar lewat Google. Gunakan tombol \"Masuk dengan Google\"." });
        return;
      }
      res.status(401).json({ error: "invalid_credentials", message: "Email atau kata sandi salah." });
      return;
    }
    await users.rateLimitReset(rlKey);
    const sessionUser = { sub: "email:" + email, email, name: user.name || "", picture: "", provider: "email" };
    res.setHeader("Set-Cookie", sessionCookie(issueSession(sessionUser)));
    res.status(200).json({ ok: true, user: { email, name: sessionUser.name, picture: "" } });
  } catch (e) {
    res.status(502).json({ error: "store_failed", message: "Server penyimpanan tidak merespons. Coba lagi sebentar." });
  }
};
