# Changelog

All notable changes to the QrVeloz MCP server are documented here.

---

## [1.0.0] — 2026-04-11

### Added

- `request_api_key` — get a free 90-day API token with no signup
- `create_qr_code` — create a dynamic QR code (anonymous or authenticated)
- `get_qr_code` — look up a QR code by ID or short code
- `list_qr_codes` — list all QR codes with pagination
- `get_qr_scans` — get total lifetime scan count for a QR code
- `update_qr_target` — retarget a QR code to a new URL without reprinting
- `delete_qr_code` — permanently delete a QR code (requires `confirm_title` safety check)
- `get_account_info` — inspect current plan, feature flags, and QR code capacity
- Anonymous rate limiting: 5 creates/min · 10/hr · 30/day
- Authenticated rate limiting: 60 requests/min per IP (all tools)
- Bearer token authentication via `Authorization` header
- Stateless Streamable HTTP transport (MCP spec compliant)
