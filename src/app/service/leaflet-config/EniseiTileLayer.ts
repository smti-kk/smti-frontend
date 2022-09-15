import {CRS, TileLayer} from 'leaflet';

export class EniseiTileLayer extends TileLayer.WMS {
  constructor() {
    super('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      layers: 'egis_wld_light',
      format: 'image/png',
      transparent: false,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crossOrigin: 'anonymous',
      crs: CRS.EPSG3857,
    });
  }
}
