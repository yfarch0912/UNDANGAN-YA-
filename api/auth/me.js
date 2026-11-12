/* GET  /api/auth/me — kembalikan profil pengguna dari cookie sesi (401 bila belum masuk
   atau bila sesi sudah dicabut lewat logout).
   POST /api/auth/me — action 'custom-request': simpan permintaan custom (menu Custom)
   milik pengguna yang sedang masuk. Menumpang fungsi ini karena jumlah fungsi
   serverless sudah mencapai batas paket (12/12) — jangan buat berkas fungsi baru. */
const crypto = require("crypto");
const { readSession } = require("../_lib/session");
const { isSessionRevoked, rateLimitCheck, saveCustomRequest } = require("../_lib/users");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 20000) req.destroy(); });
    req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

const JENIS_VALID = ["tema-baru", "modifikasi-tema", "tambah-fitur"];

function str(v) {
  if (typeof v === "string") return v.trim();
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function makeRef() {
  const d = new Date();
  const ymd = String(d.getFullYear()) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  return "CST-" + ymd + "-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

async function handleCustomRequest(req, res, s) {
  try {
    if (await rateLimitCheck("custom:" + s.email, 5, 60 * 60 * 1000)) {
      res.status(429).json({ error: "rate_limited" });
      return;
    }
    const body = await readBody(req);
    if (body.action !== undefined && body.action !== null && body.action !== "" && body.action !== "custom-request") {
      res.status(400).json({ error: "unknown_action" });
      return;
    }
    const nama = str(body.nama);
    const whatsapp = str(body.whatsapp).replace(/\D/g, "");
    const jenis = str(body.jenis);
    const temaAcuan = str(body.temaAcuan);
    const deskripsi = str(body.deskripsi);
    const budget = str(body.budget);

    const fields = [];
    if (nama.length < 2 || nama.length > 80) fields.push("nama");
    if (whatsapp.length < 9 || whatsapp.length > 15) fields.push("whatsapp");
    if (JENIS_VALID.indexOf(jenis) === -1) fields.push("jenis");
    if (temaAcuan.length > 80) fields.push("temaAcuan");
    if (deskripsi.length < 10 || deskripsi.length > 2000) fields.push("deskripsi");
    if (budget.length > 40) fields.push("budget");
    if (fields.length) {
      res.status(400).json({ error: "validation", fields: fields });
      return;
    }

    const record = {
      ref: makeRef(),
      email: s.email,
      akun: s.name || "",
      nama: nama,
      whatsapp: whatsapp,
      jenis: jenis,
      temaAcuan: temaAcuan || "",
      deskripsi: deskripsi,
      budget: budget || "",
      status: "baru",
      createdAt: new Date().toISOString(),
    };
    await saveCustomRequest(record);
    res.status(200).json({ ok: true, ref: record.ref });
  } catch (e) {
    res.status(500).json({ error: "server_error" });
  }
}

module.exports = async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const s = readSession(req);
  if (!s) { res.status(401).json({ error: "not_logged_in" }); return; }
  if (s.jti && (await isSessionRevoked(s.jti))) {
    res.status(401).json({ error: "session_revoked" });
    return;
  }
  if (req.method === "POST") {
    await handleCustomRequest(req, res, s);
    return;
  }
  res.status(200).json({ user: { email: s.email, name: s.name, picture: s.picture, provider: s.provider || "" } });
};
