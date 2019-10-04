import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core.component';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { PointLayersModule } from '../point-layers/point-layers.module';
import { MunicipalityLayerModule } from '../municipality-layer/municipality-layer.module';


@NgModule({
  declarations: [
    CoreComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule.forRoot(),
    PointLayersModule,
    MunicipalityLayerModule
  ],
  exports: [
    CoreComponent,
  ]
})
export class CoreModule {
}
