import {IconFromState} from './IconFromState';
import {Icon} from 'leaflet';
import {PointState} from '../points/PointState';

export class SMOIconFromState implements IconFromState {
  private readonly ICON_ACTIVE_URL = '/assets/СЗО_1.svg';
  private readonly ICON_ICON_DISABLED_URL = '/assets/СЗО_2.svg';
  private readonly ICON_SPASI_NAS_GOSPOD_URL = '/assets/СЗО_3.svg';
  private readonly ICON_PROBLEM_URL = '/assets/СЗО_4.svg';
  private readonly ICON_SHADOW_URL = '../../assets/p-shadow.png';

  icon(state: PointState): Icon {
    let iconUrl;
    if (state === 'ACTIVE') {
      iconUrl = this.ICON_ACTIVE_URL;
    } else if (state === 'DISABLED') {
      iconUrl = this.ICON_ICON_DISABLED_URL;
    }
    else if (state === 'PROBLEM') {
      iconUrl = this.ICON_PROBLEM_URL;
    }
    else {
      iconUrl = this.ICON_SPASI_NAS_GOSPOD_URL;
    }
    return new Icon({
      iconUrl,
      iconSize: [30, 41] ,
      iconAnchor: [15, 41],
      shadowUrl:this.ICON_SHADOW_URL,
      shadowSize: [30, 41],
      shadowAnchor:[15, 10]
    });
  }
}
