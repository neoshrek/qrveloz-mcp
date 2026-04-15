# Generic MCP Client Setup

Use these connection details to add QrVeloz to any AI client that supports HTTP MCP servers.

## Connection Details

| Property | Value |
|---|---|
| **Endpoint URL** | `https://qrveloz.com/api/mcp` |
| **Transport** | Streamable HTTP (stateless) |
| **MCP Protocol Version** | `2025-03-26` |
| **Auth Header** | `Authorization: Bearer YOUR_API_KEY` |

## Steps

1. In your client's MCP settings, add a new HTTP server pointing to `https://qrveloz.com/api/mcp`
2. Add the header `Authorization: Bearer YOUR_API_KEY`
3. If your client supports anonymous tool calls first, ask it to call `request_api_key` without a token to get a free API key — then update the header with the returned token
4. If your client requires a token upfront, get one at [qrveloz.com/settings](https://qrveloz.com/settings)

## Notes

- The server is **stateless** — no session ID or persistent connection is required
- Every request must include the `Authorization` header for authenticated tools
- `request_api_key` is the only tool that works without a token
- The server responds with Streamable HTTP (not SSE or WebSocket)
