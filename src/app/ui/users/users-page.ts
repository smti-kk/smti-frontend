import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '@service/account/UsersService';
import {UserFromApi} from '@api/dto/UserFromApi';
import {DLocationBase} from '@api/dto/DLocationBase';
import {DLocationsService} from '@service/locations/DLocationsService';
import {DOrganizationBase} from '@api/dto/DOrganizationBase';
import {DOrganizationsService} from '@service/organizations/DOrganizationsService';
import {MatDialog} from '@angular/material/dialog';
import {FormCreateUserComponent} from './form-create-user/form-create-user.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormResetPasswordComponent} from './form-reset-password/form-reset-password.component';
import {MatTableDataSource} from '@angular/material/table';
import {BaseStation} from '@api/dto/BaseStation';
import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {MatPaginator} from '@angular/material/paginator';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.html',
  styleUrls: ['./users-page.scss']
})
// tslint:disable:variable-name
export class UsersPage implements OnInit {
  displayedColumns: string[] = ['username', 'isActive', 'roles', 'firstName', 'lastName', 'patronymicName', 'email', 'locations', 'organizations', 'select'];
  dataSource: MatTableDataSource<UserFromApi>;
  items: UserFromApi[];
  roles: { [key: string]: string };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(private readonly api: UsersService,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<UserFromApi>(this.items);
    this.roles = {};
    this.roles.ADMIN = 'Администратор';
    this.roles.GUEST = 'Посетитель';
    this.roles.MUNICIPALITY = 'Муниципалитет';
    this.roles.ORGANIZATION = 'Оператор - Организации';
    this.roles.OPERATOR = 'Оператор - Локации';
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.api.pageList(this.page, this.size, this.filters).subscribe(value => {
      this.dataSource.data = value.content;
    });
    // this.api.list(this.page, this.size, this.filters).subscribe(bs => {
    //   this.dataSource.data = bs.content;
    // });
  }

 /* editCache: Map<number, { edit: boolean; data: UserFromApi }>;
  items: UserFromApi[] = [];
  locations: DLocationBase[] = [];
  organizations: DOrganizationBase[] = [];
  roles: { [key: string]: string };
  private readonly usersService: UsersService;
  private readonly dLocationService: DLocationsService;
  private readonly dOrganizationService: DOrganizationsService;

  constructor(
    usersService: UsersService,
    dLocationService: DLocationsService,
    dOrganizationService: DOrganizationsService,
    private _snackBar: MatSnackBar,
    private modalService: MatDialog) {
    this.roles = {};
    this.roles.ADMIN = 'Администратор';
    this.roles.GUEST = 'Посетитель';
    this.roles.MUNICIPALITY = 'Муниципалитет';
    this.roles.ORGANIZATION = 'Оператор - Организации';
    this.roles.OPERATOR = 'Оператор - Локации';
    this.usersService = usersService;
    this.dLocationService = dLocationService;
    this.dOrganizationService = dOrganizationService;
  }

  startEdit(id: number): void {
    this.editCache.get(id).edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    this.editCache.set(id, {
      edit: false,
      data: {...this.items[index]}
    });
  }

  saveEdit(id: number): void {
    this.usersService.update(this.editCache.get(id).data).subscribe(value => {
        this.editCache.set(id, {
          edit: false,
          data: value
        });
        const index = this.items.findIndex(item => item.id === id);
        Object.assign(this.items[index], this.editCache.get(id).data);
      },
      error => {
        this._snackBar.open(error.error.message, 'Ок');
      });
  }

  ngOnInit(): void {
    this.editCache = new Map<number, { edit: boolean, data: UserFromApi }>();
    this.usersService.list().subscribe(value => {
      this.items = value;
      this.updateEditCache();
    });
    this.dLocationService.all().subscribe(value => {
      this.locations = value;
    });
    this.dOrganizationService.all().subscribe(value => {
      this.organizations = value;
    });
  }

  updateEditCache(): void {
    this.items.forEach(item => {
      this.editCache.set(item.id, {
        edit: false,
        data: {...item}
      });
    });
  }

  locationsCompareFn = (a: DLocationBase, b: DLocationBase) => {
    return a.id === b.id;
  };

  organizationsCompareFn = (a: DOrganizationBase, b: DOrganizationBase) => {
    return a.id === b.id;
  };


  canEditLocations(roles: string[]): boolean {
    return roles.includes('MUNICIPALITY');
  }

  canEditOrganizations(roles: string[]): boolean {
    return roles.includes('ORGANIZATION');
  }

  changeRoles(item: UserFromApi): void {
    if (!this.editCache.get(item.id).data.roles.includes('MUNICIPALITY')) {
      item.locations = [];
      this.editCache.get(item.id).data.locations = [];
    }
    if (!this.editCache.get(item.id).data.roles.includes('ORGANIZATION')) {
      item.organizations = [];
      this.editCache.get(item.id).data.organizations = [];
    }
  }

  createUser(): void {
    const modal = this.modalService.open(FormCreateUserComponent, {
      width: '520px',
    });

    modal.afterClosed().subscribe(result => {
        if (result) {
          this.usersService.create(result).subscribe(
            res => {
              this.items.unshift(res);
              this.updateEditCache();
            },
            err => {
              this._snackBar.open(err.error.message, 'Ок');
            }
          );
        }
      },
      error => {
        this._snackBar.open(error.error.message, 'Ок');
      });
  }

  changePassword(id: number): void {
    const user = this.items.find(item => item.id === id);
    const modal = this.modalService.open(FormResetPasswordComponent, {
      width: '520px',
      data: user,
    });

    modal.afterClosed().subscribe(result => {
        if (result) {
          this.usersService.updatePassword(user.id, result.password).subscribe(
            () => {
              this._snackBar.open('Пароль задан', 'Ок');
            },
            err => {
              this._snackBar.open('Пароль НЕ задан', 'Ок');
            }
          );
        }
      },
      error => {
        this._snackBar.open(error.error.message, 'Ок');
      });
  }*/
  delete(row: any): void {
    return null;
  }

  edit(row: any): void {
    return null;
  }

  create(): void {
    return null;
  }

  onScrollDown(): void {
    this.page++;
    this.api.pageList(this.page, this.size).subscribe(bs => {
      this.dataSource.data = [...this.dataSource.data, ...bs.content];
    });
  }
}
