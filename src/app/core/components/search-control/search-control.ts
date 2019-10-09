import * as L from 'leaflet';
import { Control, LayerGroup } from 'leaflet';


export default class SearchControl {
  static create(layers: LayerGroup): Control {
    // @ts-ignore
    return new L.Control.Search({
      layer: layers,
      textPlaceholder: 'Найти...',
      propertyName: 'name',
      position: 'topleft',
      filterData: (textSearch: string, allRecords) => SearchControl.filterByFields(textSearch, allRecords),
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

  private static filterByFields(text: string, map: {[name: string]: any}) {
    const results = {};
    for (const key in map) {
      if (map.hasOwnProperty(key) && key.toLowerCase().includes(text.toLowerCase())) {
        results[key] = text[key];
      }
    }
    return  results;
  }
}
