[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / OrderCreateRequest

# Interface: OrderCreateRequest

Defined in: [resources/orders.ts:56](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L56)

## Properties

### currency?

> `optional` **currency?**: `string`

Defined in: [resources/orders.ts:70](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L70)

***

### from\_address?

> `optional` **from\_address?**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/orders.ts:63](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L63)

An existing address object ID, or inline data to create one.

***

### line\_items?

> `optional` **line\_items?**: [`OrderLineItem`](OrderLineItem.md)[]

Defined in: [resources/orders.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L64)

***

### order\_number

> **order\_number**: `string`

Defined in: [resources/orders.ts:57](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L57)

***

### order\_status

> **order\_status**: [`OrderStatus`](../type-aliases/OrderStatus.md)

Defined in: [resources/orders.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L58)

***

### placed\_at

> **placed\_at**: `string`

Defined in: [resources/orders.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L59)

***

### shipping\_cost?

> `optional` **shipping\_cost?**: `string`

Defined in: [resources/orders.ts:65](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L65)

***

### shipping\_cost\_currency?

> `optional` **shipping\_cost\_currency?**: `string`

Defined in: [resources/orders.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L66)

***

### subtotal\_price?

> `optional` **subtotal\_price?**: `string`

Defined in: [resources/orders.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L67)

***

### to\_address

> **to\_address**: `string` \| [`AddressCreateRequest`](AddressCreateRequest.md)

Defined in: [resources/orders.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L61)

An existing address object ID, or inline data to create one.

***

### total\_price?

> `optional` **total\_price?**: `string`

Defined in: [resources/orders.ts:68](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L68)

***

### total\_tax?

> `optional` **total\_tax?**: `string`

Defined in: [resources/orders.ts:69](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L69)

***

### weight?

> `optional` **weight?**: `string`

Defined in: [resources/orders.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L71)

***

### weight\_unit?

> `optional` **weight\_unit?**: `string`

Defined in: [resources/orders.ts:72](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L72)
