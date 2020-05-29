import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {
  NzCheckboxModule,
  NzFormModule, NzIconModule,
  NzInputModule,
  NzRadioModule,
  NzSelectModule,
  NzTabsModule,
} from 'ng-zorro-antd';

import {SharedModule} from '@shared/shared.module';

import {TechnicalCapabilitiesComponent} from './components/technical-capabilities/technical-capabilities.component';
import {PivotTableRoutingModule} from './pivot-table-routing.module';
import {PivotTablePageComponent} from './components/pivot-table-page-component/pivot-table-page-component';

@NgModule({
  declarations: [PivotTablePageComponent, TechnicalCapabilitiesComponent],
  imports: [
    CommonModule,
    PivotTableRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    NzTabsModule,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzFormModule,
    NzRadioModule,
    NzIconModule,
  ],
  exports: [TechnicalCapabilitiesComponent],
  providers: [NgxPaginationModule],
})
export class PivotTableModule {}
