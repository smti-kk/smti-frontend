import {autoserializeAs} from 'cerialize';

import {Coordinate} from '../interface/coordinate';

export const COORDINATE_DESERIALIZER = {
  Deserialize(point: {coordinates: [number, number]}): Coordinate {
    return {
      lat: point.coordinates[1],
      lng: point.coordinates[0],
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Serialize(point: Coordinate): string {
    // todo убрать заглушку
    return 'SRID=4326;POINT (90.9261111 56.8919444)';
  },
};

export abstract class MonitoringPoint {
  @autoserializeAs(COORDINATE_DESERIALIZER, 'point')
  private _point: Coordinate;

  @autoserializeAs('id')
  private readonly _id: number;

  constructor(point: Coordinate, id: number) {
    this._point = point;
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  get point(): Coordinate {
    return this._point;
  }

  set point(value: Coordinate) {
    this._point = value;
  }

  abstract get iconUrl();

  // noinspection JSUnusedGlobalSymbols
  public static OnDeserialized(
    instance: MonitoringPoint,
    json: {geo_data: {coordinates: [number, number]}}
  ): void {
    if (!instance._point && json.geo_data) {
      // eslint-disable-next-line no-param-reassign
      instance.point = COORDINATE_DESERIALIZER.Deserialize(json.geo_data);
    }
  }
}
