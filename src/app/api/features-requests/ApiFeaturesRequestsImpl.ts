import {HttpClient, HttpParams} from '@angular/common/http';
import {Pageable} from '@api/dto/Pageable';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {API_FEATURES_REQUESTS} from '../../../environments/api.routes';
import {LocationFeatureEditingRequest, LocationFeatureEditingRequestFull} from '../dto/LocationFeatureEditingRequest';
import {MunFilters} from './../../ui/mun-requests/mun-requests-filters/MunFilters';
import {ApiFeaturesRequests} from './ApiFeaturesRequests';

export class ApiFeaturesRequestsImpl implements ApiFeaturesRequests {

  constructor(private readonly http: HttpClient) {
  }

  requestsByLocation(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.http.get<Pageable<LocationFeatureEditingRequest[]>>(
      `${API_FEATURES_REQUESTS}/${locationId}`,
      {params}
    );
  }

  archive(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.http.get<LocationFeatureEditingRequest[]>(
      `${API_FEATURES_REQUESTS}/${locationId}`,
      {params}
    ).pipe(
      map(requests => {
        const content = requests
          .map(r => {
            return {
              ...r,
              featureEdits: r.featureEdits.filter(fe => !((fe.action === 'UPDATE' && fe.newValue.state === 'PLAN')
                || (fe.action === 'CREATE' && fe.tc.state === 'PLAN')))
            };
          })
          .filter(r => r.featureEdits.length > 0);
        return {
          content,
          totalElements: requests.length
        };
      })
    );
  }

  plan(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>> {
    return this.http.get<LocationFeatureEditingRequest[]>(
      `${API_FEATURES_REQUESTS}/${locationId}`,
    ).pipe(
      map(requests => {
        const content = requests
          .map(r => {
            return {
              ...r,
              featureEdits: r.featureEdits.filter(fe => (fe.action === 'UPDATE' && fe.newValue.state === 'PLAN')
                || (fe.action === 'CREATE' && fe.tc.state === 'PLAN'))
            };
          })
          .filter(r => r.featureEdits.length > 0);
        return {
          content,
          totalElements: requests.length
        };
      })
    );
  }

  requestsByUser(
    page: number,
    size: number,
    filters?: MunFilters
  ): Observable<Pageable<LocationFeatureEditingRequest[]>> {
    let params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString(),
      },
    });
    if (filters) {
      let keys = Object.keys(filters);
      keys.forEach((key) => {
        if (filters[key]) {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.http.get<Pageable<LocationFeatureEditingRequest[]>>(
      `${API_FEATURES_REQUESTS}/by-user`,
      {params}
    );
  }

  accept(reqId: number): Observable<void> {
    return this.http.get<void>(`${API_FEATURES_REQUESTS}/${reqId}/accept`);
  }

  decline(reqId: number, comment: string): Observable<void> {
    return this.http.get<void>(`${API_FEATURES_REQUESTS}/${reqId}/decline`, {params: {comment}});
  }

  requests(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequestFull[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.http.get<Pageable<LocationFeatureEditingRequestFull[]>>(
      `${API_FEATURES_REQUESTS}`,
      {params}
    );
  }

  requestsAndImportsAndEditions(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequestFull[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.http.get<Pageable<LocationFeatureEditingRequestFull[]>>(
      `${API_FEATURES_REQUESTS}/full`,
      {params}
    );
  }
}
