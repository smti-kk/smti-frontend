import { RestApiService } from './common/rest-api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { GovProgramMapper } from '@core/services/gov-program-mapper.service';

export interface GovProgram {
  id: number;
  shortName: string;
  fullName: string;
  description: string;
}

const URL = '/api/v1/gov-program';

@Injectable()
export class GovProgramService extends RestApiService<GovProgram, GovProgram, GovProgram> {
  constructor(httpClient: HttpClient, storeService: StoreService, apiMapper: GovProgramMapper) {
    super(httpClient, storeService, URL, apiMapper);
  }
}
