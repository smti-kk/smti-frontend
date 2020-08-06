import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest} from '../dto/LocationFeatureEditingRequest';
import {ApiFeaturesRequests} from './ApiFeaturesRequests';
import {HttpClient} from '@angular/common/http';
import {API_FEATURES_REQUESTS} from '../../../environments/api.routes';
import {map} from 'rxjs/operators';

export class ApiFeaturesRequestsImpl implements ApiFeaturesRequests {

  constructor(private readonly http: HttpClient) {
  }

  requests(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`);
  }

  archive(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`).pipe(
      map(requests => {
        return requests
          .map(r => {
            return {
              ...r,
              featureEdits: r.featureEdits.filter(fe => !(fe.action === 'UPDATE' && fe.newValue.state === 'PLAN'))
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
              featureEdits: r.featureEdits.filter(fe => fe.action === 'UPDATE' && fe.newValue.state === 'PLAN')
            };
          })
          .filter(r => r.featureEdits.length > 0);
      })
    );
  }
}
