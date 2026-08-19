[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierParcelTemplatesResource

# Class: CarrierParcelTemplatesResource

Defined in: [resources/carrier-parcel-templates.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L28)

## Constructors

### Constructor

> **new CarrierParcelTemplatesResource**(`client`): `CarrierParcelTemplatesResource`

Defined in: [resources/carrier-parcel-templates.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L29)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CarrierParcelTemplatesResource`

## Methods

### get()

> **get**(`token`): `Promise`\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>

Defined in: [resources/carrier-parcel-templates.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L54)

Retrieves a single carrier parcel template by its token (e.g.
`"USPS_FlatRateEnvelope"`).

**Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
`GET /parcel-templates/{token}`.

#### Parameters

##### token

`string`

#### Returns

`Promise`\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>\>

Defined in: [resources/carrier-parcel-templates.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-parcel-templates.ts#L39)

Retrieves a single page of carrier-predefined parcel templates.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
`GET /parcel-templates` — an earlier guess of `/carrier_parcel_templates`
404'd live. The envelope has no `count`/`next`/`previous`, just
`results`.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CarrierParcelTemplate`](../interfaces/CarrierParcelTemplate.md)\>\>
