import { Component } from '@angular/core';
import { latLng, LayerGroup, Map, MapOptions, TileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet.markercluster';
import 'leaflet-search';
import { AccessPointEspdLayer } from '@map-wrapper/access-point-espd-layer';
import { AccessPointSmoLayer } from '@map-wrapper/access-point-smo-layer';
import SearchControl from '../search-control/search-control';
import AccessPointLayer from '@map-wrapper/components/access-point-layer';
import MunicipalitiesLayer from '@map-wrapper/municipalities-layer';
import { AdministrativeCentersLayer } from '@map-wrapper/administrative-centers-layer';

const ESPD_LAYER_NAME = 'ЕСПД Точки';
const SMO_LAYER_NAME = 'СЗО Точки';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private readonly options: MapOptions;
  private layersControl: LeafletControlLayersConfig;
  private defaultTile;
  private leaflet: Map;
  private pointLayers: LayerGroup = new LayerGroup<AccessPointLayer<any>>();

  constructor(private municipalitiesLayer: MunicipalitiesLayer,
              private espdLayer: AccessPointEspdLayer,
              private smoLayer: AccessPointSmoLayer,
              private administrativeLayer: AdministrativeCentersLayer) {
    this.initLayersControl();

    this.options = {
      layers: [municipalitiesLayer, administrativeLayer],
      zoom: 12,
      center: latLng(56.01839, 92.86717),
      maxZoom: 18
    };
  }

  onMapReady(leaflet: Map) {
    this.leaflet = leaflet;
    this.defaultTile.addTo(leaflet);
    this.municipalitiesLayer.addInfoControlToMap(leaflet);
    this.initSearchControl(new LayerGroup([this.espdLayer, this.smoLayer, this.administrativeLayer, this.municipalitiesLayer]));
  }

  private initSearchControl(layers: LayerGroup) {
    layers.eachLayer(l => {
      l.on('add', () => this.pointLayers.addLayer(l));
      l.on('remove', () => this.pointLayers.removeLayer(l));
    });

    const search = SearchControl.create(this.pointLayers);
    search.addTo(this.leaflet);

    this.leaflet.removeLayer(this.layersControl.overlays[ESPD_LAYER_NAME]);
    this.leaflet.removeLayer(this.layersControl.overlays[SMO_LAYER_NAME]);
  }

  private initLayersControl() {
    this.defaultTile = new TileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});

    this.layersControl = {
      baseLayers: {
        wmflabs: this.defaultTile,
        openstreetmap: new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      },
      overlays: {
        [ESPD_LAYER_NAME]: this.espdLayer,
        [SMO_LAYER_NAME]: this.smoLayer
      }
    };
  }
}
