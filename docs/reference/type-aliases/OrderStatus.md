[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / OrderStatus

# Type Alias: OrderStatus

> **OrderStatus** = `"PAID"` \| `"SHIPPED"` \| `"CANCELLED"` \| `"AWAITPAY"` \| `"UNKNOWN"` \| `"REFUNDED"` \| `"PARTIALLY_REFUNDED"`

Defined in: [resources/orders.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/orders.ts#L17)

No OpenAPI spec was reachable for Orders while building this package
(ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`, `get`)
are confirmed by cross-referencing Shippo's official Python/JS/C# SDKs.
This is the least-confirmed resource in the package -- an Order
represents an e-commerce order to be fulfilled (distinct from a
`Shipment`, the actual shipping transaction), and Shippo's real schema
almost certainly has more fields than are captured here (e.g. shop_app
source metadata, taxes, discounts). Deliberately kept to a conservative
core rather than fabricating a larger shape. Treat every field as
advisory, not verified.
