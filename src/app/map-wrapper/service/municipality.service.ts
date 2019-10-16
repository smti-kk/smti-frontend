import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import LocationArea from '../model/location-area';
import { HttpClient } from '@angular/common/http';
import { LOCATION_AREA_URL, LOCATION_SUMMARY_CAPABILITIES_URL } from '../constants/api.constants';
import LocationSummaryCapability from '@map-wrapper/model/location-summary-capability';

@Injectable()
export default class MunicipalityService {
  private _municipalitiesAreas: Subject<LocationArea[]> = new Subject<LocationArea[]>();
  private locationCapabilities: LocationSummaryCapability[];

  constructor(private http: HttpClient) {
    this.getMunicipalitiesArea().subscribe(municipalitiesArea => this.municipalitiesAreas.next(municipalitiesArea));
  }


  get municipalitiesAreas(): Subject<LocationArea[]> {
    return this._municipalitiesAreas;
  }

  getMunicipalitiesArea(): Observable<LocationArea[]> {
    return this.http
      .get<any[]>(LOCATION_AREA_URL)
      .pipe(map(locationAreas => locationAreas.map(la => LocationArea.createFromApiModel(la))));
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


