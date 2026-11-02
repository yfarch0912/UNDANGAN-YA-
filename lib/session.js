/* lib/session.js — Sesi login UndangYa!
   Cookie sesi = payload base64url + tanda tangan HMAC-SHA256.
   Kunci tanda tangan HANYA dari env AUTH_SECRET (tidak pernah ke browser).
   Tanpa database: sesi bersifat stateless, masa berlaku 7 hari. */
const crypto = require("crypto");

const COOKIE_NAME = "uy_session";
const MAX_AGE_S = 7 * 24 * 60 * 60;

function secret() {
  return process.env.AUTH_SECRET || "";
}
function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64url(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return Buffer.from(s, "base64");
}
function sign(payloadObj) {
  const payload = b64url(JSON.stringify(payloadObj));
  const mac = crypto.createHmac("sha256", secret()).update(payload).digest();
  return payload + "." + b64url(mac);
}
function verify(token) {
  if (!token || typeof token !== "string" || !secret()) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, mac] = parts;
  const expect = crypto.createHmac("sha256", secret()).update(payload).digest();
  let got;
  try { got = unb64url(mac); } catch (e) { return null; }
  if (got.length !== expect.length || !crypto.timingSafeEqual(got, expect)) return null;
  let obj;
  try { obj = JSON.parse(unb64url(payload).toString("utf8")); } catch (e) { return null; }
  if (!obj || !obj.exp || Date.now() / 1000 > obj.exp) return null;
  return obj;
}
function readSession(req) {
  const raw = (req.headers && req.headers.cookie) || "";
  const m = raw.match(new RegExp("(?:^|;\\s*)" + COOKIE_NAME + "=([^;]+)"));
  return m ? verify(decodeURIComponent(m[1])) : null;
}
function sessionCookie(token) {
  return COOKIE_NAME + "=" + encodeURIComponent(token) +
    "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=" + MAX_AGE_S;
}
function clearCookie() {
  return COOKIE_NAME + "=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
}
function issueSession(user) {
  const now = Math.floor(Date.now() / 1000);
  return sign({
    sub: user.sub, email: user.email, name: user.name || "", picture: user.picture || "",
    provider: user.provider || "",
    iat: now, exp: now + MAX_AGE_S
  });
}

module.exports = { COOKIE_NAME, MAX_AGE_S, readSession, sessionCookie, clearCookie, issueSession };
