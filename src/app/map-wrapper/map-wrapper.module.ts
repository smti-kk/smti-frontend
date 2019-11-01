import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapPage } from './pages/map/map.page';
import { MarkerInfoBarComponent } from './components/marker-info-control/marker-info-bar.component';
import { LocationCapabilitiesSearchComponent } from './components/location-capabilities-search/location-capabilities-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapWrapperRoutingModule } from '@map-wrapper/map-wrapper-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MunicipalitiesLayer } from '@map-wrapper/layers/municipalities-layer';
import { AccessPointEspdLayer } from '@map-wrapper/layers/access-point-espd-layer';
import { AccessPointSmoLayer } from '@map-wrapper/layers/access-point-smo-layer';
import { AdministrativeCentersLayer } from '@map-wrapper/layers/administrative-centers-layer';
import { MunicipalityService } from '@map-wrapper/service/municipality.service';
import { EspdService } from '@map-wrapper/service/espd.service';
import { SmoService } from '@map-wrapper/service/smo.service';
import { AdministrativeCentersService } from '@map-wrapper/service/administrative-centers.service';


@NgModule({
  declarations: [
    MapPage,
    MarkerInfoBarComponent,
    LocationCapabilitiesSearchComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule.forRoot(),
    MapWrapperRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    MunicipalitiesLayer,
    AccessPointEspdLayer,
    AccessPointSmoLayer,
    AdministrativeCentersLayer,
    MunicipalityService,
    EspdService,
    SmoService,
    AdministrativeCentersService
  ]
})
export class MapWrapperModule {
}
