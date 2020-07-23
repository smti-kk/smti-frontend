import {AccessPointForTable} from '@api/dto/AccessPointForTable';

export interface OrganizationForTable {
  id: number;
  accessPoints: AccessPointForTable[];
}
