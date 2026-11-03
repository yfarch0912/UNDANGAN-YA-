/* QRIS dinamis — port JavaScript dari modul gopay/qris.py di repo
   QrisMerchantID (AlfinAI, lisensi MIT — https://github.com/AlfinAI/QrisMerchantID).

   Fungsi murni EMVCo, tanpa jaringan & tanpa login:
   parse payload statis (TLV) -> suntik nominal ke tag 54 -> hitung ulang CRC16-CCITT.
   Sama persis dengan algoritma referensi di repo sumber (termasuk perilakunya
   yang TIDAK mengubah tag 01); hasil port ini diverifikasi byte-per-byte
   terhadap implementasi Python aslinya.
*/

function parse(payload) {
  const tags = [];
  let i = 0;
  while (i < payload.length) {
    if (i + 4 > payload.length) throw new Error("Truncated TLV header at offset " + i);
    const tag = payload.slice(i, i + 2);
    const lenStr = payload.slice(i + 2, i + 4);
    if (!/^\d+$/.test(lenStr)) throw new Error("Non-numeric TLV length '" + lenStr + "' at offset " + i);
    const n = parseInt(lenStr, 10);
    const value = payload.slice(i + 4, i + 4 + n);
    if (value.length !== n) throw new Error("Truncated TLV value for tag " + tag + " at offset " + i);
    tags.push([tag, value]);
    i += 4 + n;
  }
  return tags;
}

function getTag(payload, tagId) {
  for (const [tag, value] of parse(payload)) if (tag === tagId) return value;
  return null;
}

function crc16Ccitt(data) {
  let crc = 0xFFFF;
  for (let idx = 0; idx < data.length; idx++) {
    crc ^= (data.charCodeAt(idx) & 0xFF) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function injectAmount(staticPayload, amountIdr) {
  if (!Number.isInteger(amountIdr) || amountIdr <= 0) {
    throw new Error("amount_idr must be a positive int (rupiah, no decimals)");
  }
  let tags = parse(staticPayload).filter(([t]) => t !== "63");
  const amount = String(amountIdr);
  let replaced = false;
  tags = tags.map(([t, v]) => {
    if (t === "54" && !replaced) { replaced = true; return ["54", amount]; }
    return [t, v];
  });
  if (!replaced) {
    tags.push(["54", amount]);
    tags.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  }
  const body = tags.map(([t, v]) => t + String(v.length).padStart(2, "0") + v).join("") + "6304";
  return body + crc16Ccitt(body);
}

function tlv(tag, value) {
  return tag + String(value.length).padStart(2, "0") + value;
}

/* Payload QRIS statis CONTOH untuk mode demo — merchant fiktif "UNDANGAN-YA DEMO",
   akun merchant (tag 26) berisi nol, BUKAN akun asli siapa pun dan tidak bisa
   dipakai menerima uang. Hanya untuk menguji pembuatan QR dinamis + tampilannya.
   Mode live memakai payload statis asli milik user dari env QRIS_STATIC_PAYLOAD. */
function buildDemoStaticPayload() {
  const merchantAccount =
    tlv("00", "ID.CO.QRIS.WWW") +
    tlv("01", "0000000000000000000000") +
    tlv("02", "00000000") +
    tlv("03", "UMI");
  const body =
    tlv("00", "01") +
    tlv("01", "11") +
    tlv("26", merchantAccount) +
    tlv("52", "5734") +
    tlv("53", "360") +
    tlv("58", "ID") +
    tlv("59", "UNDANGAN-YA DEMO") +
    tlv("60", "JAKARTA") +
    tlv("61", "12120") +
    "6304";
  return body + crc16Ccitt(body);
}

function isValidCrc(payload) {
  if (!payload || payload.length < 4) return false;
  return crc16Ccitt(payload.slice(0, -4)) === payload.slice(-4).toUpperCase();
}

module.exports = { parse, getTag, crc16Ccitt, injectAmount, buildDemoStaticPayload, isValidCrc };
