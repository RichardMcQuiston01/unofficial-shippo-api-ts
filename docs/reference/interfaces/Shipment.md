[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Shipment

# Interface: Shipment

Defined in: [resources/shipments.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L18)

## Properties

### address\_from

> **address\_from**: [`Address`](Address.md)

Defined in: [resources/shipments.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L21)

***

### address\_return?

> `optional` **address\_return?**: [`Address`](Address.md)

Defined in: [resources/shipments.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L23)

***

### address\_to

> **address\_to**: [`Address`](Address.md)

Defined in: [resources/shipments.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L22)

***

### extra?

> `optional` **extra?**: [`ShipmentExtra`](../type-aliases/ShipmentExtra.md)

Defined in: [resources/shipments.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L27)

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/shipments.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L28)

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/shipments.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L29)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/shipments.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L19)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/shipments.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L30)

***

### parcels

> **parcels**: [`Parcel`](Parcel.md)[]

Defined in: [resources/shipments.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L24)

***

### rates?

> `optional` **rates?**: [`Rate`](Rate.md)[]

Defined in: [resources/shipments.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L26)

Populated once rates have been computed (synchronously, unless `async` was set).

***

### status

> **status**: [`ShipmentStatus`](../type-aliases/ShipmentStatus.md)

Defined in: [resources/shipments.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L20)
