/**
 * QrVeloz REST API — Update where a QR code redirects
 * Requires Node.js 18+ (uses native fetch)
 *
 * Usage:
 *   QRVELOZ_API_KEY=qrv_... node update-redirect.js <qr-code-id> <new-url>
 *
 * Example:
 *   QRVELOZ_API_KEY=qrv_... node update-redirect.js clxxx123 https://example.com/new-page
 */

const API_BASE = 'https://qrveloz.com/api/v1';
const API_KEY  = process.env.QRVELOZ_API_KEY;
const [,, qrCodeId, newUrl] = process.argv;

if (!API_KEY) {
  console.error('Error: set QRVELOZ_API_KEY environment variable');
  process.exit(1);
}

if (!qrCodeId || !newUrl) {
  console.error('Usage: node update-redirect.js <qr-code-id> <new-url>');
  process.exit(1);
}

async function updateQrCode(id, targetUrl) {
  const response = await fetch(`${API_BASE}/qr-codes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ targetUrl }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`${response.status}: ${error.error}`);
  }

  return response.json();
}

const { qrCode } = await updateQrCode(qrCodeId, newUrl);

console.log('QR code updated — no reprinting needed:');
console.log(`  ID:         ${qrCode.id}`);
console.log(`  Short URL:  https://qrveloz.com/r/${qrCode.shortCode}`);
console.log(`  New target: ${qrCode.targetUrl}`);
