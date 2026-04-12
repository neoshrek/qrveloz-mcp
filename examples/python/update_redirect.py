"""
QrVeloz REST API — Update where a QR code redirects
Requires Python 3.8+ and the requests library: pip install requests

Usage:
    QRVELOZ_API_KEY=qrv_... python update_redirect.py <qr-code-id> <new-url>

Example:
    QRVELOZ_API_KEY=qrv_... python update_redirect.py clxxx123 https://example.com/new-page
"""

import os
import sys
import requests

API_BASE = "https://qrveloz.com/api/v1"
API_KEY  = os.environ.get("QRVELOZ_API_KEY")

if not API_KEY:
    print("Error: set QRVELOZ_API_KEY environment variable")
    sys.exit(1)

if len(sys.argv) < 3:
    print("Usage: python update_redirect.py <qr-code-id> <new-url>")
    sys.exit(1)

qr_code_id = sys.argv[1]
new_url    = sys.argv[2]


def update_qr_code(qr_id: str, target_url: str) -> dict:
    response = requests.patch(
        f"{API_BASE}/qr-codes/{qr_id}",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        },
        json={"targetUrl": target_url},
    )
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    result = update_qr_code(qr_code_id, new_url)
    qr = result["qrCode"]

    print("QR code updated — no reprinting needed:")
    print(f"  ID:         {qr['id']}")
    print(f"  Short URL:  https://qrveloz.com/r/{qr['shortCode']}")
    print(f"  New target: {qr['targetUrl']}")
