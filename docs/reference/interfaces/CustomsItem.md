[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsItem

# Interface: CustomsItem

Defined in: [resources/customs-items.ts:13](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L13)

No OpenAPI spec was reachable for Customs Items while building this
package (ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`,
`get`) are confirmed by cross-referencing Shippo's official Python/JS/C#
SDKs, but every field below is a best-effort reconstruction from general
knowledge of customs-declaration data for international shipping, not
verified against a primary source. Treat the whole shape as advisory.

## Properties

### description

> **description**: `string`

Defined in: [resources/customs-items.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L16)

What the item is, for customs purposes.

***

### mass\_unit

> **mass\_unit**: [`MassUnit`](../type-aliases/MassUnit.md)

Defined in: [resources/customs-items.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L20)

***

### net\_weight

> **net\_weight**: `string`

Defined in: [resources/customs-items.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L19)

String-typed weight, matching the pattern already used on `Parcel`.

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/customs-items.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L30)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/customs-items.ts:14](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L14)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/customs-items.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L31)

***

### origin\_country

> **origin\_country**: `string`

Defined in: [resources/customs-items.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L26)

ISO 3166-1 alpha-2 country code the item originates from.

***

### quantity

> **quantity**: `number`

Defined in: [resources/customs-items.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L17)

***

### sku\_code?

> `optional` **sku\_code?**: `string`

Defined in: [resources/customs-items.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L29)

***

### tariff\_number?

> `optional` **tariff\_number?**: `string`

Defined in: [resources/customs-items.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L28)

HS tariff code, if provided.

***

### value\_amount

> **value\_amount**: `string`

Defined in: [resources/customs-items.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L22)

Declared value of the item, as a decimal string.

***

### value\_currency

> **value\_currency**: `string`

Defined in: [resources/customs-items.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L24)

ISO 4217 currency code.
