[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Shippo

# Class: Shippo

Defined in: [index.ts:133](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L133)

## Constructors

### Constructor

> **new Shippo**(`options`): `Shippo`

Defined in: [index.ts:164](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L164)

#### Parameters

##### options

[`ShippoClientOptions`](../interfaces/ShippoClientOptions.md)

#### Returns

`Shippo`

## Properties

### addresses

> `readonly` **addresses**: [`AddressesResource`](AddressesResource.md)

Defined in: [index.ts:143](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L143)

***

### batches

> `readonly` **batches**: [`BatchesResource`](BatchesResource.md)

Defined in: [index.ts:151](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L151)

***

### carrierAccounts

> `readonly` **carrierAccounts**: [`CarrierAccountsResource`](CarrierAccountsResource.md)

Defined in: [index.ts:157](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L157)

***

### carrierParcelTemplates

> `readonly` **carrierParcelTemplates**: [`CarrierParcelTemplatesResource`](CarrierParcelTemplatesResource.md)

Defined in: [index.ts:158](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L158)

***

### client

> `readonly` **client**: [`ShippoClient`](ShippoClient.md)

Defined in: [index.ts:141](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L141)

The underlying HTTP transport. Escape hatch for any endpoint not yet
wrapped in a typed resource method below — call
`shippo.client.request(...)` directly. The API token itself stays out
of reach: it's a true private field inside `ShippoClient`, so it never
shows up via `JSON.stringify` or `console.log` on either object.

***

### customsDeclarations

> `readonly` **customsDeclarations**: [`CustomsDeclarationsResource`](CustomsDeclarationsResource.md)

Defined in: [index.ts:153](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L153)

***

### customsItems

> `readonly` **customsItems**: [`CustomsItemsResource`](CustomsItemsResource.md)

Defined in: [index.ts:154](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L154)

***

### manifests

> `readonly` **manifests**: [`ManifestsResource`](ManifestsResource.md)

Defined in: [index.ts:155](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L155)

***

### orders

> `readonly` **orders**: [`OrdersResource`](OrdersResource.md)

Defined in: [index.ts:156](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L156)

***

### parcels

> `readonly` **parcels**: [`ParcelsResource`](ParcelsResource.md)

Defined in: [index.ts:144](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L144)

***

### pickups

> `readonly` **pickups**: [`PickupsResource`](PickupsResource.md)

Defined in: [index.ts:161](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L161)

***

### rates

> `readonly` **rates**: [`RatesResource`](RatesResource.md)

Defined in: [index.ts:146](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L146)

***

### ratesAtCheckout

> `readonly` **ratesAtCheckout**: [`RatesAtCheckoutResource`](RatesAtCheckoutResource.md)

Defined in: [index.ts:162](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L162)

***

### refunds

> `readonly` **refunds**: [`RefundsResource`](RefundsResource.md)

Defined in: [index.ts:152](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L152)

***

### serviceGroups

> `readonly` **serviceGroups**: [`ServiceGroupsResource`](ServiceGroupsResource.md)

Defined in: [index.ts:160](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L160)

***

### shipments

> `readonly` **shipments**: [`ShipmentsResource`](ShipmentsResource.md)

Defined in: [index.ts:145](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L145)

***

### tracking

> `readonly` **tracking**: [`TrackingResource`](TrackingResource.md)

Defined in: [index.ts:148](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L148)

***

### transactions

> `readonly` **transactions**: [`TransactionsResource`](TransactionsResource.md)

Defined in: [index.ts:147](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L147)

***

### userParcelTemplates

> `readonly` **userParcelTemplates**: [`UserParcelTemplatesResource`](UserParcelTemplatesResource.md)

Defined in: [index.ts:159](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L159)

***

### webhooks

> `readonly` **webhooks**: [`WebhooksResource`](WebhooksResource.md)

Defined in: [index.ts:150](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/index.ts#L150)
