[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Batch

# Interface: Batch

Defined in: [resources/batches.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L39)

`Batch` object. Field *names* are grounded in Shippo's own webhook
AsyncAPI spec (`asyncapi/shippo-webhooks-asyncapi.yaml` in the
`api-evangelist/shippo` mirror, describing the `batch_created`/
`batch_purchased` event payload — ROADMAP.md §2) — that source lists the
fields below but doesn't detail their types, so scalar types are a
reasonable best-effort inference (matching the pattern used elsewhere in
this codebase, e.g. `metadata` as an optional string) rather than
independently confirmed. `batch_shipments` and `object_results` are
flagged individually above. This resource itself has no reachable
OpenAPI coverage at all (unlike Refunds/Webhooks) — see `docs/
CONVENTIONS.md` "Spec cross-checking".

## Properties

### batch\_shipments?

> `optional` **batch\_shipments?**: [`BatchShipment`](../type-aliases/BatchShipment.md)[]

Defined in: [resources/batches.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L48)

***

### default\_carrier\_account?

> `optional` **default\_carrier\_account?**: `string`

Defined in: [resources/batches.ts:44](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L44)

***

### default\_servicelevel\_token?

> `optional` **default\_servicelevel\_token?**: `string`

Defined in: [resources/batches.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L45)

***

### label\_filetype?

> `optional` **label\_filetype?**: `string`

Defined in: [resources/batches.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L46)

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/batches.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L47)

***

### object\_created?

> `optional` **object\_created?**: `string`

Defined in: [resources/batches.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L50)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/batches.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L40)

***

### object\_owner?

> `optional` **object\_owner?**: `string`

Defined in: [resources/batches.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L43)

***

### object\_results?

> `optional` **object\_results?**: [`BatchObjectResult`](../type-aliases/BatchObjectResult.md)[]

Defined in: [resources/batches.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L49)

***

### object\_updated?

> `optional` **object\_updated?**: `string`

Defined in: [resources/batches.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L51)

***

### status?

> `optional` **status?**: [`BatchStatus`](../type-aliases/BatchStatus.md)

Defined in: [resources/batches.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L42)

Inferred by analogy with other async resources — not confirmed for Batches. See `BatchStatus`.
