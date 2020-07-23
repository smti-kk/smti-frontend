import {ShortTechnicalCapability, WriteableTechnicalCapability} from './ShortTechnicalCapability';
import {OrganizationForTable} from '@api/dto/OrganizationForTable';

export interface LocationParent {
  id: number;
  type: string;
  name: string;
}

export interface WriteableLocation {
  id: number;
  type: string;
  name: string;
  population: number;
  locationParent: LocationParent;
  technicalCapabilities: WriteableTechnicalCapability[];
  organizations: OrganizationForTable[];
}

export interface LocationDetail {
  id: number;
  type: string;
  name: string;
  population: number;
  locationParent: LocationParent;
  technicalCapabilities: ShortTechnicalCapability[];
  organizations: OrganizationForTable[];
}
