@echo off
cd /d "%~dp0"
set /p OID="Order ID (contoh QRIS-XXXX-AB12): "
set /p AMT="Total unik order, angka saja (contoh 299871): "
python watcher_service.py --add %OID% %AMT%
pause
