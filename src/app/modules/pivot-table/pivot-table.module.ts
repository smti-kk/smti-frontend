import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { TcPivotsService } from '@core/services/tc-pivots.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnicalCapabilitiesComponent } from './components/technical-capabilities/technical-capabilities.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [PivotTablePageComponent, TechnicalCapabilitiesComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [
    TechnicalCapabilitiesComponent
  ],
  providers: [
    TcPivotsService,
    NgxPaginationModule
  ]
})
export class PivotTableModule {
}
