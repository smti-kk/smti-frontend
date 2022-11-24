import {LatLngExpression, Marker, MarkerOptions} from 'leaflet';

export class MonitoringPoint extends Marker {
  private readonly id: number;
  private readonly origin: any;
  private readonly markerOptions?: MarkerOptions

  constructor(id: number,
              latLng: LatLngExpression,
              options?: MarkerOptions,
              origin?: any) {
    // @ts-ignore
    super(latLng, {...options});
    this.markerOptions = options;
    this.origin = origin;
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public getOrigin<T>(): T {
    return this.origin as T;
  }

  public getIconClassName(): string | undefined {
    return this.markerOptions?.icon.options?.className
  }
}
