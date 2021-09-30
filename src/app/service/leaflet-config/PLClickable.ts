import {PointsLayer} from './PointsLayer';
import {LatLngBounds, Map} from 'leaflet';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';
import {tap} from 'rxjs/operators';
import {MonitoringPoint} from '../points/MonitoringPoint';

export class PLClickable implements PointsLayer {
  private readonly origin: PointsLayer;
  private readonly onMarkerClick: EventEmitter<number>;

  constructor(origin: PointsLayer) {
    this.origin = origin;
    this.onMarkerClick = new EventEmitter<number>();
  }

  addToMap(map: Map): boolean {
    return this.origin.addToMap(map);
  }

  removeFromMap(map: Map): boolean {
    return this.origin.removeFromMap(map);
  }

  reloadByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.origin.reloadByBounds(bounds).pipe(
      tap(points => {
        points.forEach(p => p.addEventListener(
          'click',
          () => this.onMarkerClick.emit(p.getId())
        ));
      })
    );
  }

  onPointClick(): EventEmitter<number> {
    return this.onMarkerClick;
  }

  moveToPoint(id: number): void {
    this.origin.moveToPoint(id);
  }
}
