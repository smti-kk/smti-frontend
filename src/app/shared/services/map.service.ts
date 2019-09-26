import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HttpClient } from '@angular/common/http';
import LocationSummaryCapability from '../../model/location-summary-capability';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: SharedModule
})
export default class MapService {
  constructor(private http: HttpClient) {
  }

  getOperators() {
    return this.http.get('api/v1/operator');
  }

  getMobileType() {
    return this.http.get('api/v1/mobile-type');
  }

  getLocationCapabilities(showEmpty = true): Observable<LocationSummaryCapability[]> {
    return this.http.get<any[]>('api/v1/location-summary-capabilities/?showempty=' + showEmpty)
      .pipe(map(lscList => lscList.map(lsc => LocationSummaryCapability.createFromApiModel(lsc))));
  }

  getLocationArea() {
    return this.http.get('api/v1/location-area');
  }
}
