import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';
import { MarkerInfoBarComponent } from './components/marker-info-control/marker-info-bar.component';
import { MapPage } from './pages/map-page/map.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationCapabilitiesSearchComponent } from './components/location-capabilities-search/location-capabilities-search.component';

@NgModule({
  declarations: [
    MapPage,
    MarkerInfoBarComponent,
    LocationCapabilitiesSearchComponent
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
    MarkerInfoBarComponent
  ]
})
export class CoreModule {
}
