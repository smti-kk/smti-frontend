import { MapLocationsApi } from './MapLocationsApi';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { MapLocation, MapLocationWithQuality } from '../dto/MapLocation';
import { BoundsConverter } from '../util/bounds.converter';
import { MAP_LOCATIONS_API } from '../../../environments/api.routes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quality } from '@api/dto/Quality';

const locationDT = ({id, location, qualities}: MapLocationWithQuality): MapLocation => ({
  name: location.name,
  type: location.type,
  id: location.locationId,
  qualities: qualities ? qualities.split(', ') as Quality[] : [] ,
  parent: {
    id: location.parent.parentId,
    name: location.parent.parentName,
    type: location.parent.parentType,
  },
  geoData: {
    id: location.geoData.geoId,
    administrativeCenter: location.geoData.administrativeCenter,
  },
});

export class MapLocationsApiImplWithQuality implements MapLocationsApi {
  private readonly httpClient: HttpClient;
  private readonly boundsConverter: BoundsConverter<string>;

  constructor(
    httpClient: HttpClient,
    boundsConverter: BoundsConverter<string>
  ) {
    this.httpClient = httpClient;
    this.boundsConverter = boundsConverter;
  }

  getLocationsByBounds(bounds: LatLngBounds): Observable<MapLocation[]> {
    const params = new HttpParams().set(
      'bbox',
      this.boundsConverter.convert(bounds)
    );
    return this.httpClient
      .get<MapLocationWithQuality[]>(MAP_LOCATIONS_API + '/with-quality', {
        params,
      })
      .pipe(map((locations) => locations.map(locationDT)));
  }

  getLocations(): Observable<MapLocation[]> {
    return this.httpClient
      .get<MapLocationWithQuality[]>(MAP_LOCATIONS_API + '/with-quality')
      .pipe(map((locations) => locations.map(locationDT)));
  }
}
