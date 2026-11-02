"""Watcher pembayaran QRIS untuk UNDANGAN-YA! 3D — memakai repo QrisMerchantID.

Versi 2 (full):
- .env di folder ini dimuat otomatis (tidak perlu set env manual di Windows).
- Sesi login GoPay Merchant disimpan di .gopay-session.json — OTP hanya
  diminta saat sesi tidak ada/kedaluwarsa; refresh token dicoba lebih dulu.
- Mode DAEMON (default): memantau BANYAK order sekaligus dari orders.json.
  Tambah order:  python watcher_service.py --add QRIS-XXXX-AB12 299871
  Jalankan daemon: python watcher_service.py
- Mode SATU ORDER (lama): isi ORDER_ID + AMOUNT_IDR di .env, daemon akan
  memprioritaskan order itu lalu berhenti setelah lunas.

Alur: watcher login ke akun GoPay Merchant MILIK PEMILIK SENDIRI (library
QrisMerchantID), menunggu transaksi masuk bernominal unik order (harga +
kode unik), lalu mengirim callback HMAC ke {SITE_URL}/api/qris-webhook.

PERINGATAN (dari README repo sumber): QrisMerchantID adalah proyek riset
TIDAK RESMI — memakai API tidak resmi dapat melanggar Ketentuan Layanan
GoPay/GoBiz dan berisiko rate-limit / penangguhan akun. Pakai hanya untuk
akun merchant milikmu sendiri, atas risiko sendiri. Untuk jualan serius,
payment gateway resmi (Midtrans) tetap yang direkomendasikan.

Instalasi:  pip install QrisMerchantID httpx   (Python 3.10+)
"""

import hashlib
import hmac
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

BASE = Path(__file__).resolve().parent
ENV_FILE = BASE / ".env"
SESSION_FILE = BASE / ".gopay-session.json"
ORDERS_FILE = BASE / "orders.json"


# ---------------------------------------------------------------- .env ----
def load_dotenv() -> None:
    if not ENV_FILE.is_file():
        return
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def env(name: str, required: bool = True) -> str:
    value = os.environ.get(name, "").strip()
    if required and not value:
        raise SystemExit(f"Env {name} wajib diisi (di file .env folder ini)")
    return value


