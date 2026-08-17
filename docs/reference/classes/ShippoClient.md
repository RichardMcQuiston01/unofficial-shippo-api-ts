[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoClient

# Class: ShippoClient

Defined in: [client.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/client.ts#L38)

## Constructors

### Constructor

> **new ShippoClient**(`options`): `ShippoClient`

Defined in: [client.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/client.ts#L48)

#### Parameters

##### options

[`ShippoClientOptions`](../interfaces/ShippoClientOptions.md)

#### Returns

`ShippoClient`

## Properties

### baseUrl

> `readonly` **baseUrl**: `string`

Defined in: [client.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/client.ts#L39)

## Methods

### request()

> **request**\<`T`\>(`method`, `path`, `options?`): `Promise`\<`T`\>

Defined in: [client.ts:62](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/client.ts#L62)

#### Type Parameters

##### T

`T`

#### Parameters

##### method

[`HttpMethod`](../type-aliases/HttpMethod.md)

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md) = `{}`

#### Returns

`Promise`\<`T`\>
