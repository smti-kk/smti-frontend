import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@service/account/AccountService';

@Component({
  selector: 'locations-page',
  template: `
    <ng-container *ngIf="isMobileAndGuest">
      <locations-page-mobile></locations-page-mobile>
    </ng-container>
    <ng-container *ngIf="!isMobileAndGuest">
      <locations-page-desktop></locations-page-desktop>
    </ng-container>
  `,
  styleUrls: ['./locations-page.scss'],
})
export class LocationsPage implements OnInit {
  private _mobile = false;
  private _guest = true;

  constructor(
    private readonly accountService: AccountService,
    private breakpointObserver: BreakpointObserver,
  ) {
    accountService.get().subscribe((user) => {
      if (user && user.getRole().indexOf('GUEST') === -1) {
        this._guest = false;
      }
    });
  }

  get isMobileAndGuest() {
    return this._mobile && this._guest;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe({
      next: (res) => {
        this._mobile = res.matches;
      }
    })

    // const mql = window.matchMedia('(max-width: 768px)');
    // console.log(mql);

    // if (mql.matches) {
    //   this._mobile = true;
    // } else {
    //   this._meta.removeTag('name = "viewport"');
    // }
    // mql.addEventListener('change', (ev) => {
    //   this._mobile = ev.matches;
    // });
  }
}
