import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TechnicalCapabilitiesRowComponent } from './components/providers-row/technical-capabilities-row.component';
import { FilterBtnComponent } from '@shared/layout/filter-btn/filter-btn.component';


@NgModule({
  declarations: [TechnicalCapabilitiesRowComponent, FilterBtnComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    TechnicalCapabilitiesRowComponent,
    FilterBtnComponent
  ]
})
export class SharedModule {
}
