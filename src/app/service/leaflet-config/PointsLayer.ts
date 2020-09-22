import {LatLngBounds, Map} from 'leaflet';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';

export abstract class PointsLayer {
  abstract reloadByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]>;
  abstract addToMap(map: Map): boolean;
  abstract removeFromMap(map: Map): boolean;
  abstract moveToPoint(id: number): void;
}

