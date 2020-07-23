import {Map} from 'leaflet';
import {EventEmitter} from '@angular/core';
import {PLClickable} from './PLClickable';
import {PointLayerController} from './PointLayerController';

export class PointLayerControllerImpl implements PointLayerController {
  private map: Map;
  private readonly pointsLayer: PLClickable;

  constructor(pointsLayer: PLClickable) {
    this.pointsLayer = pointsLayer;
  }

  addTo(map: Map): void {
    this.map = map;
    this.reloadLayer();
    this.pointsLayer.addToMap(map);
  }

  removeFrom(map: Map): void {
    this.pointsLayer.removeFromMap(map);
  }

  onPointClick(): EventEmitter<number> {
    return this.pointsLayer.onPointClick();
  }

  reloadLayer(): void {
    if (!this.map) {
      return;
    }
    this.pointsLayer.reloadByBounds(this.map.getBounds()).subscribe();
  }

  moveTo(id: number): void {
    this.pointsLayer.moveToPoint(id);
  }
}
