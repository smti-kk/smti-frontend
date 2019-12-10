import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { Location } from '@core/models';

const LOCATIONS = environment.API_BASE_URL + '/api/v1/report-organization-contracts-dzen/';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<Location[]> {
    return this.httpClient
      .get(LOCATIONS)
      .pipe(map(response => Deserialize(response, Location)));
  }
}
