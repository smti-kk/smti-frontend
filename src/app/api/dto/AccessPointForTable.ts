import {AccessPointType} from '@api/dto/AccessPointType';
import {GovProgram} from '@api/dto/GovProgram';

export interface AccessPointForTable {
  id: number;
  type: AccessPointType;
  governmentDevelopmentProgram: GovProgram;
}
