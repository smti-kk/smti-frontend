import {LatLngBounds} from 'leaflet';

export abstract class BoundsConverter<T> {
  abstract convert(bounds: LatLngBounds): T;
}
