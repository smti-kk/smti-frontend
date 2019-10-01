import { GeoJSON, Map } from 'leaflet';
import { FeatureCollection } from 'geojson';
import LocationArea from '../../shared/model/location-area';
import { HIGHLIGHT_FEATURE, MAP_TERRITORIES_STYLE } from '../constants/inline.style';
import LocationSummaryCapability from '../../shared/model/location-summary-capability';
import LeafletInfoControl from './leaflet-info-control';

export default class MunicipalitiesLayer extends GeoJSON<LocationArea> {
  constructor(municipalities: LocationArea[]) {
    super();

    const communicationScoreFeature: FeatureCollection = {
      type: 'FeatureCollection',
      features: municipalities
    };

    this.addData(communicationScoreFeature);
    this.setStyle(MAP_TERRITORIES_STYLE);
  }

  addInfoControlToMap(locationCapabilities: LocationSummaryCapability[], map: Map) {
    const info = new LeafletInfoControl(locationCapabilities).addTo(map);

    this.eachLayer((layer: any) => {
      layer.on({
        mouseover: event => {
          event.target.setStyle(HIGHLIGHT_FEATURE);
          info.show(layer.feature);
        },
        mouseout: event => {
          event.target.setStyle(MAP_TERRITORIES_STYLE);
          info.hide();
        },
        click: event => map.fitBounds(event.target.getBounds())
      });
    });
  }
}
