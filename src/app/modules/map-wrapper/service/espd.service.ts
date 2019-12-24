import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { ACCESS_POINT_ESPD_URL } from '@map-wrapper/constants/api.constants';
import {map, tap} from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import {Observable, pipe} from 'rxjs';
import { Reaccesspoint } from '@core/models/reaccesspoint';

@Injectable()
export class EspdService {
  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<Reaccesspoint[]> {
    return this.httpClient
      .get(ACCESS_POINT_ESPD_URL)
      .pipe(map(response => Deserialize(response, Reaccesspoint)));
  }

  public listFilteredByBounds(bounds: LatLngBounds): Observable<Reaccesspoint[]> {
    const params = new HttpParams()
      .set('bbox', `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`);

    return this.httpClient
      .get(ACCESS_POINT_ESPD_URL, {params})
      .pipe(tap(response => {
        // @ts-ignore
        const und = response.find(item => item.point === undefined);
        if (und) {
          console.log(und);
        }
      }))
      .pipe(map(response => Deserialize(response, Reaccesspoint)));
  }
}
