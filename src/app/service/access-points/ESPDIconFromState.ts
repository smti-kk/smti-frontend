import {IconFromState} from './IconFromState';
import {Icon} from 'leaflet';
import {PointState} from '../points/PointState';

export class ESPDIconFromState implements IconFromState {
  private readonly ICON_ACTIVE_URL = '/assets/ЕСПД_1.svg';
  private readonly ICON_ICON_DISABLED_URL = '/assets/ЕСПД_2.svg';
  private readonly ICON_SPASI_NAS_GOSPOD_URL = '/assets/ЕСПД_3.svg';

  icon(state: PointState): Icon {
    let iconUrl;
    if (state) {
      iconUrl = this.ICON_ACTIVE_URL;
    } else if (state === false) {
      iconUrl = this.ICON_ICON_DISABLED_URL;
    } else {
      iconUrl = this.ICON_SPASI_NAS_GOSPOD_URL;
    }
    return new Icon({iconUrl, iconSize: [30, 41]});
  }
}
