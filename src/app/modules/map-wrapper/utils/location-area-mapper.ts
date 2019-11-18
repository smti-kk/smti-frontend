import { ApiMapper } from '../../../shared/utils/api-mapper';
import { LocationArea } from '../model/location-area';

export class LocationAreaMapper extends ApiMapper<LocationArea, LocationArea, LocationArea> {
  mapFromApi(apiModel): LocationArea {
    return new LocationArea(
      JSON.parse(apiModel.border_geojson),
      {
        name: apiModel.full_name,
        type: 0,
        mobileInternetMaxType: apiModel.properties ? apiModel.properties.mobileInternetMaxType : null,
        mark: apiModel.properties ? apiModel.properties.mark : null,
        mobileMark: apiModel.properties ? apiModel.properties.mobile_mark : null
      },
      apiModel.id
    );
  }

  mapDetailApi(apiData): LocationArea {
    return this.mapFromApi(apiData);
  }

  mapShortApi(apiData): LocationArea {
    return this.mapFromApi(apiData);
  }
}
