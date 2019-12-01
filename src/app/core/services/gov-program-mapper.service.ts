import { Injectable } from '@angular/core';
import { ApiMapper } from '@shared/utils/api-mapper';
import { GovProgram } from '@core/services/gov-program.service';

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
