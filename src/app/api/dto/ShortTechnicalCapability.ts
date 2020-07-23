import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {GovernmentProgram} from '@api/dto/GovernmentProgram';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {MobileType} from '@api/dto/MobileType';

export interface ShortTechnicalCapability {
  id: number;
  operatorId: number;
  type: TechnicalCapabilityType;
  governmentDevelopmentProgram: GovernmentProgram;
  trunkChannel?: TrunkChannelType;
  typeMobile?: MobileType;
  locationId: number;
}

export interface WriteableTechnicalCapability {
  id: number;
  operatorId: number;
  type: TechnicalCapabilityType;
  governmentDevelopmentProgram: number;
  trunkChannel: number;
  typeMobile?: number;
  locationId: number;
}
