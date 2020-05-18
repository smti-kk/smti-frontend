import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import {LocationFeaturesService} from '@core/services/location-features.service';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';

import {TechnicalCapabilitiesComparisionTableComponent} from './technical-capabilities-comparision-table';
import {
  NzCheckboxModule,
  NzDatePickerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzRadioModule,
  NzSelectModule,
} from 'ng-zorro-antd';

const routes: Routes = [
  {
    path: '',
    component: TechnicalCapabilitiesComparisionTableComponent,
  },
];

@NgModule({
  declarations: [TechnicalCapabilitiesComparisionTableComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzIconModule,
    NzRadioModule,
  ],
  providers: [LocationFeaturesService],
})
export class TechnicalCapabilitiesComparisonTableModule {}
