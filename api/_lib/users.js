/* lib/users.js — Penyimpanan akun UndangYa! di Vercel Blob privat.
   Satu berkas JSON per pengguna: auth/users/<sha256(email)>.json
   Kata sandi: scrypt (node:crypto), tidak pernah disimpan polos.
   API Blob mengikuti pola resmi @vercel/blob (header x-api-version 13).
   Env yang dibutuhkan: BLOB_READ_WRITE_TOKEN. */
const crypto = require("crypto");

const API = "https://vercel.com/api/blob";

function token() { return process.env.BLOB_READ_WRITE_TOKEN || ""; }
function configured() { return !!token(); }
function storeId() { return (token().split("_")[3] || ""); }

function authHeaders(extra) {
  return Object.assign({
    authorization: "Bearer " + token(),
    "x-api-version": "13",
    "x-vercel-blob-store-id": storeId(),
  }, extra || {});
}

async function blobPut(pathname, text) {
  const res = await fetch(API + "/?pathname=" + encodeURIComponent(pathname), {
    method: "PUT",
    headers: authHeaders({
      "x-vercel-blob-access": "private",
      "x-add-random-suffix": "0",
      "x-allow-overwrite": "1",
      "x-content-type": "application/json",
    }),
    body: text,
  });
  if (!res.ok) throw new Error("blob put " + res.status);
  return res.json();
}

async function blobGet(pathname) {
  const url = "https://" + storeId() + ".private.blob.vercel-storage.com/" + pathname;
  const res = await fetch(url, { headers: { authorization: "Bearer " + token() } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("blob get " + res.status);
  return res.text();
}

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}
function validEmail(email) {
  return /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(normalizeEmail(email));
}
function userPath(email) { return "auth/users/" + sha256(normalizeEmail(email)) + ".json"; }

async function getUser(email) {
  const t = await blobGet(userPath(email));
  if (!t) return null;
  try { return JSON.parse(t); } catch (e) { return null; }
}

async function putUser(user) {
  await blobPut(userPath(user.email), JSON.stringify(user));
  return user;
}

async function createUser(fields) {
  const user = {
    name: fields.name || "",
    email: normalizeEmail(fields.email),
    passwordHash: fields.passwordHash || null,
    provider: fields.provider || "email",
    createdAt: new Date().toISOString(),
  };
  return putUser(user);
}

/* ---- Kata sandi: scrypt ---- */
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16);
    crypto.scrypt(String(password), salt, 64, { N: 16384, r: 8, p: 1 }, (err, key) => {
      if (err) return reject(err);
      resolve("scrypt$" + salt.toString("hex") + "$" + key.toString("hex"));
    });
  });
}
function verifyPassword(password, stored) {
  return new Promise((resolve) => {
    const parts = String(stored || "").split("$");
    if (parts.length !== 3 || parts[0] !== "scrypt") return resolve(false);
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    crypto.scrypt(String(password), salt, expected.length, { N: 16384, r: 8, p: 1 }, (err, key) => {
      if (err) return resolve(false);
      resolve(key.length === expected.length && crypto.timingSafeEqual(key, expected));
    });
  });
}

/* ---- Pembatas percobaan (rate limit) ----
   Penghitung disimpan di auth/ratelimit/<sha256(kunci)>.json = {count, windowStart}.
   Mengembalikan true bila kunci sudah melewati batas dalam jendela berjalan. */
async function rateLimitCheck(key, limit, windowMs) {
  const path = "auth/ratelimit/" + sha256(key) + ".json";
  const now = Date.now();
  let rec = null;
  const t = await blobGet(path);
  if (t) { try { rec = JSON.parse(t); } catch (e) { rec = null; } }
  if (!rec || now - rec.windowStart > windowMs) rec = { count: 0, windowStart: now };
  rec.count += 1;
  await blobPut(path, JSON.stringify(rec));
  return rec.count > limit;
}
async function rateLimitReset(key) {
  const path = "auth/ratelimit/" + sha256(key) + ".json";
  await blobPut(path, JSON.stringify({ count: 0, windowStart: Date.now() }));
}

/* ---- Daftar cabut sesi (deny-list) ----
   Token sesi bersifat stateless, jadi logout saja tidak cukup: token lama
   tetap lolos verifikasi tanda tangan. Setiap token membawa jti unik;
   saat logout, jti dicatat di auth/revoked/<jti>.json = {exp} dan
   /api/auth/me menolak jti yang tercantum. Token lama tanpa jti tidak
   dapat dicabut satu-satu dan kedaluwarsa sendiri (maks. 7 hari). */
