import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import {ApiMapper} from '@core/utils/api-mapper';

export class AdministrativeCentersMapper
  extends ApiMapper<AdministrativeCenterPoint, AdministrativeCenterPoint, AdministrativeCenterPoint> {

  // noinspection JSMethodCanBeStatic
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
