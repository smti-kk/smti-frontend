import {Observable} from 'rxjs';
import {MAP_ACCESS_POINTS_API} from '../../../environments/api.routes';
import {HttpClient} from '@angular/common/http';

export class AccessPointsApi {
  constructor(private readonly httpClient: HttpClient) {
  }

  getLocationId(accessPointId: number): Observable<number> {
    return this.httpClient.get<number>(`${MAP_ACCESS_POINTS_API}/${accessPointId}/locationId`);
  }
}
