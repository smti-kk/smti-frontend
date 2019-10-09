import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';
import { MarkerInfoControlComponent } from './components/marker-info-control/marker-info-control.component';
import { MapPage } from './pages/map-page/map.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapPage,
    MarkerInfoControlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule.forRoot(),
    MapWrapperModule,
    ReactiveFormsModule
  ],
  exports: [
    MarkerInfoControlComponent
  ]
})
export class CoreModule {
}
