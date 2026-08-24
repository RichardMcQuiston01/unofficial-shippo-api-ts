[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsDeclaration

# Interface: CustomsDeclaration

Defined in: [resources/customs-declarations.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L23)

## Properties

### certify

> **certify**: `boolean`

Defined in: [resources/customs-declarations.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L30)

Certifies that the declaration is accurate.

***

### certify\_signer

> **certify\_signer**: `string`

Defined in: [resources/customs-declarations.ts:32](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L32)

Name of the person certifying the declaration.

***

### contents\_explanation?

> `optional` **contents\_explanation?**: `string`

Defined in: [resources/customs-declarations.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L27)

Required by carriers when `contents_type` is `"OTHER"`.

***

### contents\_type

> **contents\_type**: [`CustomsDeclarationContentsType`](../type-aliases/CustomsDeclarationContentsType.md)

Defined in: [resources/customs-declarations.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L25)

***

### exporter\_reference?

> `optional` **exporter\_reference?**: `string`

Defined in: [resources/customs-declarations.ts:34](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L34)

***

### items

> **items**: [`CustomsItem`](CustomsItem.md)[]

Defined in: [resources/customs-declarations.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L28)

***

### non\_delivery\_option

> **non\_delivery\_option**: [`CustomsDeclarationNonDeliveryOption`](../type-aliases/CustomsDeclarationNonDeliveryOption.md)

Defined in: [resources/customs-declarations.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L33)

***

### object\_created

> **object\_created**: `string`

Defined in: [resources/customs-declarations.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L35)

***

### object\_id

> **object\_id**: `string`

Defined in: [resources/customs-declarations.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L24)

***

### object\_updated

> **object\_updated**: `string`

Defined in: [resources/customs-declarations.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L36)
