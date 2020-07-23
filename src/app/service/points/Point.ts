import {LatLngExpression, Marker, MarkerOptions} from 'leaflet';

export class Point extends Marker {
  private readonly id: number;

  constructor(id: number,
              latLng: LatLngExpression,
              options?: MarkerOptions) {
    super(latLng, options);
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }
}
