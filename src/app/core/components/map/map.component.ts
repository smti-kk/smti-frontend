import { Component } from '@angular/core';
import { latLng, Layer, LayerGroup, layerGroup, Map, MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet.markercluster';
import 'leaflet-search';
import { ESPD_LAYER_NAME } from '../../../point-layers/access-point-espd-layer.directive';
import { SMO_LAYER_NAME } from '../../../point-layers/access-point-smo-layer.directive';
import SearchControl from '../search-control/search-control';

const COUNT_LAYERS = 4;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private readonly options: MapOptions;
  private readonly layersControl: LeafletControlLayersConfig;
  private readonly defaultTile;
  private leaflet: Map;
  private layers: LayerGroup = layerGroup();

  constructor() {
    this.options = {
      layers: [],
      zoom: 12,
      center: latLng(56.01839, 92.86717)
    };

    this.defaultTile = tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});

    this.layersControl = {
      baseLayers: {
        wmflabs: this.defaultTile,
        openstreetmap: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      },
      overlays: {}
    };

  }

  onMapReady(leaflet: Map) {
    this.leaflet = leaflet;
    this.defaultTile.addTo(leaflet);
  }

  private initSearchControl() {
    const search = SearchControl.create(this.layers);
    search.addTo(this.leaflet);

    this.leaflet.removeLayer(this.layersControl.overlays[ESPD_LAYER_NAME]);
    this.leaflet.removeLayer(this.layersControl.overlays[SMO_LAYER_NAME]);
  }

  private onLayerReady(layer: Layer) {
    this.layers.addLayer(layer);

    if (this.layers.getLayers().length === COUNT_LAYERS) {
      this.initSearchControl();
      this.layers.eachLayer(l => {
        l.on('add', () => this.layers.addLayer(l));
        l.on('remove', () => this.layers.removeLayer(l));
      });
    }
  }
}
