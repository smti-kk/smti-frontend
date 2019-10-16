import AccessPoint from './access-point';
import LocationArea from '@map-wrapper/model/location-area';
import LocationSummaryCapability from '@map-wrapper/model/location-summary-capability';

export default class AdministrativeCenterPoint extends AccessPoint {

  static create(locationArea: LocationArea[], locationCapability: LocationSummaryCapability): AdministrativeCenterPoint {
    if (!locationCapability.administrativeCenter) {
      return;
    }

    return new AdministrativeCenterPoint(
      locationCapability.id,
      {
        lng: locationCapability.administrativeCenter.coordinates[0],
        lat: locationCapability.administrativeCenter.coordinates[1],
      },
      locationCapability.locality,
      locationArea[locationArea.findIndex(x => x.id === locationCapability.area)].properties.name,
    );
  }
}
