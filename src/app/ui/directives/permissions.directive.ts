import {Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserRole} from '@service/account/UserRole';
import {AccountService} from '@service/account/AccountService';
import {UserPermission} from './user.permission';

@Directive({
  selector: '[permissions]',
})
export class PermissionsDirective {
  private required: UserRole[];
  private viewRef: EmbeddedViewRef<any> | null = null;

  @Input()
  set permissions(roles: UserRole[]) {
    this.required = roles;
    this.viewRef = null;
    this.init();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private accountService: AccountService
  ) {}

  init(): void {
    this.accountService.getRole().subscribe(role => {
      if (new UserPermission(this.required, role).isAgreed()) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
