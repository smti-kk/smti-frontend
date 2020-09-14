import {HttpClient} from '@angular/common/http';
import {ORGANIZATION_API, TRUNK_CHANNEL_API} from '../../../environments/api.routes';
import {Observable} from 'rxjs';
import {ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';
import {delay} from 'rxjs/operators';

export class ApiOrganization {
  constructor(private readonly httpClient: HttpClient) {
  }

  count(locationId: number): Observable<number> {
    return this.httpClient.get<number>(`${ORGANIZATION_API}/${locationId}/count`);
  }

  organizationsByLocation(locationId: number): Observable<ApiOrganizationResponse[]> {
    return this.httpClient.get<ApiOrganizationResponse[]>(`${ORGANIZATION_API}`, {params: {location: `${locationId}`}})
      .pipe(delay(1000));
  }

  remove(locationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${ORGANIZATION_API}/${locationId}`);
  }
}
