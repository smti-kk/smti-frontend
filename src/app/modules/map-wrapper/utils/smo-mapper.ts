import { ApiMapper } from '@core/utils/api-mapper';
import { AccessPointSmo } from '../model/access-point-smo';

export class SmoMapper extends ApiMapper<AccessPointSmo, AccessPointSmo, AccessPointSmo> {
  mapFromApi(apiModel): AccessPointSmo {
    return new AccessPointSmo(
      apiModel.actual_address,
      apiModel.address,
      apiModel.cmo_type,
      apiModel.defined_speed,
      apiModel.description,
      apiModel.institution_type,
      apiModel.label,
      apiModel.medium_type,
      apiModel.network_provider,
      apiModel.org_name,
      apiModel.pk,
      {
        lat: apiModel.point.coordinates[1],
        lng: apiModel.point.coordinates[0]
      },
      apiModel.visible
    );
  }

  mapDetailApi(apiData): AccessPointSmo {
    return this.mapFromApi(apiData);
  }

  mapShortApi(apiData): AccessPointSmo {
    return this.mapFromApi(apiData);
  }
}
