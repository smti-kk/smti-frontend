import { HttpClient, HttpParams } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { Injectable } from '@angular/core';
import { ACCESS_POINT_SMO_URL } from '@map-wrapper/constants/api.constants';
import { Observable } from 'rxjs';
import { AccessPointSmo } from '@map-wrapper/model/access-point-smo';
import { Deserialize } from 'cerialize';
import { map } from 'rxjs/operators';
import {Reaccesspoint} from '@core/models/reaccesspoint';

@Injectable()
export class SmoService {
  constructor(private httpClient: HttpClient) {
  }

  public list(): Observable<Reaccesspoint[]> {
    return this.httpClient
      .get(ACCESS_POINT_SMO_URL)
      .pipe(map(response => Deserialize(response, Reaccesspoint)));
  }

  public listFilteredByBounds(bounds: LatLngBounds): Observable<Reaccesspoint[]> {
    const params = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return this.httpClient
      .get(ACCESS_POINT_SMO_URL, {params})
      .pipe(map(response => Deserialize(response, Reaccesspoint)));
  }
}
