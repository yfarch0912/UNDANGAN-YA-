/* POST /api/create-transaction
   Buat transaksi Midtrans Snap (Sandbox secara default).

   Mode:
   - Jika env MIDTRANS_SERVER_KEY belum dipasang -> mode "simulated":
     tidak ada uang bergerak, frontend menampilkan popup pembayaran simulasi.
     Ini supaya demo bisa dicoba langsung tanpa akun Midtrans.
   - Jika MIDTRANS_SERVER_KEY dipasang -> transaksi Sandbox asli dibuat ke
     https://app.sandbox.midtrans.com/snap/v1/transactions dan token Snap
     dikembalikan ke frontend untuk dibuka dengan snap.pay().

   Keamanan:
   - Server Key HANYA dibaca dari environment variable, tidak pernah dikirim ke browser.
   - Harga diambil dari lib/pricing.js di server, bukan dari request browser.
*/
const { PACKAGES, THEME_SLUGS, resolvePackage } = require("./_lib/pricing");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

function sanitize(s, max) {
  return String(s || "").trim().slice(0, max || 100);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = await readBody(req);
  const pkg = resolvePackage(body.packageId);
  if (!pkg) {
    res.status(400).json({ error: "Paket tidak dikenal. Pilih Basic, Premium, Eksklusif, atau Luxury." });
    return;
  }

  const themeSlug = THEME_SLUGS.includes(body.themeSlug) ? body.themeSlug : "senja-emas";
  const name = sanitize(body.name, 80);
  const email = sanitize(body.email, 120);
  const phone = sanitize(body.phone, 30);
  const couple = sanitize(body.couple, 120);

  if (name.length < 3) { res.status(400).json({ error: "Nama pemesan minimal 3 karakter." }); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { res.status(400).json({ error: "Format email tidak valid." }); return; }

  const orderId = "UND3D-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  const grossAmount = pkg.price; // integer IDR, dari server

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.MIDTRANS_CLIENT_KEY || null;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

  // ---- Mode simulasi (demo tanpa key) ----
  if (!serverKey) {
    res.status(200).json({
      mode: "simulated",
      orderId,
      grossAmount,
      package: { id: pkg.id, name: pkg.name },
      themeSlug,
      simulatedToken: "SIM-" + orderId,
      note: "MIDTRANS_SERVER_KEY belum dipasang — tidak ada transaksi asli yang dibuat.",
    });
    return;
  }

  // ---- Mode Sandbox / Production asli ----
  const snapUrl = isProduction
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  const payload = {
    transaction_details: { order_id: orderId, gross_amount: grossAmount },
    item_details: [{
      id: pkg.id,
      price: pkg.price,
      quantity: 1,
      name: (pkg.name + " — tema " + themeSlug).slice(0, 50),
    }],
    customer_details: { first_name: name, email, phone: phone || undefined },
    callbacks: undefined,
    metadata: { theme_slug: themeSlug, couple: couple || undefined },
  };

  try {
    const resp = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from(serverKey + ":").toString("base64"),
      },
      body: JSON.stringify(payload),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok || !data.token) {
      console.error("Midtrans create-transaction gagal:", resp.status, JSON.stringify(data).slice(0, 500));
      res.status(502).json({ error: "Midtrans menolak pembuatan transaksi. Cek Server Key Sandbox di dashboard.", detail: data.error_messages || data.status_message || null });
      return;
    }
    res.status(200).json({
      mode: isProduction ? "production" : "sandbox",
      orderId,
      grossAmount,
      token: data.token,
      redirectUrl: data.redirect_url,
      clientKey,
    });
  } catch (err) {
    console.error("Midtrans fetch error:", err && err.message);
    res.status(502).json({ error: "Tidak bisa menghubungi Midtrans. Coba lagi sebentar." });
  }
};
