import {FCTechnicalCapability} from './ShortTechnicalCapability';
import {LocationParent} from './LocationDetail';

export interface LocationFC {
  id: number;
  type: string;
  name: string;
  population: number;
  locationParent: LocationParent;
  technicalCapabilities: FCTechnicalCapability[];
}
