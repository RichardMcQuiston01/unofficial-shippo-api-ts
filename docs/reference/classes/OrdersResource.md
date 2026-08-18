[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / OrdersResource

# Class: OrdersResource

Defined in: [resources/orders.ts:75](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/orders.ts#L75)

## Constructors

### Constructor

> **new OrdersResource**(`client`): `OrdersResource`

Defined in: [resources/orders.ts:76](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/orders.ts#L76)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`OrdersResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Order`](../interfaces/Order.md)\>

Defined in: [resources/orders.ts:79](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/orders.ts#L79)

Creates a new order representing an e-commerce order to be fulfilled.

#### Parameters

##### request

[`OrderCreateRequest`](../interfaces/OrderCreateRequest.md)

#### Returns

`Promise`\<[`Order`](../interfaces/Order.md)\>

***

### get()

> **get**(`orderId`): `Promise`\<[`Order`](../interfaces/Order.md)\>

Defined in: [resources/orders.ts:89](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/orders.ts#L89)

Retrieves a single order by its object ID.

#### Parameters

##### orderId

`string`

#### Returns

`Promise`\<[`Order`](../interfaces/Order.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Order`](../interfaces/Order.md)\>\>

Defined in: [resources/orders.ts:84](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/orders.ts#L84)

Retrieves a single page of previously created orders.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Order`](../interfaces/Order.md)\>\>
