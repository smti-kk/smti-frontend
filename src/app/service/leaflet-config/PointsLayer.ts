import {LatLngBounds, Map} from 'leaflet';
import {Observable} from 'rxjs';
import {Point} from '../points/Point';

export abstract class PointsLayer {
  abstract reloadByBounds(bounds: LatLngBounds): Observable<Point[]>;
  abstract addToMap(map: Map): void;
  abstract removeFromMap(map: Map): void;
  abstract moveToPoint(id: number): void;
}

