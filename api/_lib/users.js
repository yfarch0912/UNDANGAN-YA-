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
  await blobPut(revokedPath(jti), JSON.stringify({ exp: exp || 0, revokedAt: new Date().toISOString() }));
}
async function isSessionRevoked(jti) {
  if (!jti) return false;
  try {
    const t = await blobGet(revokedPath(jti));
    return !!t;
  } catch (e) {
    /* Blob tak terjangkau: jangan kunci semua pengguna keluar.
       Pencabutan adalah lapisan tambahan; sesi tetap diverifikasi
       tanda tangan + kedaluwarsanya. */
    return false;
  }
}

module.exports = {
  configured, normalizeEmail, validEmail,
  getUser, putUser, createUser,
  hashPassword, verifyPassword,
  rateLimitCheck, rateLimitReset,
  revokeSession, isSessionRevoked,
};
