import { Coordinate } from '../interface/coordinate';
import { autoserializeAs } from 'cerialize';

export const COORDINATE_DESERIALIZER = {
  Deserialize(point: {coordinates: [number, number]}): Coordinate {
    return {
      lat: point.coordinates[1],
      lng: point.coordinates[0]
    };
  }
};

export abstract class MonitoringPoint {

  @autoserializeAs(COORDINATE_DESERIALIZER, 'point')
  private _point: Coordinate;

  @autoserializeAs('id')
  private readonly _id: number;

  protected constructor(point: Coordinate, id: number) {
    this._point = point;
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get point(): Coordinate {
    return this._point;
  }

  set point(value: Coordinate) {
    this._point = value;
  }

  abstract get iconUrl();

  public static OnDeserialized(instance: MonitoringPoint, json: any): void {
    if (!instance._point && json.geo_data) {
      instance.point = COORDINATE_DESERIALIZER.Deserialize(json.geo_data);
    }
  }
}
