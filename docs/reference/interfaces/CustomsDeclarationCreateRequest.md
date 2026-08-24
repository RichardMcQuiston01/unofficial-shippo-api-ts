[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsDeclarationCreateRequest

# Interface: CustomsDeclarationCreateRequest

Defined in: [resources/customs-declarations.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L39)

## Properties

### certify

> **certify**: `boolean`

Defined in: [resources/customs-declarations.ts:44](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L44)

***

### certify\_signer

> **certify\_signer**: `string`

Defined in: [resources/customs-declarations.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L45)

***

### contents\_explanation?

> `optional` **contents\_explanation?**: `string`

Defined in: [resources/customs-declarations.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L41)

***

### contents\_type

> **contents\_type**: [`CustomsDeclarationContentsType`](../type-aliases/CustomsDeclarationContentsType.md)

Defined in: [resources/customs-declarations.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L40)

***

### exporter\_reference?

> `optional` **exporter\_reference?**: `string`

Defined in: [resources/customs-declarations.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L47)

***

### items

> **items**: (`string` \| [`CustomsItemCreateRequest`](CustomsItemCreateRequest.md))[]

Defined in: [resources/customs-declarations.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L43)

Existing customs item object IDs, or inline data to create them.

***

### non\_delivery\_option

> **non\_delivery\_option**: [`CustomsDeclarationNonDeliveryOption`](../type-aliases/CustomsDeclarationNonDeliveryOption.md)

Defined in: [resources/customs-declarations.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L46)
