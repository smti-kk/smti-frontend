import { AccessPoint } from './access-point';

const MARKER_ICON_DEFAULT = '../../../../assets/img/Ресурс 8.svg';

export class AdministrativeCenterPoint extends AccessPoint {
  get iconUrl() {
    return MARKER_ICON_DEFAULT;
  }
}
