import {Observable} from 'rxjs';
import {GovProgram} from '../dto/GovProgram';
import {GovProgramApi} from './GovProgramApi';
import {HttpClient} from '@angular/common/http';
import {GOV_PROGRAM_API} from '../../../environments/api.routes';
import {Injectable} from '@angular/core';

export class GovProgramApiImpl implements GovProgramApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<GovProgram[]> {
    return this.httpClient.get<GovProgram[]>(GOV_PROGRAM_API);
  }

  create(govProgram: GovProgram): Observable<GovProgram> {
    return this.httpClient.post<GovProgram>(GOV_PROGRAM_API, govProgram);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(GOV_PROGRAM_API + '/' + id.toString());
  }
}
