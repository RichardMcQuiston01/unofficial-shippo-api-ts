[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShipmentCreateRequest

# Interface: ShipmentCreateRequest

Defined in: [resources/shipments.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L33)

## Properties

### address\_from

> **address\_from**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/shipments.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L35)

An existing address object ID, or inline data to create one.

***

### address\_return?

> `optional` **address\_return?**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/shipments.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L39)

An existing address object ID, or inline data to create one.

***

### address\_to

> **address\_to**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/shipments.ts:37](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L37)

An existing address object ID, or inline data to create one.

***

### async?

> `optional` **async?**: `boolean`

Defined in: [resources/shipments.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L45)

If true, rates are computed asynchronously rather than in the response.

***

### extra?

> `optional` **extra?**: [`ShipmentExtra`](../type-aliases/ShipmentExtra.md)

Defined in: [resources/shipments.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L42)

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/shipments.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L43)

***

### parcels

> **parcels**: (`string` \| [`ParcelCreateRequest`](ParcelCreateRequest.md))[]

Defined in: [resources/shipments.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L41)

Existing parcel object IDs, or inline data to create them.
