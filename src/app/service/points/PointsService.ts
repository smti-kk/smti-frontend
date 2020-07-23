import {Observable} from 'rxjs';
import {Point} from './Point';
import {LatLngBounds} from 'leaflet';

export interface PointsService {
  getPointsByBounds(bounds: LatLngBounds): Observable<Point[]>;
  getPoints(): Observable<Point[]>;
}
