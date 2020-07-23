import {PointLayerController} from './PointLayerController';
import {EventEmitter} from '@angular/core';
import {Map} from 'leaflet';

export class PLCWithReloadOnMove implements PointLayerController {
  private readonly origin: PointLayerController;

  constructor(origin: PointLayerController) {
    this.origin = origin;
  }

  addTo(map: Map): void {
    map.on({
      moveend: () => this.origin.reloadLayer()
    });
    this.origin.addTo(map);
  }

  onPointClick(): EventEmitter<number> {
    return this.origin.onPointClick();
  }

  reloadLayer(): void {
    this.origin.reloadLayer();
  }

  removeFrom(map: Map): void {
    map.off('moveend');
    this.origin.removeFrom(map);
  }

  moveTo(id: number): void {
    this.origin.moveTo(id);
  }
}
