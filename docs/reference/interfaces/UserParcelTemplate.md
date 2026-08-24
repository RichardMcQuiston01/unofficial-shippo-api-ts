[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / UserParcelTemplate

# Interface: UserParcelTemplate

Defined in: [resources/user-parcel-templates.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L16)

A reusable, user-created parcel preset (e.g. "my standard shipping box"),
distinct from `CarrierParcelTemplate` (`./carrier-parcel-templates`),
which is predefined by Shippo/the carrier and read-only.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): unlike
`Parcel` (`./parcels`), this resource's weight-unit field is named
`weight_unit`, not `mass_unit` — an earlier guess assumed the `Parcel`
naming applied here too, but `POST` with `mass_unit` set 400s live with
`"weight_unit: Weight unit must be specified if weight is specified."`.

## Properties

### distance\_unit?

> `optional` **distance\_unit?**: [`DistanceUnit`](../type-aliases/DistanceUnit.md)

Defined in: [resources/user-parcel-templates.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L22)

***

### height?

> `optional` **height?**: `string`

Defined in: [resources/user-parcel-templates.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L21)

***

### length?

> `optional` **length?**: `string`

Defined in: [resources/user-parcel-templates.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L19)

***

### name?

> `optional` **name?**: `string`

Defined in: [resources/user-parcel-templates.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L18)

***

### object\_created?

> `optional` **object\_created?**: `string`

Defined in: [resources/user-parcel-templates.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L25)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/user-parcel-templates.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L17)

***

### object\_updated?

> `optional` **object\_updated?**: `string`

Defined in: [resources/user-parcel-templates.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L26)

***

### weight?

> `optional` **weight?**: `string`

Defined in: [resources/user-parcel-templates.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L23)

***

### weight\_unit?

> `optional` **weight\_unit?**: [`MassUnit`](../type-aliases/MassUnit.md)

Defined in: [resources/user-parcel-templates.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L24)

***

### width?

> `optional` **width?**: `string`

Defined in: [resources/user-parcel-templates.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L20)
