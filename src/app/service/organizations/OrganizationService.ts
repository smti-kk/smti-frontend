import {OrganizationTableRow} from '../dto/OrganizationTableRow';
import {Observable} from 'rxjs';

export abstract class OrganizationService {
  abstract list(): Observable<OrganizationTableRow[]>;
}

