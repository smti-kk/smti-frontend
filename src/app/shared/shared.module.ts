import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TechnicalCapabilitiesRowComponent } from './components/providers-row/technical-capabilities-row.component';


@NgModule({
  declarations: [TechnicalCapabilitiesRowComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    TechnicalCapabilitiesRowComponent
  ]
})
export class SharedModule {
}
