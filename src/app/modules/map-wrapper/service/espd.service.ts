import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { ACCESS_POINT_ESPD_URL } from '@map-wrapper/constants/api.constants';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { AccessPointEspd } from '@map-wrapper/model/access-point-espd';
import { Observable } from 'rxjs';

@Injectable()
export class EspdService {
  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<AccessPointEspd[]> {
    return this.httpClient
      .get(ACCESS_POINT_ESPD_URL)
      .pipe(map(response => Deserialize(response, AccessPointEspd)));
  }

  public listFilteredByBounds(bounds: LatLngBounds): Observable<AccessPointEspd[]> {
    const params = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return this.httpClient
      .get(ACCESS_POINT_ESPD_URL, {params})
      .pipe(map(response => Deserialize(response, AccessPointEspd)));
  }
}
