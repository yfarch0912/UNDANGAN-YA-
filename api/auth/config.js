/* GET /api/auth/config — konfigurasi publik untuk halaman login.
   Client ID Google bersifat publik (memang tampil di browser); tidak ada rahasia di sini. */
module.exports = (req, res) => {
  res.status(200).json({ googleClientId: process.env.GOOGLE_CLIENT_ID || "" });
};
