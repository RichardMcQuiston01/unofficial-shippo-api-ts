[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoClientOptions

# Interface: ShippoClientOptions

Defined in: [client.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L11)

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [client.ts:13](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L13)

Shippo API token, sent as `Authorization: ShippoToken <apiKey>`.

***

### apiVersion?

> `optional` **apiVersion?**: `string`

Defined in: [client.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L21)

Optional dated API version (e.g. `2018-02-08`), sent as the
`shippo-api-version` header. Shippo defaults to the account's version
when omitted.

***

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [client.ts:15](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L15)

Defaults to `https://api.goshippo.com`. Override for testing or a proxy.

***

### fetch?

> `optional` **fetch?**: *typeof* `fetch`

Defined in: [client.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L23)

Injectable fetch implementation — defaults to the global `fetch`.

***

### maxRetries?

> `optional` **maxRetries?**: `number`

Defined in: [client.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L25)

Max retry attempts for network errors and 429/5xx responses. Default 2.

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [client.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L27)

Base delay for exponential backoff between retries, in ms. Default 300.

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [client.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/client.ts#L29)

Per-request timeout in ms, aborting the request if exceeded. Default 30000.
