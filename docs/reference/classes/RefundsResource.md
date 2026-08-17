[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / RefundsResource

# Class: RefundsResource

Defined in: [resources/refunds.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/refunds.ts#L22)

## Constructors

### Constructor

> **new RefundsResource**(`client`): `RefundsResource`

Defined in: [resources/refunds.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/refunds.ts#L23)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`RefundsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Refund`](../interfaces/Refund.md)\>

Defined in: [resources/refunds.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/refunds.ts#L31)

Requests a refund for a previously purchased label (transaction).

#### Parameters

##### request

[`RefundCreateRequest`](../interfaces/RefundCreateRequest.md)

#### Returns

`Promise`\<[`Refund`](../interfaces/Refund.md)\>

***

### get()

> **get**(`refundId`): `Promise`\<[`Refund`](../interfaces/Refund.md)\>

Defined in: [resources/refunds.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/refunds.ts#L36)

Retrieves a single refund by its object ID.

#### Parameters

##### refundId

`string`

#### Returns

`Promise`\<[`Refund`](../interfaces/Refund.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Refund`](../interfaces/Refund.md)\>\>

Defined in: [resources/refunds.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/refunds.ts#L26)

Retrieves a single page of previously requested refunds.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Refund`](../interfaces/Refund.md)\>\>
