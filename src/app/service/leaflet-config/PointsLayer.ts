import {LatLngBounds, Map} from 'leaflet';
import {Observable} from 'rxjs';
import {Point} from '../points/Point';

export abstract class PointsLayer {
  abstract reloadByBounds(bounds: LatLngBounds): Observable<Point[]>;
  abstract addToMap(map: Map): boolean;
  abstract removeFromMap(map: Map): boolean;
  abstract moveToPoint(id: number): void;
}

