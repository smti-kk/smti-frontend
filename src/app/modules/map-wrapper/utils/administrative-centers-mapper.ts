import { ApiMapper } from '../../../shared/utils/api-mapper';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';

export class AdministrativeCentersMapper
  extends ApiMapper<AdministrativeCenterPoint, AdministrativeCenterPoint, AdministrativeCenterPoint> {

  public mapFromApi(apiModel): AdministrativeCenterPoint {
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

  public mapDetailApi(apiData): AdministrativeCenterPoint {
    return this.mapFromApi(apiData);
  }

  public mapShortApi(apiData): AdministrativeCenterPoint {
    return this.mapFromApi(apiData);
  }
}
