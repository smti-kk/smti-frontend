import {PointLayerController} from './PointLayerController';
import {EventEmitter} from '@angular/core';
import {Map} from 'leaflet';

export class PLCWithReloadInterval implements PointLayerController {
  private readonly origin: PointLayerController;
  private interval;
  private readonly timeoutMS: number;

  constructor(origin: PointLayerController, timeoutMS: number) {
    this.origin = origin;
    this.timeoutMS = timeoutMS;
  }

  addTo(map: Map): boolean {
    if (this.origin.addTo(map)) {
      this.interval = setInterval(() => {
        this.reloadLayer();
      }, this.timeoutMS);
      return true;
    } else {
      return false;
    }
  }

  onPointClick(): EventEmitter<number> {
    return this.origin.onPointClick();
  }

  reloadLayer(): void {
    this.origin.reloadLayer();
  }

  removeFrom(map: Map): boolean {
    if (this.origin.removeFrom(map)) {
      clearInterval(this.interval);
      return true;
    } else {
      return false;
    }
  }

  moveTo(id: number): void {
    this.origin.moveTo(id);
  }

}
