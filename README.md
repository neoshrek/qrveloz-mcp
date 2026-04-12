# QrVeloz MCP Server

> Dynamic QR codes — create, retarget, and inspect from any AI assistant.  
> No account required to start.

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is QrVeloz?

QrVeloz is a dynamic QR code service. Unlike static QR codes, QrVeloz codes are **retargetable** — you print once and change the destination at any time without reprinting. Track every scan with real-time analytics, schedule automatic URL switches, and manage everything from your AI assistant via MCP.

**MCP Server URL:** `https://qrveloz.com/api/mcp`

No signup needed. Request an API key once and start creating codes immediately.

---

## Quick Start (30 seconds)

### 1 — Add the server to your AI client

See [`mcp-config-examples/`](mcp-config-examples/) for ready-to-paste configs:

| Client | Config file |
|--------|-------------|
| Claude Desktop (macOS / Linux) | [claude-desktop.json](mcp-config-examples/claude-desktop.json) |
| Claude Desktop (Windows) | [claude-desktop-windows.json](mcp-config-examples/claude-desktop-windows.json) |
| Claude Code | [claude-code.json](mcp-config-examples/claude-code.json) |
| Cursor | [cursor.json](mcp-config-examples/cursor.json) |
| Windsurf | [windsurf.json](mcp-config-examples/windsurf.json) |
| Cline | [cline.json](mcp-config-examples/cline.json) |

> **Claude Desktop on Windows:** use `claude-desktop-windows.json`. The standard `npx` command fails on Windows when Node.js is installed in `C:\Program Files` due to a path-with-spaces issue. The Windows config uses `cmd /c` to work around this.

### 2 — Get a free API token

No email or password required. In your AI assistant, say:

```
Use the QrVeloz MCP tool to request an API key
```

The token is shown **only once** — save it immediately.

> **Note:** There is a limit of one token request per IP per 24 hours to prevent abuse. If the call fails, wait 24 hours or sign up at [qrveloz.com](https://qrveloz.com) for a permanent account.

### 3 — Add the token to your client config

Replace `YOUR_API_KEY` in the config file with your token, then restart your AI client:

```
Authorization: Bearer qrv_...
```

### 4 — Create your first QR code

```
Use the QrVeloz MCP tool to create a QR code with the title "My first QR" pointing to https://example.com
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

*Anonymous `create_qr_code` returns an ephemeral QR image URL (not stored, not retargetable). Authenticated users get a permanent short URL and a `qr_image_url` pointing to the generated QR code.

---

### `request_api_key`

No parameters. Returns a 90-day token. Free accounts get up to 3 permanent codes.  
To make your account permanent, visit [qrveloz.com/claim](https://qrveloz.com/claim).

**Example prompt:**
```
Use the QrVeloz MCP tool to request an API key
```

---

### `create_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Human-readable label (1–200 chars) |
| `target_url` | string (URL) | Yes | Destination URL — must start with `https://` or `http://` |

**Example prompt:**
```
Use the QrVeloz MCP tool to create a QR code titled "Summer Sale" pointing to https://example.com/sale
```

---

### `get_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID from `create_qr_code` or `list_qr_codes` |
| `short_code` | string | One of | Short code from the redirect URL (e.g. `abc123`) |

**Example prompt:**
```
Use the QrVeloz MCP tool to get details for QR code with short code abc123
```

---

### `list_qr_codes`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page, max 50 (default: 20) |
| `include_images` | boolean | No | Include a `qr_image_url` for each code (forces limit ≤ 10) |

**Example prompt:**
```
Use the QrVeloz MCP tool to list all my QR codes
```

---

### `get_qr_scans`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | Yes | Internal UUID of the QR code |

**Example prompt:**
```
Use the QrVeloz MCP tool to get the scan count for QR code clxyz...
```

---

### `update_qr_target`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID |
| `short_code` | string | One of | Short code from the redirect URL |
| `target_url` | string (URL) | Yes | New destination URL |

> **Note:** PDF and audio QR codes cannot be updated via MCP. Manage those from the dashboard.

**Example prompt:**
```
Use the QrVeloz MCP tool to update QR code abc123 to point to https://example.com/new-page
```

---

### `delete_qr_code`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `qr_code_id` | string | One of | Internal UUID |
| `short_code` | string | One of | Short code from the redirect URL |
| `confirm_title` | string | Yes | Exact title of the QR code — must match character-for-character to prevent accidental deletions |

**Example prompt:**
```
Use the QrVeloz MCP tool to delete the QR code titled "Old Campaign"
```

---

### `get_account_info`

No parameters. Returns your current plan, feature flags, QR code usage, and remaining capacity. Useful for AI agents to check before attempting to create codes.

**Example prompt:**
```
Use the QrVeloz MCP tool to show my account info
```

---

## Authentication

| Mode | Header | Limits |
|------|--------|--------|
| Anonymous | *(none)* | 5 creates/min · 10/hr · 30/day · ephemeral only |
| Bearer token | `Authorization: Bearer qrv_...` | Plan-based permanent codes, 60 req/min |

Get a token instantly — no email required.  
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

## Troubleshooting

### The AI assistant doesn't recognise the tool name

Do not type tool names as function calls (e.g. `request_api_key()`). Use natural language instead:

> "Use the QrVeloz MCP tool to request an API key"

### Claude Desktop: `'C:\Program' is not recognized` (Windows)

This is a Windows path-with-spaces error. Node.js installed in `C:\Program Files` causes `cmd.exe` to fail when the path is not quoted.

**Fix:** use [`claude-desktop-windows.json`](mcp-config-examples/claude-desktop-windows.json) which uses `cmd /c` to avoid the issue.

### The MCP server is not connecting

1. Check the **hammer icon** (🔨) in the Claude Desktop chat input bar — it lists connected MCP servers and available tools. If QrVeloz is not listed, the server failed to connect.
2. Open Claude Desktop logs (`Help → Open Logs Folder`) and look for errors from the `qrveloz` server.
3. Make sure Node.js 18+ is installed: `node --version`
4. Make sure `npx` is available: `npx --version`
5. Try running the connection command manually in a terminal to see raw errors:
   - **macOS/Linux:** `npx -y mcp-remote https://qrveloz.com/api/mcp`
   - **Windows:** `npx -y mcp-remote https://qrveloz.com/api/mcp`

### Token was shown but I did not save it

Guest tokens cannot be recovered once the response is dismissed. Options:
- Wait 24 hours and call `request_api_key` again from the same IP
- Sign up at [qrveloz.com](https://qrveloz.com) for a permanent account with token management in the Settings dashboard

### Rate limit hit on `request_api_key`

One guest token is issued per IP per 24 hours to prevent abuse. If you hit the limit, wait 24 hours or create a free account at [qrveloz.com](https://qrveloz.com).

---

## Pricing

See [qrveloz.com/#pricing](https://qrveloz.com/#pricing) for current plan details and limits.

---

## License

MIT — see [LICENSE](LICENSE).
