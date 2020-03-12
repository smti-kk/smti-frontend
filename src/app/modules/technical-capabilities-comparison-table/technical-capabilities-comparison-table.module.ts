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
  ],
  providers: [LocationFeaturesService],
})
export class TechnicalCapabilitiesComparisonTableModule {}
