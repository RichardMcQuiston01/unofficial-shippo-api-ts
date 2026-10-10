---
"@richardmcquiston01/shippo-api": patch
---

Security: requests can no longer send the API token off the configured origin. `request()` and `paginate()` reject any URL whose scheme, host, or port differs from `baseUrl` (including `@host`/`.host` tricks and off-origin `next` links), `http://` base URLs are rejected except for loopback, and redirects are no longer followed. Resource IDs, carrier codes, and tracking numbers are now percent-encoded per path segment (`.`/`..` and empty segments are rejected). `paginate()` now ends on a missing or empty `next`, treats `null`/missing `results` as an empty page, and throws a `ShippoError` on a repeated page URL instead of looping. Fixes #38, #40, #43.
