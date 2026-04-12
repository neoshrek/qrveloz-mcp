---
name: qrveloz
display_name: QrVeloz — Dynamic QR Codes
description: Create, retarget, and inspect dynamic QR codes from any AI assistant. No account required to start.
version: 1.0.0
author: Neoshrek
homepage: https://qrveloz.com
mcp_server: https://qrveloz.com/api/mcp
tags: [qr-codes, marketing, redirects, analytics, productivity]
---

# QrVeloz Skill

This skill connects to the QrVeloz MCP server, enabling you to create and manage dynamic QR codes without leaving your AI assistant.

## Setup

### 1. Add the MCP server

Add the following to your MCP client configuration:

**HTTP clients (Cursor, Windsurf, Cline, Claude Code):**
```json
{
  "mcpServers": {
    "qrveloz": {
      "type": "http",
      "url": "https://qrveloz.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

**Claude Desktop (via mcp-remote):**
```json
{
  "mcpServers": {
    "qrveloz": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://qrveloz.com/api/mcp",
               "--header", "Authorization: Bearer YOUR_API_KEY"]
    }
  }
}
```

### 2. Get a free API token

No email required. In your AI assistant:

```
request_api_key()
```

Replace `YOUR_API_KEY` in your config with the returned token.

---

## What You Can Do

### Create a QR code
```
create_qr_code(title="Product launch", target_url="https://example.com/launch")
```

### Change where it points — no reprinting
```
update_qr_target(short_code="abc123", target_url="https://example.com/new-page")
```

### Check scan analytics
```
get_qr_scans(qr_code_id="clxxx...")
```

### List all your codes
```
list_qr_codes()
```

### List codes with QR image URLs
```
list_qr_codes(include_images=true)
```

### Check your plan and remaining capacity
```
get_account_info()
```

---

## Available Tools

| Tool | Auth Required | Purpose |
|------|---------------|---------|
| `request_api_key` | No | Get a free token — no signup |
| `create_qr_code` | Optional | Create a dynamic QR code |
| `get_qr_code` | Yes | Look up a code by ID or short code |
| `list_qr_codes` | Yes | List all codes |
| `get_qr_scans` | Yes | Get scan count |
| `update_qr_target` | Yes | Retarget without reprinting |
| `delete_qr_code` | Yes | Delete a code permanently |
| `get_account_info` | Yes | Plan and usage info |

---

## Pricing

See [qrveloz.com/#pricing](https://qrveloz.com/#pricing) for current plan details.

## Claim Your Account

Free tokens expire after 90 days but your QR codes don't have to. Visit [qrveloz.com/claim](https://qrveloz.com/claim) to link an email and make your account permanent.
