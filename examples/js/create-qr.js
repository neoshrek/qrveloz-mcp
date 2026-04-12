/**
 * QrVeloz REST API — Create a QR code
 * Requires Node.js 18+ (uses native fetch)
 *
 * Usage:
 *   QRVELOZ_API_KEY=qrv_... node create-qr.js
 */

const API_BASE = 'https://qrveloz.com/api/v1';
const API_KEY  = process.env.QRVELOZ_API_KEY;

if (!API_KEY) {
  console.error('Error: set QRVELOZ_API_KEY environment variable');
  console.error('Get a free key at https://qrveloz.com/settings or via the MCP request_api_key tool');
  process.exit(1);
}

async function createQrCode({ title, targetUrl }) {
  const response = await fetch(`${API_BASE}/qr-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ title, targetUrl }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`${response.status}: ${error.error}`);
  }

  return response.json();
}

// Example usage
const { qrCode } = await createQrCode({
  title:     'My Product Launch',
  targetUrl: 'https://example.com/launch',
});

console.log('QR code created:');
console.log(`  ID:        ${qrCode.id}`);
console.log(`  Short URL: https://qrveloz.com/r/${qrCode.shortCode}`);
console.log(`  Target:    ${qrCode.targetUrl}`);
console.log(`  Image:     ${qrCode.imageUrl}`);
console.log('');
console.log('Print the short URL as a QR code. You can retarget it any time with update-redirect.js');
