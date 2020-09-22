import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export interface LocationShort {
  id: number;
  population: number;
  type: string;
  name: string;
  technicalCapability: ShortTechnicalCapability[];
}
