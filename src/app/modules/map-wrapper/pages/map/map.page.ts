import {Component, OnInit} from '@angular/core';
import {latLng, Map, MapOptions, TileLayer} from 'leaflet';
import {LeafletControlLayersConfig} from '@asymmetrik/ngx-leaflet';

import {AccessPointEspdLayer} from '../../layers/access-point-espd-layer';
import {AccessPointSmoLayer} from '../../layers/access-point-smo-layer';
import {AdministrativeCentersLayer} from '../../layers/administrative-centers-layer';
import {MunicipalitiesLayer} from '../../layers/municipalities-layer';

const ESPD_LAYER_NAME = 'ЕСПД Точки';
const SMO_LAYER_NAME = 'СЗО Точки';
const KRASNOYARSK_CENTER_LAT = 56.01839;
const KRASNOYARSK_CENTER_LNG = 92.86717;

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private readonly defaultTile;

  options: MapOptions;

  layersControl: LeafletControlLayersConfig;

  leaflet: Map;

  constructor(
    private espdLayer: AccessPointEspdLayer,
    private smoLayer: AccessPointSmoLayer,
    private administrativeCentersLayer: AdministrativeCentersLayer,
    private municipalityLayer: MunicipalitiesLayer
  ) {
    this.defaultTile = new TileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...',
    });
  }

  public ngOnInit(): void {
    this.layersControl = this.initLayersControl();

    this.options = {
      layers: [],
      zoom: 12,
      center: latLng(KRASNOYARSK_CENTER_LAT, KRASNOYARSK_CENTER_LNG),
      maxZoom: 18,
    };
  }

  public onMapReady(leaflet: Map): void {
    this.leaflet = leaflet;
    this.defaultTile.addTo(leaflet);

    leaflet.addLayer(this.municipalityLayer);
    leaflet.addLayer(this.administrativeCentersLayer);
  }

  private initLayersControl(): LeafletControlLayersConfig {
    return {
      baseLayers: {
        wmflabs: this.defaultTile,
        openstreetmap: new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      },
      overlays: {
        [ESPD_LAYER_NAME]: this.espdLayer,
        [SMO_LAYER_NAME]: this.smoLayer,
      },
    };
  }
}
