import { Feature, GeoJsonProperties, MultiPoint, BBox } from 'geojson';
import { BaseModel } from '../../shared/models/base-model';

export interface LocationAreaProperties extends GeoJsonProperties {
  name: string;
  type: number;
  mark: number;
  mobileInternetMaxType: string;
  mobileMark: number;
}

export class LocationArea extends BaseModel implements Feature<MultiPoint, LocationAreaProperties> {
  private _type: 'Feature' = 'Feature';
  private _bbox?: BBox;

  private readonly _geometry: MultiPoint;
  private readonly _properties: LocationAreaProperties;

  constructor(geometry: MultiPoint,
              properties: LocationAreaProperties,
              id: number) {
    super(id);
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
}


