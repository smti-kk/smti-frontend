import {PointsService} from './PointsService';
import {Observable, of} from 'rxjs';
import {MonitoringPoint} from './MonitoringPoint';
import {LatLngBounds} from 'leaflet';
import {shareReplay} from 'rxjs/operators';

/**
 * Предзагрузка всех точек
 */
export class PSFullPreloaded implements PointsService {
  private loadedFullPointsList$: Observable<MonitoringPoint[]>;
  private readonly origin: PointsService;

  constructor(origin: PointsService) {
    this.origin = origin;
    this.loadedFullPointsList$ = origin.getPoints().pipe(shareReplay());
    this.loadedFullPointsList$.subscribe(response => {});
  }

  getPoints(): Observable<MonitoringPoint[]> {
    return this.loadedFullPointsList$;
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.loadedFullPointsList$;
  }
}
