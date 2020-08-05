import {LatLngBounds} from 'leaflet';
import {MapLocation} from '../dto/MapLocation';
import {Observable} from 'rxjs';

export abstract class MapLocationsApi {
  abstract getLocationsByBounds(bounds: LatLngBounds): Observable<MapLocation[]>;
  abstract getLocations(): Observable<MapLocation[]>;
}

