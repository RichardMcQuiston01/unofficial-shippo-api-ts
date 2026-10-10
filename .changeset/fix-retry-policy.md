---
"@richardmcquiston01/shippo-api": patch
---

Retries no longer repeat label purchases or ignore aborts. `POST`/`PATCH` are only retried on 429 (opt in to more with `retryNonIdempotent: true`), a caller `AbortSignal` fails the request immediately (including during backoff) instead of being retried, `Retry-After` and backoff delays are capped at 60 seconds, and `maxRetries`/`retryDelayMs`/`timeoutMs` are validated in the constructor. Fixes #39.
