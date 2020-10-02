import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {Observable} from 'rxjs';
import {MonitoringPoint} from './MonitoringPoint';
import {map} from 'rxjs/operators';
import {Icon, LatLngBounds} from 'leaflet';
import {PointsService} from './PointsService';

export class BaseStationsPointsService implements PointsService {

  constructor(private baseStationsApi: BaseStationsApi) {
  }

  getPoints(): Observable<MonitoringPoint[]> {
    return this.baseStationsApi.list().pipe(
      map(stations => {
        return stations.map(station => new MonitoringPoint(
          station.id,
          station.point,
          {
            icon: new Icon({
              iconUrl: '/assets/base-station.svg',
              iconSize: [30, 41],
              iconAnchor: [15, 41],
              shadowUrl: '/assets/p-shadow.png',
              shadowSize: [30, 41],
              shadowAnchor:[15, 9]
            })
          },
          station
        ));
      })
    );
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.getPoints();
  }
}
