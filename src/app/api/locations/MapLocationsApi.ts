import {LatLngBounds} from 'leaflet';
import {MapLocation} from '../dto/MapLocation';
import {Observable} from 'rxjs';

export interface MapLocationsApi {
  getLocationsByBounds(bounds: LatLngBounds): Observable<MapLocation[]>;
  getLocations(): Observable<MapLocation[]>;
}

