/* api/_lib/mail.js — Email transaksional UndangYa! via Resend.
   Aktif HANYA bila env RESEND_API_KEY + MAIL_FROM terpasang di proyek
   Vercel; tanpa keduanya sendMail() mengembalikan false tanpa error,
   sehingga alur pemanggil tetap berjalan (token tetap diterbitkan).
   Kunci tidak pernah ditulis ke kode atau frontend. */
function mailConfigured() {
  return !!(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

async function sendMail(mail) {
  if (!mailConfigured()) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: "Bearer " + process.env.RESEND_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [mail.to],
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      }),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

module.exports = { mailConfigured, sendMail };
