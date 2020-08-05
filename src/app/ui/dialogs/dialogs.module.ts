import {NgModule} from '@angular/core';
import {AreYouSureComponent} from './are-you-sure/are-you-sure.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [AreYouSureComponent],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  exports: [AreYouSureComponent]
})
export class DialogsModule {

}
