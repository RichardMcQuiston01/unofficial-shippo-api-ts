[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / TransactionsResource

# Class: TransactionsResource

Defined in: [resources/transactions.ts:37](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/transactions.ts#L37)

## Constructors

### Constructor

> **new TransactionsResource**(`client`): `TransactionsResource`

Defined in: [resources/transactions.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/transactions.ts#L38)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`TransactionsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Transaction`](../interfaces/Transaction.md)\>

Defined in: [resources/transactions.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/transactions.ts#L41)

Purchases a shipping label for the given rate.

#### Parameters

##### request

[`TransactionCreateRequest`](../interfaces/TransactionCreateRequest.md)

#### Returns

`Promise`\<[`Transaction`](../interfaces/Transaction.md)\>

***

### get()

> **get**(`transactionId`): `Promise`\<[`Transaction`](../interfaces/Transaction.md)\>

Defined in: [resources/transactions.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/transactions.ts#L51)

Retrieves a single transaction by its object ID.

#### Parameters

##### transactionId

`string`

#### Returns

`Promise`\<[`Transaction`](../interfaces/Transaction.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Transaction`](../interfaces/Transaction.md)\>\>

Defined in: [resources/transactions.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/transactions.ts#L46)

Retrieves a single page of previously purchased transactions (labels).

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Transaction`](../interfaces/Transaction.md)\>\>
