[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / TrackingResource

# Class: TrackingResource

Defined in: [resources/tracking.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/tracking.ts#L42)

## Constructors

### Constructor

> **new TrackingResource**(`client`): `TrackingResource`

Defined in: [resources/tracking.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/tracking.ts#L43)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`TrackingResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`TrackingStatus`](../interfaces/TrackingStatus.md)\>

Defined in: [resources/tracking.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/tracking.ts#L46)

Registers a shipment for tracking, so Shippo starts polling the carrier for updates.

#### Parameters

##### request

[`TrackingCreateRequest`](../interfaces/TrackingCreateRequest.md)

#### Returns

`Promise`\<[`TrackingStatus`](../interfaces/TrackingStatus.md)\>

***

### get()

> **get**(`carrier`, `trackingNumber`): `Promise`\<[`TrackingStatus`](../interfaces/TrackingStatus.md)\>

Defined in: [resources/tracking.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/tracking.ts#L51)

Retrieves the current tracking status for a carrier + tracking number pair.

#### Parameters

##### carrier

`string`

##### trackingNumber

`string`

#### Returns

`Promise`\<[`TrackingStatus`](../interfaces/TrackingStatus.md)\>
