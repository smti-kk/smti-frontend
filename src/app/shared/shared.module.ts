import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationsService } from './services/organizations.service';
import { StoreService } from './services/store.service';
import { TechnicalCapabilitiesRowComponent } from './components/providers-row/technical-capabilities-row.component';
import { GovProgramMapper, GovProgramService } from '@shared/services/gov-program.service';
import { EnumService } from '@shared/services/enum.service';


@NgModule({
  declarations: [TechnicalCapabilitiesRowComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    OrganizationsService,
    GovProgramMapper,
    GovProgramService,
    StoreService,
    EnumService
  ],
  exports: [
    TechnicalCapabilitiesRowComponent
  ]
})
export class SharedModule {
}
