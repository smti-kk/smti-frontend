import {Observable} from 'rxjs';
import {DLocationBase} from '@api/dto/DLocationBase';
import {DOrganizationBase} from '../../api/dto/DOrganizationBase';

export abstract class DOrganizationsService {
  abstract all(): Observable<DOrganizationBase[]>;
}

