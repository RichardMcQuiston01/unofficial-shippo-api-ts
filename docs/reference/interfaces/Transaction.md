[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Transaction

# Interface: Transaction

Defined in: [resources/transactions.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L11)

## Properties

### commercial\_invoice\_url?

> `optional` **commercial\_invoice\_url?**: `string`

Defined in: [resources/transactions.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L20)

URL to the commercial invoice, present for international shipments.

***

### label\_url?

> `optional` **label\_url?**: `string`

Defined in: [resources/transactions.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L18)

URL to the shipping label file (PDF/PNG/ZPL, per the request's `label_file_type`).

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/transactions.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L23)

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/transactions.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L24)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/transactions.ts:12](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L12)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/transactions.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L25)

***

### rate

> **rate**: `string`

Defined in: [resources/transactions.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L22)

Object ID of the rate this label was purchased for.

***

### status

> **status**: [`TransactionStatus`](../type-aliases/TransactionStatus.md)

Defined in: [resources/transactions.ts:13](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L13)

***

### tracking\_number?

> `optional` **tracking\_number?**: `string`

Defined in: [resources/transactions.ts:14](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L14)

***

### tracking\_status?

> `optional` **tracking\_status?**: [`TrackingStatusValue`](../type-aliases/TrackingStatusValue.md)

Defined in: [resources/transactions.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L16)

***

### tracking\_url\_provider?

> `optional` **tracking\_url\_provider?**: `string`

Defined in: [resources/transactions.ts:15](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/transactions.ts#L15)
