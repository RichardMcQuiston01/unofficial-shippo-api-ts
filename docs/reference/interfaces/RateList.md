[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / RateList

# Interface: RateList

Defined in: [resources/rates.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates.ts#L33)

Shape of `GET /shipments/{id}/rates` and its per-currency variant. Unlike
other list endpoints, the reachable OpenAPI mirror doesn't document this
as the standard `{count, next, previous, results}` envelope (and the
roadmap's method names — `listForShipment`, not `list` — reflect that);
a rate list is bounded to one shipment, so it's a plain results array.

## Properties

### results

> **results**: [`Rate`](Rate.md)[]

Defined in: [resources/rates.ts:34](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/rates.ts#L34)
