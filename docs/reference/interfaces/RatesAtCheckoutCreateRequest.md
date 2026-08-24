[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / RatesAtCheckoutCreateRequest

# Interface: RatesAtCheckoutCreateRequest

Defined in: [resources/rates-at-checkout.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates-at-checkout.ts#L25)

Rates at Checkout has no reachable OpenAPI coverage (ROADMAP.md §2
"Coverage gap" — not one of the 9 resources with a mirrored spec).
Everything in this file is a best-effort typing derived from
cross-referencing method names across Shippo's official Python, JS, and
C# SDKs plus general REST/domain conventions. Treat every field below as
advisory, not verified.

This resource's scope is two things, not one — same callout as Group A's
Webhooks (ROADMAP.md §Stage 3): (1) `create`, which computes live
shippable rates for a business's own checkout flow without requiring a
full `Shipment` object to be created first, and (2) default-parcel-
template management (`getDefaultParcelTemplate` /
`updateDefaultParcelTemplate` / `deleteDefaultParcelTemplate`), which
configures the parcel `create` falls back to when called without an
explicit `parcel`. They're grouped in one file because they share the
`/rates_at_checkout` endpoint family, not because they're one concern.

## Properties

### address\_from?

> `optional` **address\_from?**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/rates-at-checkout.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates-at-checkout.ts#L27)

Existing address object ID, or an inline address. Best-effort — may default to the account's default address when omitted.

***

### address\_to

> **address\_to**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/rates-at-checkout.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates-at-checkout.ts#L29)

Existing address object ID, or an inline address.

***

### carrier\_accounts?

> `optional` **carrier\_accounts?**: `string`[]

Defined in: [resources/rates-at-checkout.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates-at-checkout.ts#L33)

Restrict quoting to these Carrier Account object IDs. Omit to quote across all connected carriers.

***

### parcel?

> `optional` **parcel?**: `string` \| [`ParcelCreateRequest`](ParcelCreateRequest.md)

Defined in: [resources/rates-at-checkout.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates-at-checkout.ts#L31)

Existing parcel object ID, or an inline parcel. Falls back to the default parcel template (see `getDefaultParcelTemplate`) when omitted — unconfirmed fallback behavior.
