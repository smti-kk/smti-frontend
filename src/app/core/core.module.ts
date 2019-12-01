import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumService, GovProgramService, OrganizationsService } from '@core/services';
import { StoreService } from '@core/services/store.service';
import { GovProgramMapper } from '@core/services/gov-program-mapper.service';

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
    EnumService
  ],
  exports: []
})
export class CoreModule {
}
