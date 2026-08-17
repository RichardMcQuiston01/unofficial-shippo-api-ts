import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { CustomsItem, CustomsItemCreateRequest } from "./customs-items";

/**
 * No OpenAPI spec was reachable for Customs Declarations while building
 * this package (ROADMAP.md §2 "Coverage gap"). Method names (`list`,
 * `create`, `get`) are confirmed by cross-referencing Shippo's official
 * Python/JS/C# SDKs, but every field below is a best-effort reconstruction
 * from general knowledge of international customs paperwork, not verified
 * against a primary source. Treat the whole shape as advisory.
 */
export type CustomsDeclarationContentsType =
  "MERCHANDISE" | "GIFT" | "SAMPLE" | "RETURN_MERCHANDISE" | "DOCUMENTS" | "OTHER";

/**
 * What the carrier should do if the shipment can't be delivered. Names are
 * a well-established pattern for this domain; not confirmed for Shippo
 * specifically.
 */
export type CustomsDeclarationNonDeliveryOption = "ABANDON" | "RETURN";

export interface CustomsDeclaration {
  object_id: string;
  contents_type: CustomsDeclarationContentsType;
  /** Required by carriers when `contents_type` is `"OTHER"`. */
  contents_explanation?: string;
  items: CustomsItem[];
  /** Certifies that the declaration is accurate. */
  certify: boolean;
  /** Name of the person certifying the declaration. */
  certify_signer: string;
  non_delivery_option: CustomsDeclarationNonDeliveryOption;
  exporter_reference?: string;
  object_created: string;
  object_updated: string;
}

export interface CustomsDeclarationCreateRequest {
  contents_type: CustomsDeclarationContentsType;
  contents_explanation?: string;
  /** Existing customs item object IDs, or inline data to create them. */
  items: Array<string | CustomsItemCreateRequest>;
  certify: boolean;
  certify_signer: string;
  non_delivery_option: CustomsDeclarationNonDeliveryOption;
  exporter_reference?: string;
}

export class CustomsDeclarationsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new customs declaration from one or more customs items. */
  async create(request: CustomsDeclarationCreateRequest): Promise<CustomsDeclaration> {
    return this.client.request<CustomsDeclaration>("POST", "/customs/declarations", {
      body: request,
    });
  }

  /** Retrieves a single page of previously created customs declarations. */
  async list(query?: ListQuery): Promise<PaginatedList<CustomsDeclaration>> {
    return this.client.request<PaginatedList<CustomsDeclaration>>("GET", "/customs/declarations", {
      query,
    });
  }

  /** Retrieves a single customs declaration by its object ID. */
  async get(customsDeclarationId: string): Promise<CustomsDeclaration> {
    return this.client.request<CustomsDeclaration>(
      "GET",
      `/customs/declarations/${customsDeclarationId}`,
    );
  }
}
