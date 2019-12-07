import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService, EnumService, GovProgramService, LocationCapabilitiesService, OrganizationsService } from '@core/services';
import { StoreService } from '@core/services/store.service';
import { GovProgramMapper } from '@core/services/gov-program-mapper.service';
import { FilterTcPivotsService } from '@core/services/tc-pivots.service';
import { FilterOnClientTcPivotsService } from '@core/services/filter-on-client-tc-pivots.service';
import { LocationCapabilitiesMapper} from '@core/utils/location-capabilities.mapper';
import { LocationFeaturesService } from '@core/services/location-features.service';

@NgModule({
  declarations: [
    NotFoundPage,
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    OrganizationsService,
    GovProgramMapper,
    GovProgramService,
    StoreService,
    EnumService,
    LocationCapabilitiesMapper,
    {provide: FilterTcPivotsService, useClass: FilterOnClientTcPivotsService},
    LocationFeaturesService,
    AuthService,
    LocationCapabilitiesService
  ],
  exports: []
})
export class CoreModule {
}
