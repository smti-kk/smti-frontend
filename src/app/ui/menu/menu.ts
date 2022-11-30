import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Authorization } from '../authorization/authorization';
import { AccountService } from '@service/account/AccountService';
import { Account } from '@service/account/Account';
import { AuthorizationService } from '@service/authorization/authorization.service';
import { CookieStorageService } from '../../storage/cookie-storage.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class Menu implements OnInit, OnDestroy {
  account: Account;
  private _mobile = false;
  isShowMenu = false;

  constructor(
    public dialog: MatDialog,
    private accountService: AccountService,
    private authService: AuthorizationService,
    private cookieStorage: CookieStorageService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe({
      next: (res) => {
        this._mobile = res.matches;
      },
    });
    this.accountService.get().subscribe((account) => {
      this.account = account;
    });

    document.body.addEventListener('click', this.hideMenu);
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.hideMenu);
  }

  get isMobile() {
    return this._mobile;
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

  onBurgerClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isShowMenu = !this.isShowMenu;
  }

  hideMenu = (event: MouseEvent) => {
    if (!this.isShowMenu) {
      return
    }
    const path = event.composedPath() as HTMLElement[];

    const isLinkClick = path.some(
      ({ tagName, classList }) =>
        tagName !== 'BUTTON' && classList?.contains('link')
    );
    if (isLinkClick) {
      this.isShowMenu = false;
    }
  };
}
