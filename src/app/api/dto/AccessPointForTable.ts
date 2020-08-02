import {AccessPointType} from '@api/dto/AccessPointType';
import {GovernmentProgram} from '@api/dto/GovernmentProgram';

export interface AccessPointForTable {
  id: number;
  type: AccessPointType;
  governmentDevelopmentProgram: GovernmentProgram;
}
