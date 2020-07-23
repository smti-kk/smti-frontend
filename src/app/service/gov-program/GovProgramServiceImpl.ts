import {Observable} from 'rxjs';
import {GovProgram} from '@api/dto/GovProgram';
import {GovProgramService} from './GovProgramService';
import {GovProgramApi} from '@api/gov-program/GovProgramApi';

export class GovProgramServiceImpl implements GovProgramService {
  private readonly govProgramApi: GovProgramApi;

  constructor(govProgramApi: GovProgramApi) {
    this.govProgramApi = govProgramApi;
  }

  list(): Observable<GovProgram[]> {
    return this.govProgramApi.list();
  }
}
