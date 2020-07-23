import {Observable} from 'rxjs';
import {Point} from '../points/Point';
import {LatLngBounds} from 'leaflet';
import {PointsService} from '../points/PointsService';
import {MapAccessPointsApi} from '@api/access-points/MapAccessPointsApi';
import {PointsConverter} from '../points/PointsConverter';
import {AccessPointFromApi} from '@api/dto/AccessPointFromApi';
import {map} from 'rxjs/operators';

export class ESPDPointsService implements PointsService {
  constructor(private accessPointsApi: MapAccessPointsApi,
              private pointsConverter: PointsConverter<AccessPointFromApi>) {
  }

  getPoints(): Observable<Point[]> {
    return this.accessPointsApi.get('ESPD').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<Point[]> {
    return this.accessPointsApi.getByBounds(bounds, 'ESPD').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }
}
