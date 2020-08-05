import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {Observable} from 'rxjs';
import {Point} from './Point';
import {map} from 'rxjs/operators';
import {Icon, LatLngBounds} from 'leaflet';
import {PointsService} from './PointsService';

export class BaseStationsPointsService implements PointsService {

    constructor(private baseStationsApi: BaseStationsApi) {
    }

    getPoints(): Observable<Point[]> {
        return this.baseStationsApi.list().pipe(
            map(stations => {
                return stations.map(station => new Point(
                    station.id,
                    station.point,
                    {
                        icon: new Icon({iconUrl: '/assets/base-station.svg', iconSize: [30, 41]})
                    }
                ));
            })
        );
    }

    getPointsByBounds(bounds: LatLngBounds): Observable<Point[]> {
        return this.getPoints();
    }
}
