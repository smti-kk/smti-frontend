import { BBox, Feature, GeoJsonProperties, MultiPoint } from 'geojson';

export interface LocationAreaProperties extends GeoJsonProperties {
  name: string;
  type: number;
  mark: number;
  mobileInternetMaxType: string;
  mobileMark: number;
}

export class LocationArea implements Feature<MultiPoint, LocationAreaProperties> {
  private _type: 'Feature' = 'Feature';
  private _bbox?: BBox;

  private readonly _geometry: MultiPoint;
  private readonly _properties: LocationAreaProperties;
  private readonly _id: number;

  constructor(geometry: MultiPoint,
              properties: LocationAreaProperties,
              id: number) {
    this._id = id;
    this._geometry = geometry;
    this._properties = properties;
  }

  get geometry(): MultiPoint {
    return this._geometry;
  }

  get properties(): LocationAreaProperties {
    return this._properties;
  }

  get type(): 'Feature' {
    return this._type;
  }

  get bbox(): [number, number, number, number] | [number, number, number, number, number, number] {
    return this._bbox;
  }

  get id(): number {
    return this._id;
  }
}


