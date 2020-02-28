import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {map, share} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {GovernmentProgram} from '@core/models';
import {Observable} from 'rxjs';

const URL = environment.API_BASE_URL + '/api/v1/gov-program';

@Injectable()
export class GovernmentProgramService {
  governmentProgram$: Observable<GovernmentProgram[]>;

  constructor(private httpClient: HttpClient) {
    this.initGovernmentPrograms();
  }

  list(): Observable<GovernmentProgram[]> {
    return this.governmentProgram$;
  }

  private initGovernmentPrograms() {
    this.governmentProgram$ = this.httpClient.get(URL).pipe(
      map(response => Deserialize(response, GovernmentProgram)),
      share()
    );
  }
}
