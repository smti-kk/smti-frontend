import {Observable} from 'rxjs';
import {AccessPointFromApi} from '../dto/AccessPointFromApi';
import {AccessPointsModificationsApi} from './AccessPointsModificationsApi';
import {MAP_ACCESS_POINTS_API} from '../../../environments/api.routes';
import {HttpClient} from '@angular/common/http';

export class AccessPointsModificationsApiImpl implements AccessPointsModificationsApi {
  constructor(private httpClient: HttpClient) {
  }

  getModifiedAfterDate(after: string, type: string): Observable<AccessPointFromApi[]> {
    return this.httpClient.get<AccessPointFromApi[]>(MAP_ACCESS_POINTS_API, {
      params: {
        type,
        modified: after
      }
    });
  }
}
