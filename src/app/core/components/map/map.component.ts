import { Component } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Layer, layerGroup, Map, MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet.markercluster';
import 'leaflet-search';
import { ESPD_LAYER_NAME } from '../../../access-points/access-point-espd-layer.directive';
import { SMO_LAYER_NAME } from '../../../access-points/access-point-smo-layer.directive';

const COUNT_LAYERS = 4;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private readonly options: MapOptions;
  private readonly layersControl: LeafletControlLayersConfig;
  private leaflet: Map;
  private layers: Layer[] = [];
  private searchableLayers: Layer[] = [];

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

  private initSearchControl(layers: Layer[]) {
    // @ts-ignore
    const search = new L.Control.Search({
      layer: layerGroup(layers),
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

  private onLayerReady(layer: Layer) {
    this.layers.push(layer);

    if (this.layers.length === COUNT_LAYERS) {
      const searchableLayers = this.layers;
      this.initSearchControl(searchableLayers);
      this.layers.forEach(l => {
        l.on('add', () => {
          searchableLayers.push(l);
        });
        l.on('remove', () => {
          searchableLayers.splice(searchableLayers.indexOf(l, 1));
        });
      });
    }
  }

  private addLayerToSearchControl(layer: Layer) {

  }

  private removeLayerFromSearchControl(layer: Layer) {

  }
}
