import {CRS, TileLayer} from 'leaflet';

export class EniseiTileLayer extends TileLayer.WMS {
  constructor() {
    super('http://map.24bpd.ru/geowebcache/service/wms?tiled=true', {
      layers: 'egis_wld_light',
      format: 'image/png',
      transparent: false,
      attribution: '© <a href="http://24bpd.ru/">Енисей-ГИС</a>',
      crossOrigin: 'anonymous',
      crs: CRS.EPSG3857,
    });
  }
}
