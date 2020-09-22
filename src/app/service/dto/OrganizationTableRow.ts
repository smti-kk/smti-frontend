import {OrganizationConnectionPoint} from './OrganizationConnectionPoint';

export interface OrganizationTableRow {
  id: number;
  locationName: string;
  area: string;
  population: string;
  name: string;
  type: string;
  szoType: string;
  connectionPoints: OrganizationConnectionPoint[];
}
