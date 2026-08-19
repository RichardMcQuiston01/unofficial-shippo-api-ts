[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Shippo

# Class: Shippo

Defined in: [index.ts:136](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L136)

## Constructors

### Constructor

> **new Shippo**(`options`): `Shippo`

Defined in: [index.ts:167](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L167)

#### Parameters

##### options

[`ShippoClientOptions`](../interfaces/ShippoClientOptions.md)

#### Returns

`Shippo`

## Properties

### addresses

> `readonly` **addresses**: [`AddressesResource`](AddressesResource.md)

Defined in: [index.ts:146](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L146)

***

### batches

> `readonly` **batches**: [`BatchesResource`](BatchesResource.md)

Defined in: [index.ts:154](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L154)

***

### carrierAccounts

> `readonly` **carrierAccounts**: [`CarrierAccountsResource`](CarrierAccountsResource.md)

Defined in: [index.ts:160](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L160)

***

### carrierParcelTemplates

> `readonly` **carrierParcelTemplates**: [`CarrierParcelTemplatesResource`](CarrierParcelTemplatesResource.md)

Defined in: [index.ts:161](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L161)

***

### client

> `readonly` **client**: [`ShippoClient`](ShippoClient.md)

Defined in: [index.ts:144](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L144)

The underlying HTTP transport. Escape hatch for any endpoint not yet
wrapped in a typed resource method below — call
`shippo.client.request(...)` directly. The API token itself stays out
of reach: it's a true private field inside `ShippoClient`, so it never
shows up via `JSON.stringify` or `console.log` on either object.

***

### customsDeclarations

> `readonly` **customsDeclarations**: [`CustomsDeclarationsResource`](CustomsDeclarationsResource.md)

Defined in: [index.ts:156](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L156)

***

### customsItems

> `readonly` **customsItems**: [`CustomsItemsResource`](CustomsItemsResource.md)

Defined in: [index.ts:157](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L157)

***

### manifests

> `readonly` **manifests**: [`ManifestsResource`](ManifestsResource.md)

Defined in: [index.ts:158](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L158)

***

### orders

> `readonly` **orders**: [`OrdersResource`](OrdersResource.md)

Defined in: [index.ts:159](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L159)

***

### parcels

> `readonly` **parcels**: [`ParcelsResource`](ParcelsResource.md)

Defined in: [index.ts:147](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L147)

***

### pickups

> `readonly` **pickups**: [`PickupsResource`](PickupsResource.md)

Defined in: [index.ts:164](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L164)

***

### rates

> `readonly` **rates**: [`RatesResource`](RatesResource.md)

Defined in: [index.ts:149](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L149)

***

### ratesAtCheckout

> `readonly` **ratesAtCheckout**: [`RatesAtCheckoutResource`](RatesAtCheckoutResource.md)

Defined in: [index.ts:165](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L165)

***

### refunds

> `readonly` **refunds**: [`RefundsResource`](RefundsResource.md)

Defined in: [index.ts:155](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L155)

***

### serviceGroups

> `readonly` **serviceGroups**: [`ServiceGroupsResource`](ServiceGroupsResource.md)

Defined in: [index.ts:163](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L163)

***

### shipments

> `readonly` **shipments**: [`ShipmentsResource`](ShipmentsResource.md)

Defined in: [index.ts:148](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L148)

***

### tracking

> `readonly` **tracking**: [`TrackingResource`](TrackingResource.md)

Defined in: [index.ts:151](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L151)

***

### transactions

> `readonly` **transactions**: [`TransactionsResource`](TransactionsResource.md)

Defined in: [index.ts:150](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L150)

***

### userParcelTemplates

> `readonly` **userParcelTemplates**: [`UserParcelTemplatesResource`](UserParcelTemplatesResource.md)

Defined in: [index.ts:162](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L162)

***

### webhooks

> `readonly` **webhooks**: [`WebhooksResource`](WebhooksResource.md)

Defined in: [index.ts:153](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/index.ts#L153)
