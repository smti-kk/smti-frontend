import {HttpClient} from '@angular/common/http';
import {BoundsConverter} from '../util/bounds.converter';
import {LatLngBounds} from 'leaflet';
import {Observable} from 'rxjs';
import {MapLocation} from '../dto/MapLocation';
import {MAP_LOCATIONS_API} from '../../../environments/api.routes';
import {MapLocationsApi} from './MapLocationsApi';
import { map } from 'rxjs/operators';

export class MapLocationsApiWithoutCellular implements MapLocationsApi {
    private readonly httpClient: HttpClient;
    private readonly boundsConverter: BoundsConverter<string>;

    constructor(httpClient: HttpClient,
                boundsConverter: BoundsConverter<string>) {
        this.httpClient = httpClient;
        this.boundsConverter = boundsConverter;
    }

    getLocationsByBounds(bounds: LatLngBounds): Observable<MapLocation[]> {
      return this.httpClient
        .get<MapLocation[]>(MAP_LOCATIONS_API + '/without-cellular')
        .pipe(
          map((locations) =>
            locations.map((location) => {
              return { ...location, qualities: ['ABSENT'] };
            })
          )
        );
    }

    getLocations(): Observable<MapLocation[]> {
      return this.httpClient
        .get<MapLocation[]>(MAP_LOCATIONS_API + '/without-cellular')
        .pipe(
          map((locations) =>
            locations.map((location) => {
              return { ...location, qualities: ['ABSENT'] };
            })
          )
        );
    }
}
