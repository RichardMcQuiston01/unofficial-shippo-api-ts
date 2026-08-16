import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";

export type DistanceUnit = "cm" | "in" | "ft" | "mm" | "m" | "yd";
export type MassUnit = "g" | "oz" | "lb" | "kg";

export interface Parcel {
  object_id: string;
  length: string;
  width: string;
  height: string;
  distance_unit: DistanceUnit;
  weight: string;
  mass_unit: MassUnit;
  /** Predefined carrier parcel template token, if this parcel was built from one. */
  template?: string;
  object_created: string;
  object_updated: string;
}

export interface ParcelCreateRequest {
  length: string;
  width: string;
  height: string;
  distance_unit: DistanceUnit;
  weight: string;
  mass_unit: MassUnit;
  template?: string;
}

export class ParcelsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new parcel describing a package's dimensions and weight. */
  async create(request: ParcelCreateRequest): Promise<Parcel> {
    return this.client.request<Parcel>("POST", "/parcels", { body: request });
  }

  /** Retrieves a single page of previously created parcels. */
  async list(query?: ListQuery): Promise<PaginatedList<Parcel>> {
    return this.client.request<PaginatedList<Parcel>>("GET", "/parcels", { query });
  }

  /** Retrieves a single parcel by its object ID. */
  async get(parcelId: string): Promise<Parcel> {
    return this.client.request<Parcel>("GET", `/parcels/${parcelId}`);
  }
}
