import {DLocationBase} from '@api/dto/DLocationBase';
import {DOrganizationBase} from '@api/dto/DOrganizationBase';

export interface UserFromApi {
  id: number;
  oid: number;
  username: string;
  isActive: true;
  roles: string[];
  firstName: string;
  lastName: string;
  patronymicName: string;
  email: string;
  locations: DLocationBase[];
  organizations: DOrganizationBase[];
}
