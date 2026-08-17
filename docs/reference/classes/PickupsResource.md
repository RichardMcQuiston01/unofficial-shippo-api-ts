[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / PickupsResource

# Class: PickupsResource

Defined in: [resources/pickups.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L67)

## Constructors

### Constructor

> **new PickupsResource**(`client`): `PickupsResource`

Defined in: [resources/pickups.ts:68](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L68)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`PickupsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Pickup`](../interfaces/Pickup.md)\>

Defined in: [resources/pickups.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L71)

Requests a carrier pickup for one or more previously purchased transactions.

#### Parameters

##### request

[`PickupCreateRequest`](../interfaces/PickupCreateRequest.md)

#### Returns

`Promise`\<[`Pickup`](../interfaces/Pickup.md)\>
