import {PointsLayer} from './PointsLayer';
import {LatLngBounds, Map} from 'leaflet';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {tap} from 'rxjs/operators';

export class PLWithLoader implements PointsLayer {
  private readonly origin: PointsLayer;
  private map: Map;

  constructor(origin: PointsLayer) {
    this.origin = origin;
  }

  addToMap(map: Map): boolean {
    this.map = map;
    return this.origin.addToMap(map);
  }

  reloadByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    if (!this.map) {
      return this.origin.reloadByBounds(bounds);
    }
    this.map.spin(true);
    return this.origin.reloadByBounds(bounds).pipe(
      tap(() => {
        this.map.spin(false);
      }, () => {
        this.map.spin(false);
      })
    );
  }

  removeFromMap(map: Map): boolean {
    return this.origin.removeFromMap(map);
  }

  moveToPoint(id: number): void {
    this.origin.moveToPoint(id);
  }
}
