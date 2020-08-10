import {LocationFeatures} from './LocationFeatures';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LOCATION_FEATURES} from '../../../environments/api.routes';
import {LocationFeaturesSaveRequest} from '../dto/LocationDetail';

export class LocationFeaturesImpl implements LocationFeatures {

  constructor(private readonly httpClient: HttpClient) {
  }

  saveAll(request: LocationFeaturesSaveRequest, locationId: number): Observable<void> {
    return this.httpClient.post<void>(`${LOCATION_FEATURES}/${locationId}`, request);
  }

  sendRequest(features: LocationFeaturesSaveRequest, locationId: number): Observable<void> {
    return this.httpClient.post<void>(`${LOCATION_FEATURES}/${locationId}/request`, features);
  }
}
