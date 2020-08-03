import {LocationParent} from '@api/dto/LocationDetail';
import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export interface FeaturesComparing {
  id: number;
  type: string;
  name: string;
  population: number;
  locationParent: LocationParent;
  archive: FCTechnicalCapability[];
  planYear: FCTechnicalCapability[];
  planTwoYear: FCTechnicalCapability[];
  planThreeYear: FCTechnicalCapability[];
}
