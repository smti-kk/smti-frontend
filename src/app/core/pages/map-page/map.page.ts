import { Component } from '@angular/core';
import { latLng, MapOptions, TileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { LayersService } from '@map-wrapper/service/layers.service';
import { ExtendedMap } from '../../../declarations/leaflet';
import { Map } from 'leaflet';
import 'leaflet-spin/example/spin/dist/spin';
import 'leaflet-spin';

const ESPD_LAYER_NAME = 'ЕСПД Точки';
const SMO_LAYER_NAME = 'СЗО Точки';
const KRASNOYARSK_CENTER_LAT = 56.01839;
const KRASNOYARSK_CENTER_LNG = 92.86717;

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage {

  private defaultTile;

  options: MapOptions;
  layersControl: LeafletControlLayersConfig;
  leaflet: ExtendedMap;

  constructor(private layersService: LayersService) {
    this.initLayersControl();

    this.options = {
      layers: [layersService.administrativeCentersLayer],
      zoom: 12,
      center: latLng(KRASNOYARSK_CENTER_LAT, KRASNOYARSK_CENTER_LNG),
      maxZoom: 18
    };
  }

  onMapReady(leaflet: Map) {
    this.leaflet = leaflet as ExtendedMap;
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
