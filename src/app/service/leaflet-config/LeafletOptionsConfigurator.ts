import {MapOptions} from 'leaflet';
import {Observable} from 'rxjs';
import {CurrentLatLngService} from './CurrentLatLngService';
import {map} from 'rxjs/operators';
import {EniseiTileLayer} from './EniseiTileLayer';
import {Injectable} from '@angular/core';

export abstract class LeafletOptionsConfigurator {
  abstract configure(): Observable<MapOptions>;
}

@Injectable()
export class LeafletOptionsConfiguratorImpl implements LeafletOptionsConfigurator {
  constructor(private currentLatLngService: CurrentLatLngService) {
  }

  configure(): Observable<MapOptions> {
    return this.currentLatLngService.get().pipe(
      map(latLng => {
        return {
          layers: [new EniseiTileLayer()],
          zoom: 10,
          center: latLng,
          maxZoom: 18,
          zoomControl: false,
          attributionControl: false
        };
      }),
    );
  }
}
