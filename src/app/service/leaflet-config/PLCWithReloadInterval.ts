import {PointLayerController} from './PointLayerController';
import {EventEmitter} from '@angular/core';
import {Map} from 'leaflet';

export class PLCWithReloadInterval implements PointLayerController {
  private readonly origin: PointLayerController;
  private interval;

  constructor(origin: PointLayerController) {
    this.origin = origin;
  }

  addTo(map: Map): void {
    this.interval = setInterval(() => {
      this.reloadLayer();
    }, 1000*60*1);
    this.origin.addTo(map);
  }

  onPointClick(): EventEmitter<number> {
    return this.origin.onPointClick();
  }

  reloadLayer(): void {
    this.origin.reloadLayer();
  }

  removeFrom(map: Map): void {
    clearInterval(this.interval);
    this.origin.removeFrom(map);
  }

  moveTo(id: number): void {
    this.origin.moveTo(id);
  }

}