function revokedPath(jti) { return "auth/revoked/" + String(jti) + ".json"; }
async function revokeSession(jti, exp) {
  if (!jti) return;
  const path = revokedPath(jti);
  await blobPut(path, JSON.stringify({ exp: exp || 0, revokedAt: new Date().toISOString() }));
  /* Confirm-read (keputusan user 2026-11-10: "perbaiki semua"; kambuh
     ke-5 pada audit 15:05 hari yang sama setelah 36 run bersih):
     propagasi baca-setelah-tulis Blob sesekali ±0,7–0,95 dtk — lebih
     lambat dari jendela retry isSessionRevoked (±550ms) — sehingga
     token yang baru dicabut sempat lolos sekali sebelum 401. Logout
     kini membaca-balik catatan cabut (jeda 150ms) sampai TERLIHAT,
     batas ±2 detik, sebelum membalas 200: begitu respons logout
     diterima, pencabutan dijamin sudah terbaca oleh /me. Bila batas
     tercapai tanpa terlihat (gangguan Blob luar biasa), logout TETAP
     dilanjutkan dan keadaan dicatat di log server — menggantung atau
     menggagalkan logout lebih buruk bagi pengguna; retry di
     isSessionRevoked tetap menjadi lapis kedua. */
  const deadline = Date.now() + 2000;
  for (;;) {
    try {
      const t = await blobGet(path);
      if (t) return;
    } catch (e) { /* belum terbaca / gangguan sesaat: tunggu lalu coba lagi sampai batas */ }
    const sisa = deadline - Date.now();
    if (sisa <= 0) break;
    await new Promise((r) => setTimeout(r, Math.min(150, sisa)));
  }
  console.error("[auth] confirm-read logout: catatan cabut " + String(jti) +
    " belum terlihat setelah ±2 dtk; logout tetap dilanjutkan (retry /me adalah lapis kedua).");
}
async function isSessionRevoked(jti) {
  if (!jti) return false;
  /* Baca dengan pengulangan (keputusan user 2026-11-06): gangguan sesaat
     di Blob — error baca maupun 404 semu sesaat setelah PUT logout —
     beberapa kali meloloskan token yang sudah dicabut (audit 2026-11-06
     09:05 & 21:05). Hingga 3 percobaan (jeda 150ms lalu 400ms); berhenti
     begitu catatan cabut ketemu. Gangguan yang teramati bersifat acak
     per-permintaan, jadi peluang lolos turun pangkat tiga.
     Tetap fail-open bila semua percobaan gagal: jangan kunci semua
     pengguna keluar. Pencabutan adalah lapisan tambahan; sesi tetap
     diverifikasi tanda tangan + kedaluwarsanya. */
  const delays = [0, 150, 400];
  for (let i = 0; i < delays.length; i++) {
    if (delays[i]) await new Promise((r) => setTimeout(r, delays[i]));
    try {
      const t = await blobGet(revokedPath(jti));
      if (t) return true;
    } catch (e) { /* coba lagi; fail-open hanya setelah percobaan terakhir */ }
  }
  return false;
}

/* ---- Token atur ulang kata sandi (lupa sandi) ----
   Token mentah (32 byte acak) HANYA ada di tautan email; yang disimpan
   di Blob adalah sha256-nya: auth/resets/<sha256(token)>.json =
   {email, exp, used}. Masa berlaku 1 jam, sekali pakai. Penunjuk token
   terakhir per pengguna (auth/reset-latest/<sha256(email)>.json) membuat
   permintaan baru membatalkan tautan lama. */
const RESET_TTL_MS = 60 * 60 * 1000;
function resetPath(tokenHash) { return "auth/resets/" + tokenHash + ".json"; }
function resetLatestPath(email) { return "auth/reset-latest/" + sha256(normalizeEmail(email)) + ".json"; }

async function createPasswordReset(email) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  try {
    const prev = await blobGet(resetLatestPath(email));
    if (prev) {
      const p = JSON.parse(prev);
      if (p && p.tokenHash && p.tokenHash !== tokenHash) {
        await blobPut(resetPath(p.tokenHash), JSON.stringify({ invalidated: true, exp: 0 }));
      }
    }
  } catch (e) { /* penunjuk lama tak terbaca: lanjut, token baru tetap terbit */ }
  await blobPut(resetPath(tokenHash), JSON.stringify({
    email: normalizeEmail(email),
    exp: Date.now() + RESET_TTL_MS,
    createdAt: new Date().toISOString(),
    used: false,
  }));
  await blobPut(resetLatestPath(email), JSON.stringify({ tokenHash: tokenHash }));
  return token;
}

async function consumePasswordReset(token, newPasswordHash) {
  if (!/^[a-f0-9]{64}$/.test(String(token || ""))) return null;
  const tokenHash = sha256(String(token));
  const t = await blobGet(resetPath(tokenHash));
  if (!t) return null;
  let rec;
  try { rec = JSON.parse(t); } catch (e) { return null; }
  if (!rec || rec.used || rec.invalidated || !rec.exp || Date.now() > rec.exp || !rec.email) return null;
  const user = await getUser(rec.email);
  if (!user) return null;
  user.passwordHash = newPasswordHash;
  await putUser(user);
  await blobPut(resetPath(tokenHash), JSON.stringify({
    used: true, usedAt: new Date().toISOString(), email: rec.email,
  }));
  return user;
}

module.exports = {
  configured, normalizeEmail, validEmail,
  getUser, putUser, createUser,
  hashPassword, verifyPassword,
  rateLimitCheck, rateLimitReset,
  revokeSession, isSessionRevoked,
  createPasswordReset, consumePasswordReset,
};
