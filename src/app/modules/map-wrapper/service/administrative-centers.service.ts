import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LatLngBounds} from 'leaflet';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {Observable} from 'rxjs';

import {AdministrativeCenterPoint} from '@map-wrapper/model/administrative-center-point';

import {LOCATION_URL} from '../constants/api.constants';

@Injectable()
export class AdministrativeCentersService {
  constructor(private httpClient: HttpClient) {}

  listFilteredByBounds(bounds: LatLngBounds): Observable<AdministrativeCenterPoint[]> {
    const params = new HttpParams().set(
      'bbox',
      `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${
        bounds.getNorthEast().lat
      }`
    );

    return this.httpClient
      .get(LOCATION_URL, {params})
      .pipe(map(response => Deserialize(response, AdministrativeCenterPoint)));
  }

  listFilteredByArea(areaId): Observable<AdministrativeCenterPoint[]> {
    const params = new HttpParams().set('parent', areaId.toString());

    return this.httpClient
      .get(LOCATION_URL, {params})
      .pipe(map(response => Deserialize(response, AdministrativeCenterPoint)));
  }
}
