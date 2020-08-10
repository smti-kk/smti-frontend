import {PointsService} from './PointsService';
import {Observable, of} from 'rxjs';
import {MonitoringPoint} from './MonitoringPoint';
import {LatLngBounds} from 'leaflet';

/**
 * Предзагрузка всех точек
 */
export class PSFullPreloaded implements PointsService {
  private loadedFullPointsList: MonitoringPoint[];
  private readonly origin: PointsService;

  constructor(origin: PointsService) {
    this.origin = origin;
    origin.getPoints().subscribe(points => {
      this.loadedFullPointsList = points;
    });
  }

  getPoints(): Observable<MonitoringPoint[]> {
    if (this.loadedFullPointsList) {
      return of(this.loadedFullPointsList);
    } else {
      return this.origin.getPoints();
    }
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    if (this.loadedFullPointsList) {
      return of(this.loadedFullPointsList);
    } else {
      return this.origin.getPointsByBounds(bounds);
    }
  }
}
