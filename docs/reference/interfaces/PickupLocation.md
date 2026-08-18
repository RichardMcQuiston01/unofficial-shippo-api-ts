[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / PickupLocation

# Interface: PickupLocation

Defined in: [resources/pickups.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/pickups.ts#L25)

Where and how the carrier should collect the shipment(s). Best-effort
guess at the nested shape Shippo's API expects — `address` may accept
either an existing address object ID or an inline address to create,
mirroring the `address_from`/`address_to` pattern used elsewhere in the
API (e.g. Shipments), but this nesting itself is unconfirmed.

## Properties

### address

> **address**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/pickups.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/pickups.ts#L26)

***

### building\_location\_type?

> `optional` **building\_location\_type?**: `string`

Defined in: [resources/pickups.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/pickups.ts#L28)

e.g. "Front Door", "Reception" — carrier-specific free text, unconfirmed enum.

***

### instructions?

> `optional` **instructions?**: `string`

Defined in: [resources/pickups.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/pickups.ts#L30)

Free-text instructions for the driver, e.g. gate code or building access notes.
