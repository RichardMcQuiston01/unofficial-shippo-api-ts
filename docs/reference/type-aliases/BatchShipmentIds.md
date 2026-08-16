[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / BatchShipmentIds

# Type Alias: BatchShipmentIds

> **BatchShipmentIds** = `string`[]

Defined in: [resources/batches.ts:86](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L86)

Best-effort request/response path for `add_shipments`/`remove_shipments`
— endpoint existence is cross-referenced across three official SDKs
(Python/JS/C#, all agreeing), but the exact body shape is not documented
anywhere reachable. Typed as a bare array of shipment object IDs, the
simplest shape consistent with all three SDKs' method signatures; flag
for follow-up verification against a live account.
