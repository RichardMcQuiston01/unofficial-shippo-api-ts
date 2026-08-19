import type { ShippoClient } from "../client";
import type { ListQuery, UnconfirmedPaginatedList } from "../pagination";
import type { DistanceUnit } from "./parcels";

/**
 * A Shippo/carrier-predefined parcel template (e.g. "USPS Small Flat Rate
 * Box") — read-only presets, distinct from `UserParcelTemplate`
 * (`./user-parcel-templates`), which a business creates itself.
 *
 * **Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
 * response uses `token` as the identifier (e.g. `"USPS_FlatRateEnvelope"`),
 * not `object_id`, and includes `is_variable_dimensions`. `object_id` is
 * kept as an optional field in case some carriers' entries include it, but
 * it wasn't observed live.
 */
export interface CarrierParcelTemplate {
  object_id?: string;
  token?: string;
  name?: string;
  carrier?: string;
  is_variable_dimensions?: boolean;
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
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
   * `GET /parcel-templates` — an earlier guess of `/carrier_parcel_templates`
   * 404'd live. The envelope has no `count`/`next`/`previous`, just
   * `results`.
   */
  async list(query?: ListQuery): Promise<UnconfirmedPaginatedList<CarrierParcelTemplate>> {
    return this.client.request<UnconfirmedPaginatedList<CarrierParcelTemplate>>(
      "GET",
      "/parcel-templates",
      { query },
    );
  }

  /**
   * Retrieves a single carrier parcel template by its token (e.g.
   * `"USPS_FlatRateEnvelope"`).
   *
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
   * `GET /parcel-templates/{token}`.
   */
  async get(token: string): Promise<CarrierParcelTemplate> {
    return this.client.request<CarrierParcelTemplate>("GET", `/parcel-templates/${token}`);
  }
}
