import {LatLngBounds} from 'leaflet';
import {Observable} from 'rxjs';
import {Point} from './Point';
import {PointsService} from './PointsService';
import {map} from 'rxjs/operators';
import {PointUniquenessFilter} from '@service/points/PointUniquenessFilter';

/**
 * Декоратор, который возвращает обьекты, которых ранее не было
 */
export class PSWithUniqueResponseParts implements PointsService {
  private readonly origin: PointsService;
  private readonly uniquenessFilter: PointUniquenessFilter;

  constructor(origin: PointsService,
              uniquenessFilter: PointUniquenessFilter) {
    this.origin = origin;
    this.uniquenessFilter = uniquenessFilter;
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<Point[]> {
    return this.origin.getPointsByBounds(bounds).pipe(
      map(points => this.uniquenessFilter.filter(points))
    );
  }

  getPoints(): Observable<Point[]> {
    return this.origin.getPoints().pipe(
      map(points => this.uniquenessFilter.filter(points))
    );
  }
}
