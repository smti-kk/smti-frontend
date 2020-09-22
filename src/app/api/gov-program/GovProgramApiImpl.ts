import {Observable} from 'rxjs';
import {GovProgram} from '../dto/GovProgram';
import {GovProgramApi} from './GovProgramApi';
import {HttpClient} from '@angular/common/http';
import {GOV_PROGRAM_API} from '../../../environments/api.routes';

export class GovProgramApiImpl implements GovProgramApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<GovProgram[]> {
    return this.httpClient.get<GovProgram[]>(GOV_PROGRAM_API);
  }
}
