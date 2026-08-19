---
"@richardmcquiston01/shippo-api": minor
---

Fix contract mismatches surfaced by running the live-contract suite (`bun run test:live`)
against a real Shippo test-mode account for the first time (ROADMAP.md Stage 5):

- `UserParcelTemplatesResource` and `CarrierParcelTemplatesResource` used guessed, incorrect
  paths (`/user_parcel_templates`, `/carrier_parcel_templates`) that 404 live. Corrected to
  `/user-parcel-templates` and `/parcel-templates`.
- `ServiceGroupsResource` had the same path bug (`/service_groups` → `/service-groups`), plus
  a second issue: its `list()` response is a bare JSON array, not a paginated envelope —
  `list()` no longer takes a `ListQuery` and now returns `ServiceGroup[]` directly.
- `UserParcelTemplate`'s weight-unit field is `weight_unit`, not `mass_unit` as guessed by
  analogy to `Parcel` — `create()`/`update()` 400 live otherwise.
- `AddressesResource#validate()`'s doc comment now reflects that the returned `Address` can
  have a different `object_id` than the one passed in.
- Added `UnconfirmedPaginatedList<T>` (exported from the package root) for the no-spec
  resources whose `list()` envelope doesn't reliably include `count`/`next`/`previous` and can
  return `results: null` instead of `[]` when empty, replacing the stricter `PaginatedList<T>`
  on those resources' `list()` return types.
