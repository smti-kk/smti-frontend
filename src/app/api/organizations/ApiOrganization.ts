import {HttpClient, HttpParams} from '@angular/common/http';
import {ORGANIZATION_API} from '../../../environments/api.routes';
import {Observable} from 'rxjs';
import {ApiOrganizationResponse} from '@api/dto/ApiOrganizationResponse';
import {Pageable} from '@api/dto/Pageable';

export class ApiOrganization {
  constructor(private readonly httpClient: HttpClient) {
  }

  count(locationId: number): Observable<number> {
    return this.httpClient.get<number>(`${ORGANIZATION_API}/${locationId}/count`);
  }

  organizationsByLocation(locationId: number,
                          page: number = 0,
                          size: number = 8,
                          apId?: number): Observable<Pageable<ApiOrganizationResponse[]>> {
    let params = new HttpParams()
      .set('location', `${locationId}`)
      .set('page', `${page}`)
      .set('size', `${size}`);
    if (apId) {
      params = params.set('accessPoint', `${apId}`);
    }
    return this.httpClient.get<Pageable<ApiOrganizationResponse[]>>(`${ORGANIZATION_API}`, {params});
  }

  organizationsByLocationWithAp(locationId: number,
                                apId?: number,
                                page: number = 0,
                                size: number = 8): Observable<Pageable<ApiOrganizationResponse[]>> {
    return this.organizationsByLocation(locationId, page, size, apId);
  }

  organizationsByLocationWithoutAp(locationId: number,
                                   page: number = 0,
                                   size: number = 8,
                                   apId?: number): Observable<Pageable<ApiOrganizationResponse[]>> {
    let params = new HttpParams()
      .set('location', `${locationId}`)
      .set('page', `${page}`)
      .set('size', `${size}`);
    if (apId) {
      params = params.set('accessPoint', `${apId}`);
    }
    return this.httpClient.get<Pageable<ApiOrganizationResponse[]>>(`${ORGANIZATION_API}/without-ap`, {params});
  }

  remove(locationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${ORGANIZATION_API}/${locationId}`);
  }
}
