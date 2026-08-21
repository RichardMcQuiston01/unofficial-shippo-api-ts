[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / PickupsResource

# Class: PickupsResource

Defined in: [resources/pickups.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L67)

## Constructors

### Constructor

> **new PickupsResource**(`client`): `PickupsResource`

Defined in: [resources/pickups.ts:68](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L68)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`PickupsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Pickup`](../interfaces/Pickup.md)\>

Defined in: [resources/pickups.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L71)

Requests a carrier pickup for one or more previously purchased transactions.

#### Parameters

##### request

[`PickupCreateRequest`](../interfaces/PickupCreateRequest.md)

#### Returns

`Promise`\<[`Pickup`](../interfaces/Pickup.md)\>
