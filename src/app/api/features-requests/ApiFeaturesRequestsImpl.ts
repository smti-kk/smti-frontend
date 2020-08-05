import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest} from '../dto/LocationFeatureEditingRequest';
import {ApiFeaturesRequests} from './ApiFeaturesRequests';
import {HttpClient} from '@angular/common/http';
import {API_FEATURES_REQUESTS} from '../../../environments/api.routes';

export class ApiFeaturesRequestsImpl implements ApiFeaturesRequests {

  constructor(private readonly http: HttpClient) {
  }

  requests(locationId: number): Observable<LocationFeatureEditingRequest[]> {
    return this.http.get<LocationFeatureEditingRequest[]>(`${API_FEATURES_REQUESTS}/${locationId}`);
  }
}
