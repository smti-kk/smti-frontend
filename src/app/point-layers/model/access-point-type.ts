import { ACCESS_POINT_ESPD_URL, ACCESS_POINT_SMO_URL } from '../service/api.constants';

export class AccessPointType {
  static readonly ESPD = new AccessPointType(ACCESS_POINT_ESPD_URL);
  static readonly SMO = new AccessPointType(ACCESS_POINT_SMO_URL);

  private constructor(public apiUrl: string) {
  }
}
