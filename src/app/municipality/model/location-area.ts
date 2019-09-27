import { Feature, GeoJsonProperties, Geometry } from 'geojson';

export default class LocationArea implements Feature<Geometry, GeoJsonProperties> {
  private _type: 'Feature' = 'Feature';
  private _bbox?: import('geojson').BBox;

  constructor(private _geometry: any,
              private _properties: {
                name: string,
                type: number,
                mark: number,
                mobileInternetMaxType: string,
                mobileMark: number,
              },
              private _id: number) {
  }

  get geometry(): any {
    return this._geometry;
  }

  get properties(): { name: string; type: number; mark: number; mobileInternetMaxType: string; mobileMark: number } {
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
