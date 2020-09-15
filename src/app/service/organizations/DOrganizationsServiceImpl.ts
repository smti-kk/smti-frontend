import {Observable} from 'rxjs';
import {DOrganizationsService} from './DOrganizationsService';
import {DOrganizationBaseApi} from '../../api/organizations/DOrganizationBaseApi';
import {DOrganizationBase} from '../../api/dto/DOrganizationBase';

export class DOrganizationsServiceImpl implements DOrganizationsService {
  constructor(private dOrganizationBaseApi: DOrganizationBaseApi) {
  }

  all(): Observable<DOrganizationBase[]> {
    return this.dOrganizationBaseApi.getAll();
  }
}
