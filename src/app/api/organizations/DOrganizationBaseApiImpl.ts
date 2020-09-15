import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DORGANIZATION_BASE_API} from '../../../environments/api.routes';
import {DOrganizationBaseApi} from './DOrganizationBaseApi';
import {DOrganizationBase} from '../dto/DOrganizationBase';

export class DOrganizationBaseApiImpl implements DOrganizationBaseApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getAll(): Observable<DOrganizationBase[]> {
    return this.httpClient.get<DOrganizationBase[]>(DORGANIZATION_BASE_API);
  }
}
