import {PointLayerController} from './PointLayerController';

export interface MapLayers {
  [id: string]: PointLayerController;
}
