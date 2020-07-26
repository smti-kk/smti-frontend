import {DLocationBase} from '@api/dto/DLocationBase';

export interface UserFromApi {
  id: number;
  username: string;
  isActive: true;
  roles: string[];
  firstName: string;
  lastName: string;
  patronymicName: string;
  email: string;
  locations: DLocationBase[];
}
