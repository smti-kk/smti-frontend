import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { FilterTcPivotsService } from './service/tc-pivots.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { FilterBtnComponent } from './components/filter-btn/filter-btn.component';


@NgModule({
  declarations: [PivotTablePageComponent, FilterBtnComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    LocationCapabilitiesMapper,
    {provide: FilterTcPivotsService, useClass: FilterTcPivotsService}
  ]
})
export class PivotTableModule {
}
