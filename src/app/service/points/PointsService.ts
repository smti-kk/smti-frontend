import {Observable} from 'rxjs';
import {MonitoringPoint} from './MonitoringPoint';
import {LatLngBounds} from 'leaflet';

export interface PointsService {
  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]>;
  getPoints(): Observable<MonitoringPoint[]>;
}
