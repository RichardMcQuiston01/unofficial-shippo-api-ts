import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { DistanceUnit, MassUnit } from "./parcels";

/**
 * A reusable, user-created parcel preset (e.g. "my standard shipping box"),
 * distinct from `CarrierParcelTemplate` (`./carrier-parcel-templates`),
 * which is predefined by Shippo/the carrier and read-only.
 *
 * **Unconfirmed / best effort**: not present in the reachable OpenAPI
 * mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
 * coverage). Reasonably confident this mirrors `Parcel` (`./parcels`) plus
 * a `name`, based on the SDK method inventory and the resource's purpose.
 */
export interface UserParcelTemplate {
  object_id?: string;
  name?: string;
  length?: string;
  width?: string;
  height?: string;
  distance_unit?: DistanceUnit;
  weight?: string;
  mass_unit?: MassUnit;
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
  mass_unit: MassUnit;
}

export interface UserParcelTemplateUpdateRequest {
  name?: string;
  length?: string;
  width?: string;
  height?: string;
  distance_unit?: DistanceUnit;
  weight?: string;
  mass_unit?: MassUnit;
}

export class UserParcelTemplatesResource {
  constructor(private readonly client: ShippoClient) {}

  /** Retrieves a single page of previously created user parcel templates. */
  async list(query?: ListQuery): Promise<PaginatedList<UserParcelTemplate>> {
    return this.client.request<PaginatedList<UserParcelTemplate>>("GET", "/user_parcel_templates", {
      query,
    });
  }

  /** Creates a new reusable parcel template. */
  async create(request: UserParcelTemplateCreateRequest): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>("POST", "/user_parcel_templates", {
      body: request,
    });
  }

  /** Retrieves a single user parcel template by its object ID. */
  async get(userParcelTemplateId: string): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>(
      "GET",
      `/user_parcel_templates/${userParcelTemplateId}`,
    );
  }

  /** Updates an existing user parcel template. */
  async update(
    userParcelTemplateId: string,
    request: UserParcelTemplateUpdateRequest,
  ): Promise<UserParcelTemplate> {
    return this.client.request<UserParcelTemplate>(
      "PUT",
      `/user_parcel_templates/${userParcelTemplateId}`,
      { body: request },
    );
  }

  /** Deletes a user parcel template. */
  async delete(userParcelTemplateId: string): Promise<void> {
    return this.client.request<void>("DELETE", `/user_parcel_templates/${userParcelTemplateId}`);
  }
}
