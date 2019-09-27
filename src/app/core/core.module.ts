import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core.component';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { AccessPointsModule } from '../access-points/access-points.module';
import { MunicipalityModule } from '../municipality/municipality.module';


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
    AccessPointsModule,
    MunicipalityModule
  ],
  exports: [
    CoreComponent,
  ]
})
export class CoreModule {
}
