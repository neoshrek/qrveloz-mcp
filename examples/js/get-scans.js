/**
 * QrVeloz REST API — Get scan count for all QR codes
 * Requires Node.js 18+ (uses native fetch)
 *
 * Fetches your QR code list then prints each code's scan statistics.
 * The REST API returns total scans via the list endpoint.
 *
 * Usage:
 *   QRVELOZ_API_KEY=qrv_... node get-scans.js
 */

const API_BASE = 'https://qrveloz.com/api/v1';
const API_KEY  = process.env.QRVELOZ_API_KEY;

if (!API_KEY) {
  console.error('Error: set QRVELOZ_API_KEY environment variable');
  process.exit(1);
}

async function listQrCodes() {
  const response = await fetch(`${API_BASE}/qr-codes?limit=100&sort=scanCount&order=desc`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`${response.status}: ${error.error}`);
  }

  return response.json();
}

const { items, total } = await listQrCodes();

console.log(`Scan summary (${total} QR codes, sorted by scan count):\n`);

for (const qr of items) {
  const bar = '█'.repeat(Math.min(qr.scanCount ?? 0, 40));
  console.log(`  ${qr.title.padEnd(30)} ${String(qr.scanCount ?? 0).padStart(6)} scans  ${bar}`);
}
