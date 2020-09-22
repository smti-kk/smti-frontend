import {PointsConverter} from '../points/PointsConverter';
import {AccessPointFromApi} from '@api/dto/AccessPointFromApi';
import {PointWithState} from '@service/points/PointWithState';
import {IconFromState} from '@service/access-points/IconFromState';

export class AccessPointsConverter implements PointsConverter<AccessPointFromApi> {
  private readonly iconFromState: IconFromState;

  constructor(iconFromState: IconFromState) {
    this.iconFromState = iconFromState;
  }

  convert(point: AccessPointFromApi): PointWithState {
    return new PointWithState(
      point.id,
      point.connectionState,
      point.point,
      {
        icon: this.iconFromState.icon(point.connectionState)
      }
    );
  }
}
