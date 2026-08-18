[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / RatesAtCheckoutResource

# Class: RatesAtCheckoutResource

Defined in: [resources/rates-at-checkout.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L36)

## Constructors

### Constructor

> **new RatesAtCheckoutResource**(`client`): `RatesAtCheckoutResource`

Defined in: [resources/rates-at-checkout.ts:37](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L37)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`RatesAtCheckoutResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`RateList`](../interfaces/RateList.md)\>

Defined in: [resources/rates-at-checkout.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L49)

Computes live shippable rates for a checkout flow without first
creating a Shipment. Reuses `RateList` from `./rates`
(`{ results: Rate[] }`) on the judgment call that a "give me
shippable options" endpoint likely returns the same bounded,
non-paginated array shape as `GET /shipments/{id}/rates` rather than
the standard `{count, next, previous, results}` list envelope — a
guess, not a confirmed shape, since no OpenAPI coverage exists for
this endpoint.

#### Parameters

##### request

[`RatesAtCheckoutCreateRequest`](../interfaces/RatesAtCheckoutCreateRequest.md)

#### Returns

`Promise`\<[`RateList`](../interfaces/RateList.md)\>

***

### deleteDefaultParcelTemplate()

> **deleteDefaultParcelTemplate**(): `Promise`\<`void`\>

Defined in: [resources/rates-at-checkout.ts:76](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L76)

Clears the account-level default parcel template.

#### Returns

`Promise`\<`void`\>

***

### getDefaultParcelTemplate()

> **getDefaultParcelTemplate**(): `Promise`\<[`Parcel`](../interfaces/Parcel.md) \| `undefined`\>

Defined in: [resources/rates-at-checkout.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L61)

Retrieves the account-level default parcel template used by `create()`
when called without an explicit `parcel`. Returns `undefined` if none
is configured — this null-handling is a guess, since no primary source
confirms whether the endpoint 404s instead when unset.

#### Returns

`Promise`\<[`Parcel`](../interfaces/Parcel.md) \| `undefined`\>

***

### updateDefaultParcelTemplate()

> **updateDefaultParcelTemplate**(`request`): `Promise`\<[`Parcel`](../interfaces/Parcel.md)\>

Defined in: [resources/rates-at-checkout.ts:69](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates-at-checkout.ts#L69)

Sets the account-level default parcel template used by `create()` when no `parcel` is given.

#### Parameters

##### request

[`ParcelCreateRequest`](../interfaces/ParcelCreateRequest.md)

#### Returns

`Promise`\<[`Parcel`](../interfaces/Parcel.md)\>
