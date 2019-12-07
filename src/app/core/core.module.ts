import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService, EnumService, GovernmentProgramService, OrganizationsService } from '@core/services';
import { StoreService } from '@core/services/store.service';
import { FilterTcPivotsService } from '@core/services/tc-pivots.service';
import { FilterOnClientTcPivotsService } from '@core/services/filter-on-client-tc-pivots.service';
import { LocationCapabilitiesMapper } from '@core/utils/location-capabilities.mapper';
import { LocationFeaturesService } from '@core/services/location-features.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptor/auth.interceptor';

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
    AuthService,
    EnumService,
    StoreService,
    GovernmentProgramService,
    OrganizationsService,
    LocationFeaturesService,
    LocationCapabilitiesMapper,
    {provide: FilterTcPivotsService, useClass: FilterOnClientTcPivotsService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: []
})
export class CoreModule {
}
