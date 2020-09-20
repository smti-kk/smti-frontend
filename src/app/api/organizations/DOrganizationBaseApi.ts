import {Observable} from 'rxjs';
import {DLocationBase} from '../dto/DLocationBase';
import {DOrganizationBase} from '../dto/DOrganizationBase';

export interface DOrganizationBaseApi {
  getAll(): Observable<DOrganizationBase[]>;
}

