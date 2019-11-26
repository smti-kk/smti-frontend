import { RestApiService } from '@shared/services/common/rest-api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from '@shared/services/store.service';
import { ApiMapper } from '@shared/utils/api-mapper';

export interface GovProgram {
  id: number;
  shortName: string;
  fullName: string;
  description: string;
}

@Injectable()
export class GovProgramMapper extends ApiMapper<GovProgram, GovProgram, GovProgram> {
  mapDetailApi(apiData): GovProgram {
    return GovProgramMapper.mapApiModel(apiData);
  }

  mapShortApi(apiData): GovProgram {
    return GovProgramMapper.mapApiModel(apiData);
  }

  static mapApiModel(apiData): GovProgram {
    return {
      id: apiData.id,
      shortName: apiData.short_name,
      fullName: apiData.full_name,
      description: apiData.description
    };
  }
}

const URL = '/api/v1/gov-program';

@Injectable()
export class GovProgramService extends RestApiService<GovProgram, GovProgram, GovProgram> {
  constructor(httpClient: HttpClient, storeService: StoreService, apiMapper: GovProgramMapper) {
    super(httpClient, storeService, URL, apiMapper);
  }
}
