import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, share} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {Observable} from 'rxjs';
import {GovernmentProgram} from '@core/models';
import {GOVERNMENT_PROGRAM} from '@core/constants/api';

@Injectable()
export class GovernmentProgramService {
  governmentProgram$: Observable<GovernmentProgram[]>;

  constructor(private httpClient: HttpClient) {
    this.initGovernmentPrograms();
  }

  list(): Observable<GovernmentProgram[]> {
    return this.governmentProgram$;
  }

  private initGovernmentPrograms(): void {
    this.governmentProgram$ = this.httpClient.get(GOVERNMENT_PROGRAM).pipe(
      map(response => Deserialize(response, GovernmentProgram)),
      share()
    );
  }
}
