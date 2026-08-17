[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Order

# Interface: Order

Defined in: [resources/orders.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L35)

## Properties

### currency?

> `optional` **currency?**: `string`

Defined in: [resources/orders.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L49)

***

### from\_address?

> `optional` **from\_address?**: [`Address`](Address.md)

Defined in: [resources/orders.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L42)

***

### line\_items?

> `optional` **line\_items?**: [`OrderLineItem`](OrderLineItem.md)[]

Defined in: [resources/orders.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L43)

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/orders.ts:52](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L52)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/orders.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L36)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/orders.ts:53](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L53)

***

### order\_number

> **order\_number**: `string`

Defined in: [resources/orders.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L38)

The merchant's own order identifier (not Shippo's `object_id`).

***

### order\_status

> **order\_status**: [`OrderStatus`](../type-aliases/OrderStatus.md)

Defined in: [resources/orders.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L39)

***

### placed\_at

> **placed\_at**: `string`

Defined in: [resources/orders.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L40)

***

### shipping\_cost?

> `optional` **shipping\_cost?**: `string`

Defined in: [resources/orders.ts:44](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L44)

***

### shipping\_cost\_currency?

> `optional` **shipping\_cost\_currency?**: `string`

Defined in: [resources/orders.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L45)

***

### subtotal\_price?

> `optional` **subtotal\_price?**: `string`

Defined in: [resources/orders.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L46)

***

### to\_address

> **to\_address**: [`Address`](Address.md)

Defined in: [resources/orders.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L41)

***

### total\_price?

> `optional` **total\_price?**: `string`

Defined in: [resources/orders.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L47)

***

### total\_tax?

> `optional` **total\_tax?**: `string`

Defined in: [resources/orders.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L48)

***

### weight?

> `optional` **weight?**: `string`

Defined in: [resources/orders.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L50)

***

### weight\_unit?

> `optional` **weight\_unit?**: `string`

Defined in: [resources/orders.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L51)
