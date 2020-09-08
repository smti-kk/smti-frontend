import {HttpClient} from '@angular/common/http';
import {MapAccessPointsApi} from './MapAccessPointsApi';
import {AccessPointFromApi} from '../dto/AccessPointFromApi';
import {Observable} from 'rxjs';
import {LatLngBounds} from 'leaflet';
import {MAP_ACCESS_POINTS_API} from '../../../environments/api.routes';
import {BoundsToStringConverter} from '../util/bounds.to.string.converter';

export class MapAccessPointsApiImpl implements MapAccessPointsApi {
  constructor(private httpClient: HttpClient,
              private boundsToStringConverter: BoundsToStringConverter) {
    // const socket = new WebSocket(ACCESS_POINTS_SOCKET);
    // socket.onopen = (e) => {
    //   console.log('telecom connnected');
    //   socket.onmessage = (message) => {
    //     console.log(message, 'Данные получены с сервера');
    //   };
    // };
    // const socket = webSocket(ACCESS_POINTS_SOCKET).subscribe(message => {
    //   console.log(message);
    // });
  }

  get(type: string): Observable<AccessPointFromApi[]> {
    return this.httpClient.get<AccessPointFromApi[]>(MAP_ACCESS_POINTS_API,
      {
        params: {type}
      }
    );
  }

  getByBounds(bounds: LatLngBounds, type: string): Observable<AccessPointFromApi[]> {
    return this.httpClient.get<AccessPointFromApi[]>(MAP_ACCESS_POINTS_API,
      {
        params: {
          type,
          bbox: this.boundsToStringConverter.convert(bounds)
        }
      }
    );
  }
}