# ------------------------------------------------------------- callback ----
def send_paid_callback(site_url: str, secret: str, order_id: str, amount_idr: int, tx: dict) -> None:
    tx_id = str(tx.get("transaction_id") or tx.get("id") or tx.get("order_id") or "")
    message = f"{order_id}.{amount_idr}.{tx_id}".encode()
    signature = hmac.new(secret.encode(), message, hashlib.sha256).hexdigest()
    payload = json.dumps(
        {"orderId": order_id, "amount": amount_idr, "txId": tx_id, "provider": "gopay", "raw": tx}
    ).encode()
    req = urllib.request.Request(
        site_url.rstrip("/") + "/api/qris-webhook",
        data=payload,
        headers={"Content-Type": "application/json", "x-qris-signature": signature},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        print(f"Callback terkirim -> HTTP {resp.status}: {resp.read().decode()[:200]}")


# --------------------------------------------------------------- orders ----
def load_orders() -> list:
    if not ORDERS_FILE.is_file():
        return []
    try:
        data = json.loads(ORDERS_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except ValueError:
        return []


def save_orders(orders: list) -> None:
    ORDERS_FILE.write_text(json.dumps(orders, indent=2), encoding="utf-8")


def add_order(order_id: str, amount_idr: int) -> None:
    orders = load_orders()
    for o in orders:
        if o["orderId"] == order_id and o["status"] == "waiting":
            print(f"Order {order_id} sudah ada & masih menunggu.")
            return
        if o["status"] == "waiting" and o["amountIdr"] == amount_idr:
            print(f"PERINGATAN: nominal Rp{amount_idr:,} masih dipakai order menunggu {o['orderId']} "
                  "— dua order ber-nominal sama bisa tertukar!")
    orders.append({"orderId": order_id, "amountIdr": amount_idr,
                   "status": "waiting", "createdAt": int(time.time())})
    save_orders(orders)
    print(f"Order ditambahkan: {order_id} — Rp{amount_idr:,}")


def match_orders(new_txs: list, orders: list) -> list:
    """Pasangkan transaksi baru (gross_amount dalam SEN) ke order menunggu.
    Mengembalikan [(order, tx), ...] dan menandai order itu 'paid' di list."""
    matched = []
    for tx in new_txs:
        gross = tx.get("gross_amount")
        if not isinstance(gross, (int, float)):
            continue
        amount_idr = int(gross) // 100
        for o in orders:
            if o["status"] == "waiting" and o["amountIdr"] == amount_idr:
                o["status"] = "paid"
                matched.append((o, tx))
                break
    return matched


# -------------------------------------------------------------- session ----
def extract_session(raw: dict) -> dict:
    """Ambil access/refresh token dari bentuk respons login apa pun."""
    data = raw.get("data") if isinstance(raw.get("data"), dict) else raw
    return {
        "access_token": data.get("access_token") or raw.get("access_token"),
        "refresh_token": data.get("refresh_token") or raw.get("refresh_token"),
    }


def otp_login(gopay) -> dict:
    from qrismerchantid.core import token_cache
    phone = env("GOPAY_PHONE")
    otp_req = gopay.auth.login(method="otp", phone_number=phone)
    otp_code = input("Masukkan kode OTP yang dikirim ke HP merchant: ").strip()
    session = extract_session(gopay.auth.login(method="otp", otp=otp_code, otp_token=otp_req["otp_token"]))
    if not session["access_token"]:
        raise SystemExit("Login OTP tidak mengembalikan access_token — sesi tidak disimpan.")
    token_cache.save(SESSION_FILE, session)
    print("Login OTP berhasil, sesi disimpan (.gopay-session.json).")
    return session


def get_merchant_client():
    """Kembalikan GoPayMerchant yang sudah login (sesi cache -> refresh -> OTP)."""
    from qrismerchantid import GoPayMerchant
    from qrismerchantid.core import token_cache

    cached = token_cache.load(SESSION_FILE)
    if cached:
        gopay = GoPayMerchant(access_token=cached["access_token"],
                              refresh_token=cached.get("refresh_token"))
        try:
            gopay.merchants.search(size=1)  # validasi murah
            print("Sesi tersimpan masih valid.")
            return gopay
        except Exception as exc:
            print(f"Sesi tersimpan tidak valid ({exc.__class__.__name__}) — coba refresh…")
        try:
            session = extract_session(gopay.auth.refresh_session())
            if session["access_token"]:
                token_cache.save(SESSION_FILE, session)
                print("Sesi berhasil di-refresh.")
                return GoPayMerchant(access_token=session["access_token"],
                                     refresh_token=session.get("refresh_token"))
        except Exception as exc:
            print(f"Refresh gagal ({exc.__class__.__name__}) — login OTP ulang.")
    gopay = GoPayMerchant()
    otp_login(gopay)
    return gopay


def discover_merchant_id(gopay) -> str:
    merchant_id = env("MERCHANT_ID", required=False)
    if merchant_id:
        return merchant_id
    result = gopay.merchants.search(size=20)
    hits = result.get("hits") or result.get("merchants") or []
    ids = []
    for h in hits:
        mid = h.get("merchant_id") or h.get("id") or (h.get("_source") or {}).get("merchant_id")
        if mid:
            ids.append(str(mid))
    if len(ids) == 1:
        print(f"MERCHANT_ID ditemukan otomatis: {ids[0]}")
        return ids[0]
    if not ids:
        raise SystemExit("Tidak ada merchant ditemukan di akun ini. Isi MERCHANT_ID manual di .env.")
    raise SystemExit("Ada beberapa merchant di akun ini: " + ", ".join(ids) +
                     " — isi salah satunya sebagai MERCHANT_ID di .env.")


# --------------------------------------------------------------- daemon ----
def run_daemon(watcher, site_url: str, secret: str, single_order: dict | None = None,
                 poll_interval: float = 6.0, max_cycles: int | None = None) -> None:
    seeded = watcher.seed()
    print(f"Watcher aktif — {seeded} transaksi lama ditandai. Polling tiap {poll_interval:.0f} dtk. Ctrl+C untuk berhenti.")
    cycles = 0
    while True:
        cycles += 1
        orders = [single_order] if single_order else load_orders()
        waiting = [o for o in orders if o["status"] == "waiting"]
        if single_order and not waiting:
            return
        if waiting:
            new_txs = watcher.poll_once()
            for order, tx in match_orders(new_txs, orders):
                print(f"Pembayaran cocok: {order['orderId']} Rp{order['amountIdr']:,}")
                try:
                    send_paid_callback(site_url, secret, order["orderId"], order["amountIdr"], tx)
                except Exception as exc:
                    print(f"Callback GAGAL ({exc}) — order ditandai paid lokal; kirim ulang manual bila perlu.")
                if not single_order:
                    all_orders = load_orders()
                    for o in all_orders:
                        if o["orderId"] == order["orderId"]:
                            o["status"] = "paid"
                    save_orders(all_orders)
                if single_order:
                    return
        if max_cycles is not None and cycles >= max_cycles:
            return
        time.sleep(poll_interval)


def main() -> None:
    load_dotenv()
    if len(sys.argv) >= 2 and sys.argv[1] == "--add":
        if len(sys.argv) != 4:
            raise SystemExit("Pemakaian: python watcher_service.py --add ORDER_ID AMOUNT_IDR")
        add_order(sys.argv[2], int(sys.argv[3]))
        return

    try:
        import qrismerchantid  # noqa: F401
    except ImportError:
        raise SystemExit("Library belum terpasang: pip install QrisMerchantID httpx")

    site_url = env("SITE_URL")
    secret = env("QRIS_WEBHOOK_SECRET")

    order_id = env("ORDER_ID", required=False)
    amount = env("AMOUNT_IDR", required=False)
    single = {"orderId": order_id, "amountIdr": int(amount), "status": "waiting"} if order_id and amount else None

    gopay = get_merchant_client()
    merchant_id = discover_merchant_id(gopay)
    watcher = gopay.watch(merchant_id)
    if single:
        print(f"Mode satu order: menunggu {single['orderId']} Rp{single['amountIdr']:,} …")
    else:
        waiting = [o for o in load_orders() if o["status"] == "waiting"]
        print(f"Mode daemon: {len(waiting)} order menunggu di orders.json")
    run_daemon(watcher, site_url, secret, single_order=single)


if __name__ == "__main__":
    main()
