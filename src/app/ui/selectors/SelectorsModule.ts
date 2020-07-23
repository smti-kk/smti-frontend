import {NgModule} from '@angular/core';
import {GovProgramSelect} from './gov-program-select/gov-program-select.component';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    GovProgramSelect
  ],
  declarations: [
    GovProgramSelect
  ]
})
export class SelectorsModule {

}
