import {BBox, Feature, MultiPoint} from 'geojson';

export class LocationArea implements Feature<MultiPoint, any> {
  type: 'Feature' = 'Feature';
  bbox?: BBox;
  name: string;
  geometry: MultiPoint;
  properties: any;
  id: number;

  constructor(geometry: MultiPoint,
              properties: any,
              id: number) {
    this.id = id;
    this.geometry = geometry;
    this.properties = properties;
  }
}
