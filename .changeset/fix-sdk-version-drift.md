---
"@richardmcquiston01/shippo-api": patch
---

Fix `SDK_VERSION` being hardcoded to `"0.0.0"` instead of reflecting the package's actual
published version. It's now derived directly from `package.json` at build time, so it can't
drift out of sync again.
