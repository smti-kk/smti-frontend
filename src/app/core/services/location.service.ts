import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {Location} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';

const LOCATIONS = environment.API_BASE_URL + '/api/v1/report-organization-contracts/';
const LOCATIONS_WITH_CONNECTION_POINTS = environment.API_BASE_URL + '/api/v1/report-organization/';

@Injectable()
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<PaginatedList<Location>> {
    return this.httpClient.get<any>(LOCATIONS).pipe(
      map(response => {
        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map(item => Deserialize(item, Location)),
        };
      })
      // map(response => {
      //   return (Deserialize(response, Location) as Location[])
      //     .sort((a, b) => b.organizations.length - a.organizations.length)
      //     .sort((a, b) => b.contractCount - a.contractCount);
      // })
    );
  }

  listLocationsWithConnectionPoints(): Observable<Location[]> {
    return this.httpClient.get(LOCATIONS_WITH_CONNECTION_POINTS).pipe(
      map(response => {
        return (Deserialize(response, Location) as Location[])
          .sort((a, b) => b.organizations.length - a.organizations.length)
          .sort((a, b) => b.connectionPointsCount - a.connectionPointsCount);
      })
    );
  }
}
