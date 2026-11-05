/* POST /api/auth/forgot — minta tautan atur ulang kata sandi.
   Respons SELALU generik (200) agar tidak membocorkan email mana yang
   terdaftar. Token diterbitkan hanya untuk akun yang ada, dibatasi
   5x per jam per email+IP, dan dikirim via email bila provider aktif
   (env RESEND_API_KEY + MAIL_FROM). Env: AUTH_SECRET, BLOB_READ_WRITE_TOKEN. */
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

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
  if (!process.env.AUTH_SECRET || !users.configured()) {
    res.status(503).json({ error: "auth_not_configured" });
    return;
  }
  const body = await readBody(req);
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
};
