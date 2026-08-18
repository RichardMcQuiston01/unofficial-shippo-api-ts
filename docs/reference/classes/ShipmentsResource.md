[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShipmentsResource

# Class: ShipmentsResource

Defined in: [resources/shipments.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L48)

## Constructors

### Constructor

> **new ShipmentsResource**(`client`): `ShipmentsResource`

Defined in: [resources/shipments.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L49)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ShipmentsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Shipment`](../interfaces/Shipment.md)\>

Defined in: [resources/shipments.ts:52](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L52)

Creates a shipment from a from/to address and one or more parcels, computing rates.

#### Parameters

##### request

[`ShipmentCreateRequest`](../interfaces/ShipmentCreateRequest.md)

#### Returns

`Promise`\<[`Shipment`](../interfaces/Shipment.md)\>

***

### get()

> **get**(`shipmentId`): `Promise`\<[`Shipment`](../interfaces/Shipment.md)\>

Defined in: [resources/shipments.ts:62](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L62)

Retrieves a single shipment by its object ID.

#### Parameters

##### shipmentId

`string`

#### Returns

`Promise`\<[`Shipment`](../interfaces/Shipment.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Shipment`](../interfaces/Shipment.md)\>\>

Defined in: [resources/shipments.ts:57](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/shipments.ts#L57)

Retrieves a single page of previously created shipments.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Shipment`](../interfaces/Shipment.md)\>\>
