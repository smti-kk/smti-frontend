// eslint-disable-next-line import/no-unresolved
import {BBox, Feature, MultiPoint} from 'geojson';
import {autoserializeAs} from 'cerialize';

import {LocationAreaProperties} from '@map-wrapper/model/location-area-properties';

const BORDER_GEO_JSON_DESERIALIZE = {
  Deserialize(point): MultiPoint {
    if (typeof point === 'string') {
      return JSON.parse(point);
    }
    return point;
  },
};

export class LocationArea implements Feature<MultiPoint, LocationAreaProperties> {
  private _type: 'Feature' = 'Feature';

  private _bbox?: BBox;

  @autoserializeAs('full_name')
  private readonly _name: string;

  @autoserializeAs(BORDER_GEO_JSON_DESERIALIZE, 'border_geojson')
  private readonly _geometry: MultiPoint;

  @autoserializeAs(LocationAreaProperties, 'properties')
  private readonly _properties: LocationAreaProperties;

  @autoserializeAs('id')
  private readonly _id: number;

  constructor(geometry: MultiPoint, properties: LocationAreaProperties, id: number) {
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

  get name(): string {
    return this._name;
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
