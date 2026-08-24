[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / RatesResource

# Class: RatesResource

Defined in: [resources/rates.ts:37](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates.ts#L37)

## Constructors

### Constructor

> **new RatesResource**(`client`): `RatesResource`

Defined in: [resources/rates.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates.ts#L38)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`RatesResource`

## Methods

### get()

> **get**(`rateId`): `Promise`\<[`Rate`](../interfaces/Rate.md)\>

Defined in: [resources/rates.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates.ts#L41)

Retrieves a single previously-computed rate by its object ID.

#### Parameters

##### rateId

`string`

#### Returns

`Promise`\<[`Rate`](../interfaces/Rate.md)\>

***

### listForShipment()

> **listForShipment**(`shipmentId`): `Promise`\<[`RateList`](../interfaces/RateList.md)\>

Defined in: [resources/rates.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates.ts#L46)

Retrieves all rates computed for a shipment.

#### Parameters

##### shipmentId

`string`

#### Returns

`Promise`\<[`RateList`](../interfaces/RateList.md)\>

***

### listForShipmentByCurrency()

> **listForShipmentByCurrency**(`shipmentId`, `currencyCode`): `Promise`\<[`RateList`](../interfaces/RateList.md)\>

Defined in: [resources/rates.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/rates.ts#L51)

Retrieves a shipment's rates converted to the given ISO 4217 currency code.

#### Parameters

##### shipmentId

`string`

##### currencyCode

`string`

#### Returns

`Promise`\<[`RateList`](../interfaces/RateList.md)\>
