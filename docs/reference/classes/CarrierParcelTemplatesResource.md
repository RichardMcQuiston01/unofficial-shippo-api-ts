[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierParcelTemplatesResource

# Class: CarrierParcelTemplatesResource

Defined in: [resources/carrier-parcel-templates.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L30)

## Constructors

### Constructor

> **new CarrierParcelTemplatesResource**(`client`): `CarrierParcelTemplatesResource`

Defined in: [resources/carrier-parcel-templates.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L31)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CarrierParcelTemplatesResource`

## Methods

### get()

> **get**(`carrierParcelTemplateId`): `Promise`\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>

Defined in: [resources/carrier-parcel-templates.ts:55](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L55)

Retrieves a single carrier parcel template by its ID.

**Unconfirmed / best effort**: endpoint path guessed, same caveats as
`list()`.

#### Parameters

##### carrierParcelTemplateId

`string`

#### Returns

`Promise`\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>\>

Defined in: [resources/carrier-parcel-templates.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L41)

Retrieves a single page of carrier-predefined parcel templates.

**Unconfirmed / best effort**: endpoint path guessed as
`GET /carrier_parcel_templates` — it's possible this is instead nested
under a specific carrier (e.g. `/carrier_parcel_templates/{carrier}`);
not confirmed by any reachable spec.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>\>
