import {Component} from '@angular/core';
import {loading} from './loader-animations';
import {LoaderService} from './LoaderService';

@Component({
  selector: 'loader',
  templateUrl: './loader.html',
  styleUrls: ['loader.scss'],
  animations: [loading]
})
export class Loader {
  loadingState = 'show';

  constructor(loaderService: LoaderService) {
    loaderService.getLoadingEventEmitter().subscribe(isLoading => {
      if (!isLoading) {
        this.loadingState = 'hide';
      }
    });
  }
}
