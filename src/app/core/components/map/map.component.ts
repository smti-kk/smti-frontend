import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options: MapOptions;
  layersControl: LeafletControlLayersConfig;

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

  ngOnInit() {
  }

}
