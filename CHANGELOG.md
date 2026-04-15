# Changelog

All notable changes to the QrVeloz MCP server are documented here.

---

## [1.2.1] — 2026-04-15

### Documentation

- Clarified that `create_qr_code`, `get_qr_code`, `list_qr_codes`, and `get_qr_scans` return pre-formatted markdown tables, not JSON objects — updated README and SKILL.md with accurate example output
- Fixed anonymous `create_qr_code` description: the returned image is an ephemeral CDN URL, not a data URI
- Fixed `SKILL.md` examples to use natural language prompts instead of function-call syntax
- Rewrote `examples/js/get-scans.js`: restored valid `sort=scanCount&order=desc` params, removed broken `qr.scanCount` display (scan count is not returned in list responses — it is a relation aggregate; use the MCP `get_qr_scans` tool for per-code totals)
- Added clarification note to `openapi.yaml` `sort` parameter explaining that `scanCount` controls ordering only and is not included in response items
- Removed duplicate `[1.1.0]` changelog entry

---

## [1.2.0] — 2026-04-13

### Added

- `request_api_key` response now includes explicit `token_expires`, `qr_codes_deleted_after`, and `claim_account_url` fields so users know exactly when their QR codes will be permanently deleted (~180 days from issuance) and where to claim their account to prevent deletion
- `request_api_key` tool description updated to surface the deletion timeline upfront

---

## [1.1.0] — 2026-04-12

### Added

- `create_qr_code` now returns a `qr_image_url` field — a public CDN link to the generated QR PNG, usable directly in any browser or chat UI
- `get_qr_code` now returns a `qr_image_url` field (uses the branded image if already generated, otherwise a plain QR)
- `list_qr_codes` now always returns `qr_image_url` for every item, matching the field set of `get_qr_code` — no extra parameter needed

### Fixed

- Authentication error responses now include a structured JSON body with an `action` field that guides the AI client to call `request_api_key` immediately, rather than returning a terse plain-text error
- Windows Claude Desktop config (`claude-desktop-windows.json`) corrected to use `cmd /c npx` — previously the comment described the fix but the config itself still used plain `npx`, which fails when Node.js is installed in `C:\Program Files`

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
