/* POST /api/auth/recovery — lupa kata sandi UndangYa! (satu fungsi
   serverless untuk dua langkah, demi batas jumlah fungsi paket Hobby):
   - Body {email}            -> minta tautan atur ulang. Respons SELALU
     generik (200) agar tidak membocorkan email mana yang terdaftar.
     Token hanya diterbitkan untuk akun yang ada, dibatasi 5x per jam
     per email+IP, dikirim via email bila provider aktif (env
     RESEND_API_KEY + MAIL_FROM).
   - Body {token, password}  -> pasang kata sandi baru. Token sekali
     pakai, berlaku 1 jam (lihat _lib/users.js). Berhasil: kata sandi
     terganti + sesi langsung diterbitkan (pengguna langsung masuk).
   Env: AUTH_SECRET, BLOB_READ_WRITE_TOKEN. */
const { issueSession, sessionCookie } = require("../_lib/session");
const users = require("../_lib/users");
const { mailConfigured, sendMail } = require("../_lib/mail");

const GENERIC = {
  ok: true,
  message: "Jika email itu terdaftar, tautan untuk mengatur ulang kata sandi telah dikirim. Tautan berlaku 1 jam.",
};

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
function siteOrigin(req) {
  const host = String((req.headers && req.headers.host) || "");
  if (/(^|\.)undangya\.web\.id$/.test(host) || /\.vercel\.app$/.test(host)) return "https://" + host;
  return "https://www.undangya.web.id";
}

async function handleForgot(req, res, body) {
  const email = users.normalizeEmail(body.email);
  if (!users.validEmail(email)) {
    // Tetap generik: format buruk pun tidak dibedakan responsnya.
    res.status(200).json(GENERIC);
    return;
  }
  try {
    const limited = await users.rateLimitCheck("forgot:" + email + ":" + clientIp(req), 5, 60 * 60 * 1000);
    if (!limited) {
      const user = await users.getUser(email);
      if (user) {
        const token = await users.createPasswordReset(email);
        const link = siteOrigin(req) + "/reset?token=" + token;
        if (mailConfigured()) {
          const name = user.name ? "Halo, " + user.name + "." : "Halo.";
          await sendMail({
            to: email,
            subject: "Atur ulang kata sandi UndangYa!",
            text: name + "\n\nKami menerima permintaan untuk mengatur ulang kata sandi akun UndangYa! kamu.\nBuka tautan ini untuk membuat kata sandi baru (berlaku 1 jam, sekali pakai):\n\n" + link + "\n\nJika kamu tidak meminta ini, abaikan saja email ini — kata sandimu tidak berubah.\n\n— UndangYa!",
            html: "<div style=\"font-family:Georgia,serif;background:#faf6ee;padding:32px 18px;color:#3d2c29\">"
              + "<div style=\"max-width:520px;margin:0 auto;background:#fffdf8;border:1px solid #e5d9bd;border-radius:16px;padding:32px 30px\">"
              + "<p style=\"margin:0 0 6px;font-size:13px;letter-spacing:2px;color:#a07d2c\">UNDANGYA!</p>"
              + "<h1 style=\"margin:0 0 12px;font-size:24px;color:#6e1423\">Atur ulang kata sandi</h1>"
              + "<p style=\"margin:0 0 10px;line-height:1.6\">" + name + "</p>"
              + "<p style=\"margin:0 0 22px;line-height:1.6\">Kami menerima permintaan untuk mengatur ulang kata sandi akunmu. Klik tombol di bawah untuk membuat kata sandi baru. Tautan berlaku <strong>1 jam</strong> dan hanya bisa dipakai sekali.</p>"
              + "<p style=\"margin:0 0 22px\"><a href=\"" + link + "\" style=\"display:inline-block;background:#c7a166;color:#fff;text-decoration:none;padding:13px 26px;border-radius:999px;font-family:Arial,sans-serif;font-size:15px\">Buat Kata Sandi Baru</a></p>"
              + "<p style=\"margin:0 0 6px;line-height:1.6;font-size:13px;color:#7a6a63\">Jika tombol tidak berfungsi, salin tautan ini ke browser:</p>"
              + "<p style=\"margin:0 0 18px;font-size:13px;word-break:break-all\"><a href=\"" + link + "\" style=\"color:#a07d2c\">" + link + "</a></p>"
              + "<p style=\"margin:0;line-height:1.6;font-size:13px;color:#7a6a63\">Jika kamu tidak meminta ini, abaikan saja email ini — kata sandimu tidak berubah.</p>"
              + "</div></div>",
          });
        }
      }
    }
  } catch (e) {
    /* Kegagalan penyimpanan/email tidak dibocorkan ke pemanggil. */
  }
  res.status(200).json(GENERIC);
}

async function handleReset(req, res, body) {
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
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
  if (!process.env.AUTH_SECRET || !users.configured()) {
    res.status(503).json({ error: "auth_not_configured" });
    return;
  }
  const body = await readBody(req);
  if (body && body.token) { await handleReset(req, res, body); return; }
  await handleForgot(req, res, body);
};
