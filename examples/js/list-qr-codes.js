/**
 * QrVeloz REST API — List all QR codes
 * Requires Node.js 18+ (uses native fetch)
 *
 * Usage:
 *   QRVELOZ_API_KEY=qrv_... node list-qr-codes.js
 */

const API_BASE = 'https://qrveloz.com/api/v1';
const API_KEY  = process.env.QRVELOZ_API_KEY;

if (!API_KEY) {
  console.error('Error: set QRVELOZ_API_KEY environment variable');
  process.exit(1);
}

async function listQrCodes({ page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams({ page, limit });
  const response = await fetch(`${API_BASE}/qr-codes?${params}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`${response.status}: ${error.error}`);
  }

  return response.json();
}

const { items, total, page, limit } = await listQrCodes();

console.log(`QR codes (page ${page}, showing ${items.length} of ${total}):\n`);

for (const qr of items) {
  console.log(`  ${qr.title}`);
  console.log(`    Short URL: https://qrveloz.com/r/${qr.shortCode}`);
  console.log(`    Target:    ${qr.targetUrl}`);
  console.log(`    Active:    ${qr.isActive}`);
  console.log(`    Created:   ${new Date(qr.createdAt).toLocaleDateString()}`);
  console.log('');
}

if (total > limit) {
  console.log(`Showing ${limit} of ${total} total. Pass { page: 2 } to see more.`);
}
