[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierParcelTemplate

# Interface: CarrierParcelTemplate

Defined in: [resources/carrier-parcel-templates.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L16)

A Shippo/carrier-predefined parcel template (e.g. "USPS Small Flat Rate
Box") — read-only presets, distinct from `UserParcelTemplate`
(`./user-parcel-templates`), which a business creates itself.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
response uses `token` as the identifier (e.g. `"USPS_FlatRateEnvelope"`),
not `object_id`, and includes `is_variable_dimensions`. `object_id` is
kept as an optional field in case some carriers' entries include it, but
it wasn't observed live.

## Properties

### carrier?

> `optional` **carrier?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L20)

***

### distance\_unit?

> `optional` **distance\_unit?**: [`DistanceUnit`](../type-aliases/DistanceUnit.md)

Defined in: [resources/carrier-parcel-templates.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L25)

***

### height?

> `optional` **height?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L24)

***

### is\_variable\_dimensions?

> `optional` **is\_variable\_dimensions?**: `boolean`

Defined in: [resources/carrier-parcel-templates.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L21)

***

### length?

> `optional` **length?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L22)

***

### name?

> `optional` **name?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L19)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L17)

***

### token?

> `optional` **token?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L18)

***

### width?

> `optional` **width?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L23)
