"""
QrVeloz REST API — List all QR codes
Requires Python 3.8+ and the requests library: pip install requests

Usage:
    QRVELOZ_API_KEY=qrv_... python list_qr_codes.py
"""

import os
import sys
from datetime import datetime
import requests

API_BASE = "https://qrveloz.com/api/v1"
API_KEY  = os.environ.get("QRVELOZ_API_KEY")

if not API_KEY:
    print("Error: set QRVELOZ_API_KEY environment variable")
    sys.exit(1)


def list_qr_codes(page: int = 1, limit: int = 20) -> dict:
    response = requests.get(
        f"{API_BASE}/qr-codes",
        headers={"Authorization": f"Bearer {API_KEY}"},
        params={"page": page, "limit": limit},
    )
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    data = list_qr_codes()
    items = data["items"]
    total = data["total"]
    page  = data["page"]
    limit = data["limit"]

    print(f"QR codes (page {page}, showing {len(items)} of {total}):\n")

    for qr in items:
        created = datetime.fromisoformat(qr["createdAt"].replace("Z", "+00:00"))
        print(f"  {qr['title']}")
        print(f"    Short URL: https://qrveloz.com/r/{qr['shortCode']}")
        print(f"    Target:    {qr['targetUrl']}")
        print(f"    Active:    {qr['isActive']}")
        print(f"    Created:   {created.strftime('%Y-%m-%d')}")
        print()

    if total > limit:
        print(f"Showing {limit} of {total} total. Increase limit or increment page to see more.")
