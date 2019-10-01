import { Component } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Layer, layerGroup, Map, MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet.markercluster';
import 'leaflet-search';
import { ESPD_LAYER_NAME } from '../../../access-points/access-point-espd-layer.directive';
import { SMO_LAYER_NAME } from '../../../access-points/access-point-smo-layer.directive';
import { MUNICIPALITIES_LAYER_TITLE } from '../../../municipality/municipality.directive';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private readonly options: MapOptions;
  private readonly layersControl: LeafletControlLayersConfig;
  private leaflet: Map;
  private administrativeCentersLayer: Layer;

  constructor() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      ],
      zoom: 12,
      center: latLng(56.01839, 92.86717)
    };

    this.layersControl = {
      baseLayers: {},
      overlays: {}
    };

  }

  onMapReady(leaflet: Map) {
    this.leaflet = leaflet;
  }

  private initSearchControl() {
    // @ts-ignore
    const search = new L.Control.Search({
      layer: layerGroup([
        this.layersControl.overlays[ESPD_LAYER_NAME],
        this.layersControl.overlays[SMO_LAYER_NAME],
        this.administrativeCentersLayer,
        this.layersControl.overlays[MUNICIPALITIES_LAYER_TITLE]
      ]),
      textPlaceholder: 'Найти...',
      propertyName: 'name',
      position: 'topleft',
      buildTip: (text, val) => {
        let type;
        if (!val.layer.feature.properties.type) {
          type = '<i class="fa fa-globe icon-search" aria-hidden="true" title="Район"></i>';
        } else {
          type = '<i class="fa fa-map-marker icon-search" aria-hidden="true" title="Населенный пункт"></i>';
        }
        return '<a style="width: 230px;" href="#">' + text + type + '</a>';
      }
    });

    search.addTo(this.leaflet);

    this.leaflet.removeLayer(this.layersControl.overlays[ESPD_LAYER_NAME]);
    this.leaflet.removeLayer(this.layersControl.overlays[SMO_LAYER_NAME]);
  }

  onAdministrativeLayerReady(layer: Layer) {
    this.administrativeCentersLayer = layer;
  }

  onMunicipalitiesLayerReady() {
    this.initSearchControl();
  }
}
