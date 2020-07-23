import {PointsService} from './PointsService';
import {Observable, of} from 'rxjs';
import {Point} from './Point';
import {LatLngBounds} from 'leaflet';

/**
 * Предзагрузка всех точек
 */
export class PSFullPreloaded implements PointsService {
  private loadedFullPointsList: Point[];
  private readonly origin: PointsService;

  constructor(origin: PointsService) {
    this.origin = origin;
    origin.getPoints().subscribe(points => {
      this.loadedFullPointsList = points;
    });
  }

  getPoints(): Observable<Point[]> {
    if (this.loadedFullPointsList) {
      return of(this.loadedFullPointsList);
    } else {
      return this.origin.getPoints();
    }
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<Point[]> {
    if (this.loadedFullPointsList) {
      return of(this.loadedFullPointsList);
    } else {
      return this.origin.getPointsByBounds(bounds);
    }
  }
}
