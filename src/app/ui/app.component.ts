import { Component } from '@angular/core';
import {LoaderService} from './loader/LoaderService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'telecomit';
  loaderService: LoaderService;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
  //   this.loaderService.startLoader();
  //   setTimeout(() => {
  //     this.loaderService.stopLoader();
  //   }, 2500);
  }
}
