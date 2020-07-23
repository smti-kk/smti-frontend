import {Observable} from 'rxjs';
import {Point} from '../points/Point';
import {LatLngBounds} from 'leaflet';
import {PointsService} from '../points/PointsService';
import {PointsConverter} from '../points/PointsConverter';
import {map} from 'rxjs/operators';
import {MapAccessPointsApi} from '@api/access-points/MapAccessPointsApi';
import {AccessPointFromApi} from '@api/dto/AccessPointFromApi';

export class SMOPointsService implements PointsService {
  constructor(private accessPointsApi: MapAccessPointsApi,
              private pointsConverter: PointsConverter<AccessPointFromApi>) {
  }

  getPoints(): Observable<Point[]> {
    return this.accessPointsApi.get('SMO').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<Point[]> {
    return this.accessPointsApi.getByBounds(bounds, 'SMO').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }
}
