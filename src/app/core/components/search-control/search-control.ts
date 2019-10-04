import * as L from 'leaflet';
import { Control, LayerGroup } from 'leaflet';
import { filterByFields } from '../../../utils/utils';

export default class SearchControl {
  static create(layers: LayerGroup): Control {
    // @ts-ignore
    return new L.Control.Search({
      layer: layers,
      textPlaceholder: 'Найти...',
      propertyName: 'name',
      position: 'topleft',
      filterData: (textSearch: string, allRecords) => filterByFields(textSearch, allRecords),
      buildTip: (text, val) => SearchControl.buildTip(text, val)
    });
  }

  private static buildTip(text: string, marker: any) {
    let type;
    if (!marker.layer.feature.properties.type) {
      type = '<i class="fa fa-globe icon-search" aria-hidden="true" title="Район"></i>';
    } else {
      type = '<i class="fa fa-map-marker icon-search" aria-hidden="true" title="Населенный пункт"></i>';
    }
    return '<a style="width: 230px;" href="#">' + text + type + '</a>';
  }
}
