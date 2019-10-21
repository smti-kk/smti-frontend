import AccessPoint from './access-point';

const MARKER_ICON_DEFAULT = '../../../../assets/img/Ресурс 8.svg';

export default class AdministrativeCenterPoint extends AccessPoint {

  static create(apiModel): AdministrativeCenterPoint {
    return new AdministrativeCenterPoint(
      apiModel.pk,
      {
        lng: apiModel.geo_data.coordinates[0],
        lat: apiModel.geo_data.coordinates[1]
      },
      apiModel.full_name,
      apiModel.district
    );
  }

  get iconUrl() {
    return MARKER_ICON_DEFAULT;
  }
}
