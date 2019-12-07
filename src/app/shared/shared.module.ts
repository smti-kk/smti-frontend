import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterBtnComponent } from '@shared/layout/filter-btn/filter-btn.component';
import { CellularFeatureComponent } from '@shared/components/providers-row/cellular/cellular-feature.component';
import { OperatorIconComponent } from '@shared/components/providers-row/operator-icon.component';
import { InternetFeatureComponent } from '@shared/components/providers-row/internet/internet-feature.component';
import { AtsFeatureComponent } from './components/providers-row/ats/ats-feature.component';
import { PayphoneFeatureComponent } from './components/providers-row/payphone/payphone-feature.component';
import { RadioFeatureComponent } from '@shared/components/providers-row/radio/radio-feature.component';
import { TelevisionFeatureComponent } from '@shared/components/providers-row/television/television-feature.component';


@NgModule({
  declarations: [
    FilterBtnComponent,
    CellularFeatureComponent,
    InternetFeatureComponent,
    OperatorIconComponent,
    AtsFeatureComponent,
    PayphoneFeatureComponent,
    RadioFeatureComponent,
    TelevisionFeatureComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    FilterBtnComponent,
    CellularFeatureComponent,
    InternetFeatureComponent,
    OperatorIconComponent,
    RadioFeatureComponent,
    TelevisionFeatureComponent,
    PayphoneFeatureComponent,
    AtsFeatureComponent
  ]
})
export class SharedModule {
}
