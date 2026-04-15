# Changelog

All notable changes to the QrVeloz MCP connector are documented here.

---

## [1.0.0] — 2026-04-15

Initial production release.

### MCP Tools

- `request_api_key` — get a free 90-day API token with no signup; one token per IP per 24 hours
- `create_qr_code` — create a dynamic QR code (anonymous or authenticated); authenticated users get a permanent short URL and pre-formatted output table
- `get_qr_code` — look up a QR code by internal ID or short code
- `list_qr_codes` — list all QR codes with pagination (max 20 per page)
- `get_qr_scans` — get total lifetime scan count for a QR code
- `update_qr_target` — retarget a QR code to a new URL without reprinting
- `delete_qr_code` — permanently delete a QR code (requires `confirm_title` safety confirmation)
- `get_account_info` — inspect current plan, feature flags, and QR code capacity

### Authentication

- Bearer token via `Authorization` header
- Guest tokens: free, 90-day expiry, up to 5 QR codes; codes permanently deleted ~90 days after token expiry
- Anonymous `create_qr_code`: ephemeral CDN image, not stored, not retargetable

### Rate Limits

- **No token:** Up to 30 ephemeral QR images per day. Images are not stored and cannot be retargeted. Call `request_api_key` for a free persistent token.
- **Guest or registered token:** Up to 5 stored QR codes (Free plan). All tools share a 60 requests/min limit per IP.

### Transport

- Stateless Streamable HTTP (MCP spec 2025-03-26 compliant)
- Endpoint: `https://qrveloz.com/api/mcp`

### Client Support

- Claude Desktop (macOS / Linux)
- Claude Desktop (Windows)
- Claude Code
- Cursor
- VS Code with GitHub Copilot
- Continue
- Generic HTTP MCP client guide
