/* POST /api/auth/google — terima ID token dari tombol "Sign in with Google",
   verifikasi ke Google, lalu terbitkan cookie sesi UndangYa!.
   Env yang dibutuhkan: GOOGLE_CLIENT_ID, AUTH_SECRET. */
const { issueSession, sessionCookie } = require("../../lib/session");
const users = require("../../lib/users");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  if (!clientId || !process.env.AUTH_SECRET) {
    res.status(503).json({ error: "auth_not_configured" });
    return;
  }
  const body = await readBody(req);
  const idToken = body && body.credential;
  if (!idToken || typeof idToken !== "string") {
    res.status(400).json({ error: "missing_credential" });
    return;
  }
  let info;
  try {
    const r = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(idToken));
    if (!r.ok) { res.status(401).json({ error: "invalid_token" }); return; }
    info = await r.json();
  } catch (e) {
    res.status(502).json({ error: "verify_failed" });
    return;
  }
  const verified = info.email_verified === true || info.email_verified === "true";
  if (info.aud !== clientId || !verified || !info.email) {
    res.status(401).json({ error: "invalid_token" });
    return;
  }
  const user = { sub: info.sub, email: info.email, name: info.name || "", picture: info.picture || "", provider: "google" };
  // Catat akun di penyimpanan pengguna (penyatuan akun dgn login email); gagal catat tidak menggagalkan masuk.
  if (users.configured()) {
    try {
      const existing = await users.getUser(info.email);
      if (!existing) {
        await users.createUser({ name: user.name, email: info.email, passwordHash: null, provider: "google" });
      }
    } catch (e) { /* abaikan */ }
  }
  res.setHeader("Set-Cookie", sessionCookie(issueSession(user)));
  res.status(200).json({ ok: true, user: { email: user.email, name: user.name, picture: user.picture } });
};
