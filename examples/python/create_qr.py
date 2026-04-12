"""
QrVeloz REST API — Create a QR code
Requires Python 3.8+ and the requests library: pip install requests

Usage:
    QRVELOZ_API_KEY=qrv_... python create_qr.py
"""

import os
import sys
import requests

API_BASE = "https://qrveloz.com/api/v1"
API_KEY  = os.environ.get("QRVELOZ_API_KEY")

if not API_KEY:
    print("Error: set QRVELOZ_API_KEY environment variable")
    print("Get a free key at https://qrveloz.com/settings or via the MCP request_api_key tool")
    sys.exit(1)


def create_qr_code(title: str, target_url: str) -> dict:
    response = requests.post(
        f"{API_BASE}/qr-codes",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        },
        json={"title": title, "targetUrl": target_url},
    )
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    result = create_qr_code(
        title="My Product Launch",
        target_url="https://example.com/launch",
    )
    qr = result["qrCode"]

    print("QR code created:")
    print(f"  ID:        {qr['id']}")
    print(f"  Short URL: https://qrveloz.com/r/{qr['shortCode']}")
    print(f"  Target:    {qr['targetUrl']}")
    print(f"  Image:     {qr.get('imageUrl')}")
    print()
    print("Print the short URL as a QR code. You can retarget it any time with update_redirect.py")
