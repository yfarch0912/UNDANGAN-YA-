/* POST /api/auth/register — daftar akun email + kata sandi.
   Berhasil: cookie sesi langsung diterbitkan (pengguna langsung masuk).
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
  const name = String(body.name || "").trim();
  const email = users.normalizeEmail(body.email);
  const password = String(body.password || "");

  if (name.length < 2) { res.status(400).json({ error: "invalid_name", message: "Nama minimal 2 karakter." }); return; }
  if (!users.validEmail(email)) { res.status(400).json({ error: "invalid_email", message: "Format email tidak valid." }); return; }
  if (password.length < 8) { res.status(400).json({ error: "weak_password", message: "Kata sandi minimal 8 karakter." }); return; }

  try {
    if (await users.rateLimitCheck("register:" + clientIp(req), 10, 60 * 60 * 1000)) {
      res.status(429).json({ error: "too_many_attempts", message: "Terlalu banyak percobaan daftar. Coba lagi nanti." });
      return;
    }
    const existing = await users.getUser(email);
    if (existing && existing.passwordHash) {
      res.status(409).json({ error: "email_taken", message: "Email ini sudah terdaftar. Silakan masuk." });
      return;
    }
    const passwordHash = await users.hashPassword(password);
    let user;
    if (existing) {
      // Akun lama dari login Google: tautkan kata sandi ke akun yang sama.
      existing.passwordHash = passwordHash;
      if (!existing.name) existing.name = name;
      user = await users.putUser(existing);
    } else {
      user = await users.createUser({ name, email, passwordHash, provider: "email" });
    }
    const sessionUser = { sub: "email:" + email, email, name: user.name, picture: "", provider: "email" };
    res.setHeader("Set-Cookie", sessionCookie(issueSession(sessionUser)));
    res.status(201).json({ ok: true, user: { email, name: user.name, picture: "" } });
  } catch (e) {
    res.status(502).json({ error: "store_failed", message: "Server penyimpanan tidak merespons. Coba lagi sebentar." });
  }
};
