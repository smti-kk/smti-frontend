import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { FilterTcPivotsService, TcPivotsService } from './service/tc-pivots.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterBtnComponent } from './components/filter-btn/filter-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnicalCapabilitiesComponent } from './components/technical-capabilities/technical-capabilities.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterOnClientTcPivotsService } from './service/filter-on-client-tc-pivots.service';
import { CapabilitiesFilterFormComponent } from './components/capabilities-filter-form/capabilities-filter-form.component';
import {LocationCapabilitiesMapper} from '@core/utils/location-capabilities.mapper';


@NgModule({
  declarations: [PivotTablePageComponent, FilterBtnComponent, TechnicalCapabilitiesComponent, CapabilitiesFilterFormComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    LocationCapabilitiesMapper,
    TcPivotsService,
    NgxPaginationModule,
    {provide: FilterTcPivotsService, useClass: FilterOnClientTcPivotsService}
  ]
})
export class PivotTableModule {
}
