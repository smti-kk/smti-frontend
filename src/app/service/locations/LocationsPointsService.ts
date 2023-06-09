import {PointsService} from '../points/PointsService';
import {LatLngBounds} from 'leaflet';
import {Observable} from 'rxjs';
import {MonitoringPoint} from '../points/MonitoringPoint';
import {MapLocationsApi} from '@api/locations/MapLocationsApi';
import {map} from 'rxjs/operators';
import {PointsConverter} from '../points/PointsConverter';
import {MapLocation} from '@api/dto/MapLocation';

export class LocationsPointsService implements PointsService {
  constructor(private locationsApi: MapLocationsApi,
              private pointsConverter: PointsConverter<MapLocation>) {
  }

  getPointsByBounds(bounds: LatLngBounds): Observable<MonitoringPoint[]> {
    return this.locationsApi.getLocationsByBounds(bounds).pipe(
      map(value => {
        return value.map(p => this.pointsConverter.convert(p));
      })
    );
  }

  getPoints(): Observable<MonitoringPoint[]> {
    return this.locationsApi.getLocations().pipe(
      map(value => {
        return value.map(p => this.pointsConverter.convert(p));
      })
    );
  }
}
