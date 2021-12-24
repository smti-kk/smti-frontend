import {MapAccessPointsApi} from './MapAccessPointsApi';
import {Observable} from 'rxjs';
import {AccessPointFromApi} from '../dto/AccessPointFromApi';
import {LatLngBounds} from 'leaflet';
import {AccessPointsModificationsApi} from './AccessPointsModificationsApi';
import {DateConverter} from '../util/DateConverter';
import {PointState} from '@service/points/PointState';
import {map} from 'rxjs/operators';

/**
 * Декоратор, возвращать только измененные точки подключения
 */
export class MAPAWithModificationsOnlyAndIgnoreBounds implements MapAccessPointsApi {
  private readonly origin: MapAccessPointsApi;
  private readonly modificationsApi: AccessPointsModificationsApi;
  private readonly dateConverter: DateConverter;
  private lastRequestDate: Date;
  pointFilter: PointState;

  constructor(origin: MapAccessPointsApi,
              modificationsApi: AccessPointsModificationsApi,
              dateConverter: DateConverter, pointFilter?: PointState) {
    this.origin = origin;
    this.modificationsApi = modificationsApi;
    this.dateConverter = dateConverter;
    this.pointFilter = pointFilter
  }

  get(type: string): Observable<AccessPointFromApi[]> {
    if (!this.lastRequestDate) {
      this.lastRequestDate = new Date();
      return this.origin.get(type).pipe(map(points => points.filter(p => {
        if (!this.pointFilter) {
          return true
        }
        return p.connectionState === this.pointFilter
      })));
    }
    this.lastRequestDate = new Date();
    return this.modificationsApi.getModifiedAfterDate(
      this.dateConverter.convert(this.lastRequestDate),
      type
    );
  }

  getByBounds(bounds: LatLngBounds, type: string): Observable<AccessPointFromApi[]> {
    return this.get(type);
  }
}
