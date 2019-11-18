import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTablePageComponent } from './components/pivot-table-page-component/pivot-table-page-component';
import { PivotTableRoutingModule } from './pivot-table-routing.module';
import { TcPivotsService } from './service/tc-pivots.service';



@NgModule({
  declarations: [PivotTablePageComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule
  ],
  providers: [
    TcPivotsService
  ]
})
export class PivotTableModule { }
