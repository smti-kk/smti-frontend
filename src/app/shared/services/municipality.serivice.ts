import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import LocationArea from '../model/location-area';
import { HttpClient } from '@angular/common/http';
import { LOCATION_AREA_URL, LOCATION_SUMMARY_CAPABILITIES_URL } from './api.constants';
import LocationSummaryCapability from '../model/location-summary-capability';

@Injectable()
export default class MunicipalityService {
  private locationAreas: LocationArea[];
  private locationCapabilities: LocationSummaryCapability[];

  constructor(private http: HttpClient) {
  }

  getMunicipalitiesArea(ifCached = true): Observable<LocationArea[]> {
    if (!this.locationAreas || !ifCached) {
      return this.http.get<any[]>(LOCATION_AREA_URL)
        .pipe(map(locationAreas => {
          this.locationAreas = locationAreas.map(la => LocationArea.createFromApiModel(la));
          return this.locationAreas;
        }));
    } else {
      return of(this.locationAreas);
    }
  }

  getLocationCapabilities(showEmpty = true, ifCached = true): Observable<LocationSummaryCapability[]> {
    if (!this.locationCapabilities || !ifCached) {
      return this.http.get<any[]>(LOCATION_SUMMARY_CAPABILITIES_URL + showEmpty)
        .pipe(map(lscList => {
          this.locationCapabilities = lscList.map(lsc => LocationSummaryCapability.createFromApiModel(lsc));
          return this.locationCapabilities;
        }));
    } else {
      return of(this.locationCapabilities);
    }
  }
}
