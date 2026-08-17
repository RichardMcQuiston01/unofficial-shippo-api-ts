---
"@richardmcquiston01/shippo-api": minor
---

Initial release: a framework-agnostic TypeScript client for Shippo's shipping API.

Covers all 19 in-scope resources (Addresses, Parcels, Shipments, Rates, Transactions,
Tracking, Webhooks + inbound event parsing, Batches, Refunds, Customs Declarations, Customs
Items, Manifests, Orders, Carrier Accounts, Carrier/User Parcel Templates, Service Groups,
Pickups, Rates at Checkout) behind a single `Shippo` client, with dual ESM/CJS output, a typed
error hierarchy (`ShippoApiError` / `ShippoNetworkError`), automatic retry/backoff, pagination
helpers, generated per-resource API reference (`docs/reference/`), and runnable examples
covering address validation, the shipment-to-label happy path, tracking, and inbound webhook
handling. See `README.md` and `ROADMAP.md` for full details and known field-level caveats.
