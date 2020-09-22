import {TechnicalCapabilityType} from '../dto/TechnicalCapabilityType';

export interface LocationFeatureWritable {
  id: number;
  operatorId: number;
  type: TechnicalCapabilityType;
  governmentDevelopmentProgram: number;
  trunkChannel: number;
  typeMobile: number;
  locationId: number;
}
