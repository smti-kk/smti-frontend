import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { Location } from '@core/models';

const LOCATIONS = environment.API_BASE_URL + '/api/v1/report-organization-contracts-dzen/';
const LOCATIONS_WITH_CONNECTION_POINTS = environment.API_BASE_URL + '/api/v1/tc-organization-dzen/';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<Location[]> {
    return this.httpClient
      .get(LOCATIONS)
      .pipe(map(response => {
        return (Deserialize(response, Location) as Location[])
          .sort((a, b) => b.organizations.length - a.organizations.length)
          .sort((a, b) => b.contractCount - a.contractCount);
      }));
  }

  listLocationsWithConnectionPoints(): Observable<Location[]> {
    return this.httpClient
      .get(LOCATIONS_WITH_CONNECTION_POINTS + '/2419/')
      .pipe(map(response => {
        return ([Deserialize(response, Location)] as Location[])
          .sort((a, b) => b.organizations.length - a.organizations.length)
          .sort((a, b) => b.connectionPointsCount - a.connectionPointsCount);
      }));
  }
}
