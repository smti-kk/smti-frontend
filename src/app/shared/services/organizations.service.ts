import { Injectable } from '@angular/core';
import { RestApiService } from './common/rest-api-service';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { DefaultMapper } from '../utils/api-mapper';
import { ORGANIZATIONS } from '../constants/api';
import { Organization } from '../models/organization';

@Injectable()
export class OrganizationsService extends RestApiService<Organization, Organization, Organization> {

  constructor(httpClient: HttpClient, storeService: StoreService) {
    super(httpClient, storeService, ORGANIZATIONS, new DefaultMapper());
  }
}
