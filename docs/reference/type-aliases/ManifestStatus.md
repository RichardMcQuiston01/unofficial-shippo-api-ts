[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ManifestStatus

# Type Alias: ManifestStatus

> **ManifestStatus** = `"WAITING"` \| `"QUEUED"` \| `"SUCCESS"` \| `"ERROR"`

Defined in: [resources/manifests.ts:15](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/manifests.ts#L15)

No OpenAPI spec was reachable for Manifests while building this package
(ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`, `get`)
are confirmed by cross-referencing Shippo's official Python/JS/C# SDKs.
A manifest is a well-established concept (end-of-day carrier pickup
document, e.g. a USPS SCAN form) but every field below is a best-effort
reconstruction, not verified against a primary source. `status` reuses
the `WAITING`/`QUEUED`/`SUCCESS`/`ERROR` pattern seen on `Shipment` and
`Transaction` by analogy, not confirmed for Manifests specifically.
