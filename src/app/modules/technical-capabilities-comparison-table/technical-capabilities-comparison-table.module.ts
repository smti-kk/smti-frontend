import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalCapabilitiesComparisionTableComponent } from './technical-capabilities-comparision-table';
import { CoreModule } from '@core/core.module';
import { LocationFeaturesService } from '@core/services/location-features.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: TechnicalCapabilitiesComparisionTableComponent
  }
];

@NgModule({
  declarations: [TechnicalCapabilitiesComparisionTableComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    LocationFeaturesService
  ]
})
export class TechnicalCapabilitiesComparisonTableModule { }
