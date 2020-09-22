import {Observable} from 'rxjs';
import {LatLngBounds} from 'leaflet';
import {AccessPointFromApi} from '../dto/AccessPointFromApi';

export interface MapAccessPointsApi {
  get(type: string): Observable<AccessPointFromApi[]>;
  getByBounds(bounds: LatLngBounds, type: string): Observable<AccessPointFromApi[]>;
}
