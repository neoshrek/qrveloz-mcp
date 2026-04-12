"""
QrVeloz REST API — Get scan counts for all QR codes
Requires Python 3.8+ and the requests library: pip install requests

Usage:
    QRVELOZ_API_KEY=qrv_... python get_scans.py
"""

import os
import sys
import requests

API_BASE = "https://qrveloz.com/api/v1"
API_KEY  = os.environ.get("QRVELOZ_API_KEY")

if not API_KEY:
    print("Error: set QRVELOZ_API_KEY environment variable")
    sys.exit(1)


def list_qr_codes_by_scans() -> dict:
    response = requests.get(
        f"{API_BASE}/qr-codes",
        headers={"Authorization": f"Bearer {API_KEY}"},
        params={"limit": 100, "sort": "scanCount", "order": "desc"},
    )
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    data  = list_qr_codes_by_scans()
    items = data["items"]
    total = data["total"]

    print(f"Scan summary ({total} QR codes, sorted by scan count):\n")

    for qr in items:
        scan_count = qr.get("scanCount") or 0
        bar = "█" * min(scan_count, 40)
        print(f"  {qr['title'][:30]:<30}  {scan_count:>6} scans  {bar}")
