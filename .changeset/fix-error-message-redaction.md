---
"@richardmcquiston01/shippo-api": patch
---

`ShippoApiError.message` no longer serializes the response body. It now holds the status line, the request path without its query string, and a short (max 500 characters) `detail` or field-error summary; unrecognized bodies are never dumped, only arrays of strings are summarized as field errors, and fields named like credentials (`password`, `parameters`, `token`, ...) are omitted. The raw body is still on `error.body`. Network error messages also drop the query string. README updated to log `status`/`requestId` and treat `body` as sensitive. Fixes #44.
