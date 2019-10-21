import { Component } from '@angular/core';
import { latLng, Map, MapOptions, TileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { AccessPointSmoLayer } from '@map-wrapper/access-point-smo-layer';
import { LayersService } from '@map-wrapper/service/layers.service';

import 'leaflet-spin/example/spin/dist/spin';
import 'leaflet-spin';

const ESPD_LAYER_NAME = 'ЕСПД Точки';
const SMO_LAYER_NAME = 'СЗО Точки';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage {

  private readonly options: MapOptions;
  private layersControl: LeafletControlLayersConfig;
  private defaultTile;
  private leaflet: Map;

  constructor(private smoLayer: AccessPointSmoLayer,
              private layersService: LayersService) {
    this.initLayersControl();

    this.options = {
      layers: [layersService.getAdministrativeCenters()],
      zoom: 12,
      center: latLng(56.01839, 92.86717),
      maxZoom: 18
    };
  }

  onMapReady(leaflet: Map) {
    this.leaflet = leaflet;
    this.defaultTile.addTo(leaflet);
    this.layersService.municipalitiesLayer.subscribe(m => {
      leaflet.addLayer(m);
    });
  }

  private initLayersControl() {
    this.defaultTile = new TileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});

    this.layersControl = {
      baseLayers: {
        wmflabs: this.defaultTile,
        openstreetmap: new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      },
      overlays: {
        [ESPD_LAYER_NAME]: this.layersService.espdLayer,
        [SMO_LAYER_NAME]: this.layersService.smoLayer
      }
    };
  }
}
