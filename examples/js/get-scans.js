/**
 * QrVeloz REST API — List QR codes sorted by scan count (highest first)
 * Requires Node.js 18+ (uses native fetch)
 *
 * The list endpoint sorts by total scan count but does NOT return the count
 * per code in the response body. To get the exact scan count for a specific
 * code, use the MCP get_qr_scans tool or call GET /api/v1/qr-codes/{id}
 * and check the QrVeloz dashboard for full analytics.
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

console.log(`QR codes sorted by scan count (${total} total):\n`);

for (const qr of items) {
  const status = qr.isActive ? 'active' : 'inactive';
  console.log(`  ${qr.title.padEnd(30)}  ${qr.shortCode}  →  ${qr.targetUrl}  [${status}]`);
}

console.log('');
console.log('Note: scan counts are not included in the list response.');
console.log('Use the MCP get_qr_scans tool for per-code scan totals.');
