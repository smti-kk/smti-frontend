import {Component} from '@angular/core';
import {LoaderService} from './loader/LoaderService';
import {CookieStorageService} from '../storage/cookie-storage.service';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'telecomit';
  loaderService: LoaderService;

  constructor(
    private cookieStorage: CookieStorageService,
    private localStorage: StorageService,
    loaderService: LoaderService,
  ) {
    this.loaderService = loaderService;
    //   this.loaderService.startLoader();
    //   setTimeout(() => {
    //     this.loaderService.stopLoader();
    //   }, 2500);

    if (!this.localStorage.getToken()) {
      if (this.cookieStorage.get('_auth_token')) {
        const cookieToken = this.cookieStorage.get('_auth_token');
        this.localStorage.saveToken(cookieToken);
      }
    }
  }
}
