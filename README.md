# QrVeloz MCP Server

> Dynamic QR codes — create, retarget, and inspect from any AI assistant.  
> No account required to start.

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is QrVeloz?

QrVeloz is a dynamic QR code service. Unlike static QR codes, QrVeloz codes are **retargetable** — you print once and change the destination at any time without reprinting. Track every scan with real-time analytics, schedule automatic URL switches, and manage everything from your AI assistant via MCP.

**MCP Server URL:** `https://qrveloz.com/api/mcp`

No signup needed. Call `request_api_key` once and start creating codes immediately.

---

## Quick Start (30 seconds)

### 1 — Add the server to your AI client

See [`mcp-config-examples/`](mcp-config-examples/) for ready-to-paste configs:

| Client | Config file |
|--------|-------------|
| Claude Desktop | [claude-desktop.json](mcp-config-examples/claude-desktop.json) |
| Claude Code | [claude-code.json](mcp-config-examples/claude-code.json) |
| Cursor | [cursor.json](mcp-config-examples/cursor.json) |
| Windsurf | [windsurf.json](mcp-config-examples/windsurf.json) |
| Cline | [cline.json](mcp-config-examples/cline.json) |

### 2 — Get a free API token

No email or password required. In your AI assistant, call:

```
request_api_key()
```

The token is shown **only once** — save it.

### 3 — Add the token to your client config

Replace `YOUR_API_KEY` in the config file with your token:

```
Authorization: Bearer qrv_...
```

### 4 — Create your first QR code

```
create_qr_code(title="My first QR", target_url="https://example.com")
```

Your QR code is live at `https://qrveloz.com/r/{shortCode}`. Print it — you can change the destination any time.

---

## Tools Reference

| Tool | Auth | Description |
|------|------|-------------|
| `request_api_key` | None | Get a free 90-day API token. No signup. |
| `create_qr_code` | Optional* | Create a dynamic QR code. |
| `get_qr_code` | Required | Look up a QR code by ID or short code. |
| `list_qr_codes` | Required | List all your QR codes with short URLs and destinations. |
| `get_qr_scans` | Required | Get the total lifetime scan count for a QR code. |
| `update_qr_target` | Required | Change where a QR code redirects — no reprinting needed. |
| `delete_qr_code` | Required | Permanently delete a QR code and its scan history. |
| `get_account_info` | Required | Check your plan, usage, and remaining QR code capacity. |

*Anonymous `create_qr_code` returns an ephemeral data-URI image (not stored, not retargetable). Authenticated users get a permanent short URL.

---

### `request_api_key`

No parameters. Returns a 90-day token. Free accounts get up to 3 permanent codes.  
To make your account permanent, visit [qrveloz.com/claim](https://qrveloz.com/claim).

---

### `create_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Human-readable label (1–200 chars) |
| `target_url` | string (URL) | Yes | Destination URL — must start with `https://` or `http://` |

---

### `get_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID from `create_qr_code` or `list_qr_codes` |
| `short_code` | string | One of | Short code from the redirect URL (e.g. `abc123`) |

---

### `list_qr_codes`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page, max 50 (default: 20) |

---

### `get_qr_scans`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | Yes | Internal UUID of the QR code |

---

### `update_qr_target`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID |
| `short_code` | string | One of | Short code from the redirect URL |
| `target_url` | string (URL) | Yes | New destination URL |

> **Note:** PDF and audio QR codes cannot be updated via MCP. Manage those from the dashboard.

---

### `delete_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID |
| `short_code` | string | One of | Short code from the redirect URL |
| `confirm_title` | string | Yes | Exact title of the QR code — must match character-for-character to prevent accidental deletions |

---

### `get_account_info`

No parameters. Returns your current plan, feature flags, QR code usage, and remaining capacity. Useful for AI agents to check before attempting to create codes.

---

## Authentication

| Mode | Header | Limits |
|------|--------|--------|
| Anonymous | *(none)* | 5 creates/min · 10/hr · 30/day · ephemeral only |
| Bearer token | `Authorization: Bearer qrv_...` | Plan-based permanent codes, 60 req/min |

Get a token instantly via `request_api_key` — no email required.  
To claim a permanent account: [qrveloz.com/claim](https://qrveloz.com/claim)

---

## REST API

A full REST API is also available for direct HTTP integrations.

- Interactive docs: [qrveloz.com/docs/api](https://qrveloz.com/docs/api) ↗
- OpenAPI spec: [`openapi.yaml`](openapi.yaml)

---

## Examples

Ready-to-run scripts are in:

- [`examples/js/`](examples/js/) — Node.js 18+ (no dependencies, uses native `fetch`)
- [`examples/python/`](examples/python/) — Python 3.8+ (requires `requests`)

---

## Pricing

See [qrveloz.com/#pricing](https://qrveloz.com/#pricing) for current plan details and limits.

---

## License

MIT — see [LICENSE](LICENSE).
