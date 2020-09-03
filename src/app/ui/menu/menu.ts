import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Authorization} from '../authorization/authorization';
import {AccountService} from '@service/account/AccountService';
import {Account} from '@service/account/Account';
import {AuthorizationService} from '@service/authorization/authorization.service';
import {CookieStorageService} from '../../storage/cookie-storage.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class Menu implements OnInit {
  account: Account;

  constructor(public dialog: MatDialog,
              private accountService: AccountService,
              private authService: AuthorizationService,
              private cookieStorage: CookieStorageService) {
  }

  ngOnInit(): void {
    this.accountService.get().subscribe(account => {
      this.account = account;
    });
  }

  currentRouteIs(route: string): boolean {
    return window.location.pathname === route;
  }

  showAuthForm(): void {
    this.dialog.open(Authorization);
  }

  logout(): void {
    this.cookieStorage.removeAll();
    this.authService.logout();
  }
}
