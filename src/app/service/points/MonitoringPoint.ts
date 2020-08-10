import {LatLngExpression, Marker, MarkerOptions} from 'leaflet';

export class MonitoringPoint extends Marker {
  private readonly id: number;
  private readonly origin: any;

  constructor(id: number,
              latLng: LatLngExpression,
              options?: MarkerOptions,
              origin?: any) {
    super(latLng, options);
    this.origin = origin;
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public getOrigin<T>(): T {
    return this.origin as T;
  }
}
