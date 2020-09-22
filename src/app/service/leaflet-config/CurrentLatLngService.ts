import {Observable, of} from 'rxjs';
import {LatLng} from 'leaflet';
import {IpInfoApi} from '@api/ip-info.api';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {KrasnoyarskLatLng} from '../../ui/map-page/map/krasnoyarsk.lat.lng';
import {LatLngFromApiConverter} from '../util/LatLngFromApiConverter';

export abstract class CurrentLatLngService {
  abstract get(): Observable<LatLng>;
}

@Injectable()
export class CurrentLatLngServiceImpl implements CurrentLatLngService {
  constructor(private ipInfoApi: IpInfoApi,
              private latLngFromApiConverter: LatLngFromApiConverter) {
  }

  get(): Observable<LatLng> {
    return this.ipInfoApi.get().pipe(
      map(value => this.latLngFromApiConverter.convert(value)),
      catchError(() => of(new KrasnoyarskLatLng()))
    );
  }
}
