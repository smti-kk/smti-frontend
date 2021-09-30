import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {LatLngBounds} from 'leaflet';
import {PointsService} from '../points/PointsService';
import {PointsConverter} from '../points/PointsConverter';
import {map} from 'rxjs/operators';
import {MapAccessPointsApi} from '@api/access-points/MapAccessPointsApi';
import {AccessPointFromApi} from '@api/dto/AccessPointFromApi';

export class ZSPDPointsService implements PointsService {
  constructor(private accessPointsApi: MapAccessPointsApi,
              private pointsConverter: PointsConverter<AccessPointFromApi>) {
  }

  getPoints(): Observable<MonitoringPoint[]> {
    return this.accessPointsApi.get('ZSPD').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.accessPointsApi.getByBounds(bounds, 'ZSPD').pipe(
      map(points => points.map(point => this.pointsConverter.convert(point)))
    );
  }
}
