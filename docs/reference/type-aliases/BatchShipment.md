[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / BatchShipment

# Type Alias: BatchShipment

> **BatchShipment** = `Record`\<`string`, `unknown`\>

Defined in: [resources/batches.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/batches.ts#L18)

Item shape within `batch_shipments` is not detailed by any reachable
source (the AsyncAPI spec only names the field, not its sub-shape) —
left as an open record rather than guessing field names. Likely wraps a
shipment object ID plus a per-item status, based on the three official
SDKs' `add_shipments`/`remove_shipments` semantics, but that's inference,
not confirmation.
