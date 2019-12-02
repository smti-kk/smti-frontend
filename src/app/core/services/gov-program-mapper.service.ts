import { Injectable } from '@angular/core';
import { GovProgram } from '@core/services/gov-program.service';
import {ApiMapper} from '@core/utils/api-mapper';

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
