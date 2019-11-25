import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { FilterTcPivotsService, TcPivotsService } from './service/tc-pivots.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { FilterBtnComponent } from './components/filter-btn/filter-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnicalCapabilitiesComponent } from './components/technical-capabilities/technical-capabilities.component';


@NgModule({
  declarations: [PivotTablePageComponent, FilterBtnComponent, TechnicalCapabilitiesComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    LocationCapabilitiesMapper,
    TcPivotsService,
    {provide: FilterTcPivotsService, useClass: FilterTcPivotsService}
  ]
})
export class PivotTableModule {
}
