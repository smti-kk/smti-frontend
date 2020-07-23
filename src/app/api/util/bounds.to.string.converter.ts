import {BoundsConverter} from './bounds.converter';
import {LatLngBounds} from 'leaflet';

export class BoundsToStringConverter implements BoundsConverter<string> {
  convert(bounds: LatLngBounds): string {
    return `${bounds.getSouthWest().lng},${bounds.getSouthWest().lat},${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`;
  }
}
