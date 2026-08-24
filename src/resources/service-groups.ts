import type { ShippoClient } from "../client";

/**
 * A single carrier service level entry within a service group's selection.
 * **Unconfirmed / best effort**: this is the least-confirmed part of this
 * resource — not present in the reachable OpenAPI mirror (ROADMAP.md §2),
 * and the SDK method inventory doesn't detail the selection shape either.
 * Left loose (extra unknown keys allowed) rather than presented as exact.
 */
export type ServiceGroupRateService = Record<string, unknown> & {
  object_id?: string;
  service_level?: string;
};

/**
 * Bundles multiple carrier service levels together for rate-shopping /
 * checkout purposes (e.g. "show customers only these 3 service levels at
 * checkout").
 *
 * **Unconfirmed / best effort**: not present in the reachable OpenAPI
 * mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
 * coverage). Fields guessed from the SDK method inventory and the
 * resource's stated purpose only.
 */
export interface ServiceGroup {
  object_id?: string;
  name?: string;
  rate_ids_services?: ServiceGroupRateService[];
}

export interface ServiceGroupCreateRequest {
  name: string;
  rate_ids_services?: ServiceGroupRateService[];
}

export interface ServiceGroupUpdateRequest {
  name?: string;
  rate_ids_services?: ServiceGroupRateService[];
}

export class ServiceGroupsResource {
  constructor(private readonly client: ShippoClient) {}

  /**
   * Retrieves every previously created service group.
   *
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
   * `/service-groups` (hyphenated) — an earlier guess of `/service_groups`
   * 404'd live. Unlike every other list endpoint in this package, the real
   * response is a bare JSON array, not a `{count, next, previous, results}`
   * (or even `{results}`) envelope — there's no pagination to page through,
   * hence no `ListQuery` parameter here.
   */
  async list(): Promise<ServiceGroup[]> {
    return this.client.request<ServiceGroup[]>("GET", "/service-groups");
  }

  /** Creates a new service group bundling one or more carrier service levels. */
  async create(request: ServiceGroupCreateRequest): Promise<ServiceGroup> {
    return this.client.request<ServiceGroup>("POST", "/service-groups", { body: request });
  }

  /** Updates an existing service group's name or service-level selection. */
  async update(serviceGroupId: string, request: ServiceGroupUpdateRequest): Promise<ServiceGroup> {
    return this.client.request<ServiceGroup>("PUT", `/service-groups/${serviceGroupId}`, {
      body: request,
    });
  }

  /** Deletes a service group. */
  async delete(serviceGroupId: string): Promise<void> {
    return this.client.request<void>("DELETE", `/service-groups/${serviceGroupId}`);
  }
}
