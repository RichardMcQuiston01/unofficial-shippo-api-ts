import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { DistanceUnit } from "./parcels";

/**
 * A Shippo/carrier-predefined parcel template (e.g. "USPS Small Flat Rate
 * Box") — read-only presets, distinct from `UserParcelTemplate`
 * (`./user-parcel-templates`), which a business creates itself.
 *
 * **Unconfirmed / best effort**: not present in the reachable OpenAPI
 * mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
 * coverage). Fields are guessed from the `Parcel` shape (`./parcels`), on
 * the assumption a template predefines the same dimensional fields. The
 * identifier field is a particular unknown — many Shippo template-like
 * objects use a `token` rather than `object_id`; both are included here,
 * optional, until confirmed.
 */
export interface CarrierParcelTemplate {
  object_id?: string;
  /** Alternate identifier some Shippo template objects use instead of `object_id`. Unconfirmed which applies here. */
  token?: string;
  name?: string;
  carrier?: string;
  length?: string;
  width?: string;
  height?: string;
  distance_unit?: DistanceUnit;
}

export class CarrierParcelTemplatesResource {
  constructor(private readonly client: ShippoClient) {}

  /**
   * Retrieves a single page of carrier-predefined parcel templates.
   *
   * **Unconfirmed / best effort**: endpoint path guessed as
   * `GET /carrier_parcel_templates` — it's possible this is instead nested
   * under a specific carrier (e.g. `/carrier_parcel_templates/{carrier}`);
   * not confirmed by any reachable spec.
   */
  async list(query?: ListQuery): Promise<PaginatedList<CarrierParcelTemplate>> {
    return this.client.request<PaginatedList<CarrierParcelTemplate>>(
      "GET",
      "/carrier_parcel_templates",
      { query },
    );
  }

  /**
   * Retrieves a single carrier parcel template by its ID.
   *
   * **Unconfirmed / best effort**: endpoint path guessed, same caveats as
   * `list()`.
   */
  async get(carrierParcelTemplateId: string): Promise<CarrierParcelTemplate> {
    return this.client.request<CarrierParcelTemplate>(
      "GET",
      `/carrier_parcel_templates/${carrierParcelTemplateId}`,
    );
  }
}
