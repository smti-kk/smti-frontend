import { Feature, GeoJsonProperties, MultiPoint, BBox } from 'geojson';

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

  constructor(_geometry: MultiPoint,
              private _properties: LocationAreaProperties,
              private _id: number) {
    this._geometry = _geometry;
  }

  get geometry(): MultiPoint {
    return this._geometry;
  }

  get properties(): LocationAreaProperties {
    return this._properties;
  }

  get id(): number {
    return this._id;
  }

  get type(): 'Feature' {
    return this._type;
  }

  get bbox(): [number, number, number, number] | [number, number, number, number, number, number] {
    return this._bbox;
  }

  static createFromApiModel(apiModel): LocationArea {
    return new LocationArea(
      JSON.parse(apiModel.border_geojson),
      {
        name: apiModel.full_name,
        type: 0,
        mobileInternetMaxType: apiModel.properties ? apiModel.properties.mobileInternetMaxType : null,
        mark: apiModel.properties ? apiModel.properties.mark : null,
        mobileMark: apiModel.properties ? apiModel.properties.mobile_mark : null
      },
      apiModel.id
    );
  }
}


