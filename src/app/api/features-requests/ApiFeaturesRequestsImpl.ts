import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest, LocationFeatureEditingRequestFull} from '../dto/LocationFeatureEditingRequest';
import {ApiFeaturesRequests} from './ApiFeaturesRequests';
import {HttpClient} from '@angular/common/http';
import {API_FEATURES_REQUESTS} from '../../../environments/api.routes';
import {map} from 'rxjs/operators';

export class ApiFeaturesRequestsImpl implements ApiFeaturesRequests {

  constructor(private readonly http: HttpClient) {
  }

  requestsByLocation(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`);
  }

  archive(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`).pipe(
      map(requests => {
        return requests
          .map(r => {
            return {
              ...r,
              featureEdits: r.featureEdits.filter(fe => !((fe.action === 'UPDATE' && fe.newValue.state === 'PLAN')
                || (fe.action === 'CREATE' && fe.tc.state === 'PLAN')))
            };
          })
          .filter(r => r.featureEdits.length > 0);
      })
    );
  }

  plan(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`).pipe(
      map(requests => {
        return requests
          .map(r => {
            return {
              ...r,
              featureEdits: r.featureEdits.filter(fe => (fe.action === 'UPDATE' && fe.newValue.state === 'PLAN')
                || (fe.action === 'CREATE' && fe.tc.state === 'PLAN'))
            };
          })
          .filter(r => r.featureEdits.length > 0);
      })
    );
  }

  requestsByUser(): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/by-user`);
  }

  accept(reqId: number): Observable<void> {
    return this.http.get<void>(`${API_FEATURES_REQUESTS}/${reqId}/accept`);
  }

  decline(reqId: number, comment: string): Observable<void> {
    return this.http.get<void>(`${API_FEATURES_REQUESTS}/${reqId}/decline`, {params: {comment}});
  }

  requests(): Observable<LocationFeatureEditingRequestFull[]> {
    return this.http.get<LocationFeatureEditingRequestFull[]>(`${API_FEATURES_REQUESTS}`);
  }
}
