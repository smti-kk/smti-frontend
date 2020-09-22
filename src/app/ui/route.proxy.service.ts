import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from '@service/account/AccountService';
import {UserRole} from '@service/account/UserRole';

@Injectable()
export class RouteProxyService implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!(await this.hasPermissions(route.data.permissions))) {
      await this.router.navigate(['']);
      return false;
    }
    return true;
  }

  private async hasPermissions(required: UserRole[]): Promise<boolean> {
    if (!required) {
      return true;
    }
    const roles: UserRole[] = await this.accountService.getRole().toPromise();
    let result = false;
    roles.forEach(role => {
      if (required.indexOf(role) !== -1) {
        result = true;
      }
    });
    return result;
  }
}
