import {Map} from 'leaflet';
import {EventEmitter} from '@angular/core';

export abstract class PointLayerController {
  abstract addTo(map: Map): boolean;
  abstract removeFrom(map: Map): boolean;
  abstract onPointClick(): EventEmitter<number>;
  abstract reloadLayer(): void;
  abstract moveTo(id: number): void;
}
