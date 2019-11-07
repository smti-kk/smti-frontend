import { Component, OnDestroy, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, TileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet-spin/example/spin/dist/spin';
import 'leaflet-spin';
import { AccessPointEspdLayer } from '@map-wrapper/layers/access-point-espd-layer';
import { AccessPointSmoLayer } from '@map-wrapper/layers/access-point-smo-layer';
import { AdministrativeCentersLayer } from '@map-wrapper/layers/administrative-centers-layer';
import { MunicipalitiesLayer } from '@map-wrapper/layers/municipalities-layer';
import { AccessPointMarker } from '@map-wrapper/components/access-point-marker';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { Subscription } from 'rxjs';
import { ExtendedMap } from '../../../declarations/leaflet';

const ESPD_LAYER_NAME = 'ЕСПД Точки';
const SMO_LAYER_NAME = 'СЗО Точки';
const KRASNOYARSK_CENTER_LAT = 56.01839;
const KRASNOYARSK_CENTER_LNG = 92.86717;
const ZOOM = 14;

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit, OnDestroy {

  private defaultTile;

  options: MapOptions;
  layersControl: LeafletControlLayersConfig;
  observers: Subscription[] = [];
  leaflet: ExtendedMap;

  constructor(private espdLayer: AccessPointEspdLayer,
              private smoLayer: AccessPointSmoLayer,
              private administrativeCentersLayer: AdministrativeCentersLayer,
              private municipalityLayer: MunicipalitiesLayer) {
  }

  public ngOnInit(): void {
    this.layersControl = this.initLayersControl();

    this.options = {
      layers: [],
      zoom: 12,
      center: latLng(KRASNOYARSK_CENTER_LAT, KRASNOYARSK_CENTER_LNG),
      maxZoom: 18
    };
  }

  public ngOnDestroy(): void {
    this.observers.forEach((observer) => {
      observer.unsubscribe();
    });

    this.administrativeCentersLayer.onDestroy();
    this.espdLayer.onDestroy();
    this.smoLayer.onDestroy();
  }

  public onMapReady(leaflet: Map) {
    this.leaflet = leaflet as ExtendedMap;
    this.defaultTile.addTo(leaflet);

    leaflet.addLayer(this.municipalityLayer);
    leaflet.addLayer(this.administrativeCentersLayer);

    this.observers.push(
      this.administrativeCentersLayer.onMarkerClick.subscribe((marker: AccessPointMarker<AdministrativeCenterPoint>) => {
        leaflet.flyTo(marker.getLatLng(), ZOOM);
      })
    );

    if (this.municipalityLayer.selectedLocation) {
      leaflet.fitBounds(this.municipalityLayer.selectedLocation.getBounds(), {animate: false});
    }
  }

  private initLayersControl(): LeafletControlLayersConfig {
    this.defaultTile = new TileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});

    return {
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
