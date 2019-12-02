import { AccessPointEspd } from '../model/access-point-espd';
import {ApiMapper} from '@core/utils/api-mapper';

export class EspdMapper extends ApiMapper<AccessPointEspd, AccessPointEspd, AccessPointEspd> {
  mapFromApi(apiModel): AccessPointEspd {
    let avstate;
    if (!apiModel.avstate) {
      avstate = null;
    } else {
      avstate = !apiModel.avstate.includes('Не доступно');
    }

    return new AccessPointEspd(
      apiModel.pk,
      {
        lat: apiModel.point.coordinates[1],
        lng: apiModel.point.coordinates[0]
      },
      apiModel.org_name,
      apiModel.actual_address,
      apiModel.network_provider,
      apiModel.contractor,
      apiModel.medium_type,
      apiModel.defined_speed,
      apiModel.node,
      apiModel.description,
      avstate,
      apiModel.avstate,
      apiModel.traffic
    );
  }

  mapDetailApi(apiData): AccessPointEspd {
    return this.mapFromApi(apiData);
  }

  mapShortApi(apiData): AccessPointEspd {
    return this.mapFromApi(apiData);
  }
}
