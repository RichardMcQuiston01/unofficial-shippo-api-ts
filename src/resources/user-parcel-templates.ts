import type { ShippoClient } from "../client";
import type { ListQuery, UnconfirmedPaginatedList } from "../pagination";
import type { DistanceUnit, MassUnit } from "./parcels";

/**
 * A reusable, user-created parcel preset (e.g. "my standard shipping box"),
 * distinct from `CarrierParcelTemplate` (`./carrier-parcel-templates`),
 * which is predefined by Shippo/the carrier and read-only.
 *
 * **Confirmed** by live-contract testing (ROADMAP.md Stage 5): unlike
 * `Parcel` (`./parcels`), this resource's weight-unit field is named
 * `weight_unit`, not `mass_unit` — an earlier guess assumed the `Parcel`
 * naming applied here too, but `POST` with `mass_unit` set 400s live with
 * `"weight_unit: Weight unit must be specified if weight is specified."`.
 */
export interface UserParcelTemplate {
  object_id?: string;
  name?: string;
  length?: string;
  width?: string;
  height?: string;
  distance_unit?: DistanceUnit;
  weight?: string;
  weight_unit?: MassUnit;
  object_created?: string;
  object_updated?: string;
}

export interface UserParcelTemplateCreateRequest {
  name: string;
  length: string;
  width: string;
  height: string;
  distance_unit: DistanceUnit;
  weight: string;
  weight_unit: MassUnit;
}

export interface UserParcelTemplateUpdateRequest {
  name?: string;
  length?: string;
  width?: string;
  height?: string;
  distance_unit?: DistanceUnit;
  weight?: string;
  weight_unit?: MassUnit;
}

export class UserParcelTemplatesResource {
  constructor(private readonly client: ShippoClient) {}

  /**
   * Retrieves a single page of previously created user parcel templates.
   *
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
   * `/user-parcel-templates` (hyphenated, not the underscored path an
   * earlier guess used) — the envelope has no `count`/`next`/`previous`,
   * and `results` is `null` rather than `[]` when the account has none.
   */
  async list(query?: ListQuery): Promise<UnconfirmedPaginatedList<UserParcelTemplate>> {
    return this.client.request<UnconfirmedPaginatedList<UserParcelTemplate>>(
      "GET",
      "/user-parcel-templates",
      { query },
    );
  }

  /** Creates a new reusable parcel template. */
  async create(request: UserParcelTemplateCreateRequest): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>("POST", "/user-parcel-templates", {
      body: request,
    });
  }

  /** Retrieves a single user parcel template by its object ID. */
  async get(userParcelTemplateId: string): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>(
      "GET",
      `/user-parcel-templates/${userParcelTemplateId}`,
    );
  }

  /** Updates an existing user parcel template. */
  async update(
    userParcelTemplateId: string,
    request: UserParcelTemplateUpdateRequest,
  ): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>(
      "PUT",
      `/user-parcel-templates/${userParcelTemplateId}`,
      { body: request },
    );
  }

  /** Deletes a user parcel template. */
  async delete(userParcelTemplateId: string): Promise<void> {
    return this.client.request<void>("DELETE", `/user-parcel-templates/${userParcelTemplateId}`);
  }
}
