import AccessPoint from './access-point';

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
}
