[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ManifestCreateRequest

# Interface: ManifestCreateRequest

Defined in: [resources/manifests.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L36)

## Properties

### address\_from?

> `optional` **address\_from?**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/manifests.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L47)

An existing address object ID, or inline data to create one.

***

### carrier\_account

> **carrier\_account**: `string`

Defined in: [resources/manifests.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L38)

Object ID of the Carrier Account to generate the manifest for.

***

### shipment\_date

> **shipment\_date**: `string`

Defined in: [resources/manifests.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L40)

Date the manifest should cover.

***

### transactions?

> `optional` **transactions?**: `string`[]

Defined in: [resources/manifests.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L45)

Object IDs of the transactions to include. Omitting this may mean
"include everything for that carrier/date" -- not confirmed.
