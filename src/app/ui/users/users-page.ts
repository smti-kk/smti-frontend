import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '@service/account/UsersService';
import {UserFromApi} from '@api/dto/UserFromApi';
import {MatDialog} from '@angular/material/dialog';
import {FormCreateUserComponent} from './form-create-user/form-create-user.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
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
              private readonly _snackBar: MatSnackBar,
              private readonly modalService: MatDialog) {
    this.dataSource = new MatTableDataSource<UserFromApi>(this.items);
    this.roles = {};
    this.roles.ADMIN = 'Администратор';
    this.roles.GUEST = 'Посетитель';
    this.roles.MUNICIPALITY = 'Муниципалитет';
    this.roles.ORGANIZATION = 'Оператор - Организации';
    this.roles.OPERATOR = 'Оператор - Локации';
  }

  ngOnInit(): void {
    this.api.pageList(this.page, this.size, this.filters).subscribe(value => {
      
      this.dataSource.data = value.content;
    });
  }

  edit(row: any): void {
    const dialogRef = this.modalService.open(FormCreateUserComponent, {
      width: '520px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        this.api.update(bs).subscribe((response) => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = response;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }

  create(): void {
    const modal = this.modalService.open(FormCreateUserComponent, {
      width: '520px',
    });

    modal.afterClosed().subscribe(result => {
        if (result) {
          this.api.create(result).subscribe(
            res => {
              this.dataSource.data = [...this.dataSource.data, res];
              this._snackBar.open('Пользователь добавлен', 'Ок');
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

  onScrollDown(): void {
    this.page++;
    this.api.pageList(this.page, this.size).subscribe(bs => {
      this.dataSource.data = [...this.dataSource.data, ...bs.content];
    });
  }


}
