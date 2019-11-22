import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapPage } from './pages/map/map.page';
import { MarkerInfoBarComponent } from './components/marker-info-control/marker-info-bar.component';
import { LocationCapabilitiesSearchComponent } from './components/location-capabilities-search/location-capabilities-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapWrapperRoutingModule } from './map-wrapper-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MunicipalitiesLayer } from './layers/municipalities-layer';
import { AccessPointEspdLayer } from './layers/access-point-espd-layer';
import { AccessPointSmoLayer } from './layers/access-point-smo-layer';
import { AdministrativeCentersLayer } from './layers/administrative-centers-layer';
import { MunicipalityService } from './service/municipality.service';
import { EspdService } from './service/espd.service';
import { SmoService } from './service/smo.service';
import { AdministrativeCentersService } from './service/administrative-centers.service';
import { SharedModule } from '@shared/shared.module';


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
    ReactiveFormsModule,
    SharedModule
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
