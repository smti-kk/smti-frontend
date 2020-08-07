import {PointLayerController} from './PointLayerController';
import {EventEmitter} from '@angular/core';
import {Map} from 'leaflet';

export class PLCWithReloadOnMove implements PointLayerController {
  private readonly origin: PointLayerController;

  constructor(origin: PointLayerController) {
    this.origin = origin;
  }

  addTo(map: Map): boolean {
    if (this.origin.addTo(map)) {
      map.on({
        moveend: () => this.origin.reloadLayer()
      });
      return true;
    }
    return false;
  }

  onPointClick(): EventEmitter<number> {
    return this.origin.onPointClick();
  }

  reloadLayer(): void {
    this.origin.reloadLayer();
  }

  removeFrom(map: Map): boolean {
    if (this.origin.removeFrom(map)) {
      map.off('moveend');
      return true;
    } else {
      return false;
    }
  }

  moveTo(id: number): void {
    this.origin.moveTo(id);
  }
}
