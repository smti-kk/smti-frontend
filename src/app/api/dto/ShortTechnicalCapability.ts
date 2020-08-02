import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {GovernmentProgram} from '@api/dto/GovernmentProgram';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {MobileType} from '@api/dto/MobileType';
import {Quality} from '@api/dto/Quality';
import {PostType} from '@api/dto/PostType';
import {Signal} from '@api/dto/Signal';

export interface ShortTechnicalCapability {
  id: number;
  operatorId: number;
  type: TechnicalCapabilityType;
  governmentDevelopmentProgram: GovernmentProgram;
  trunkChannel?: TrunkChannelType;
  typeMobile?: MobileType;
  locationId: number;
  tvOrRadioTypes: Signal[];
  typePost: PostType;
  govYearComplete: number;
}

export interface WriteableTechnicalCapability {
  id: number;
  operatorId: number;
  type: TechnicalCapabilityType;
  governmentDevelopmentProgram: number;
  tvOrRadioTypes: Signal[];
  trunkChannel: number;
  typeMobile: number;
  locationId: number;
  quality: Quality;
  typePost: string;
  govYearComplete: number;
}
