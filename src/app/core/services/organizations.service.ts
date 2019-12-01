import { Injectable } from '@angular/core';
import { RestApiService } from './common/rest-api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from './store.service';
import { DefaultMapper } from '@shared/utils/api-mapper';
import { ORGANIZATIONS } from '@shared/constants/api';
import { Observable } from 'rxjs';
import { Organization } from '@core/models';

@Injectable()
export class OrganizationsService extends RestApiService<Organization, Organization, Organization> {

  constructor(httpClient: HttpClient, storeService: StoreService) {
    super(httpClient, storeService, ORGANIZATIONS, new DefaultMapper());
  }

  getList(location: number): Observable<Organization[]> {
    const params = new HttpParams()
      .append('location', location.toString());

    return super.list(params);
  }
}
