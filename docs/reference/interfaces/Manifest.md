[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Manifest

# Interface: Manifest

Defined in: [resources/manifests.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L17)

## Properties

### address\_from?

> `optional` **address\_from?**: [`Address`](Address.md)

Defined in: [resources/manifests.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L26)

***

### carrier\_account

> **carrier\_account**: `string`

Defined in: [resources/manifests.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L21)

Object ID of the Carrier Account this manifest was generated for.

***

### documents?

> `optional` **documents?**: `string`[]

Defined in: [resources/manifests.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L31)

URLs to the generated manifest document(s), e.g. a PDF SCAN form.
Not confirmed by any reachable source -- flagged as best-effort.

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/manifests.ts:32](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L32)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/manifests.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L18)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/manifests.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L33)

***

### shipment\_date

> **shipment\_date**: `string`

Defined in: [resources/manifests.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L23)

Date the manifest covers, e.g. the transactions created that day.

***

### status

> **status**: [`ManifestStatus`](../type-aliases/ManifestStatus.md)

Defined in: [resources/manifests.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L19)

***

### transactions?

> `optional` **transactions?**: `string`[]

Defined in: [resources/manifests.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L25)

Object IDs of the transactions (labels) included on this manifest.
