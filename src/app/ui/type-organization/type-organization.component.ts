import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateTypeOrganizationComponent} from './create/create-type-organization.component';
import {BaseStation} from '@api/dto/BaseStation';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';
import {TypeOrganization} from '@api/dto/TypeOrganization';
import {ApiOrganizationType} from '@api/ApiOrganizationType';

@Component({
  selector: 'app-type-organization',
  templateUrl: './type-organization.component.html',
  styleUrls: ['./type-organization.component.scss']
})
export class TypeOrganizationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'select'];
  dataSource: MatTableDataSource<TypeOrganization>;
  typeOrganizations: TypeOrganization[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(private readonly api: ApiOrganizationType,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TypeOrganization>(this.typeOrganizations);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.list().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateTypeOrganizationComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.createOrUpdateOrganizationType(result).subscribe(typeOrganization => {
          this.dataSource.data = [...this.dataSource.data, typeOrganization];
        });
      }
    });
  }

  deleteStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.deleteTypeOrganization(row.id).subscribe(() => {
          console.log(this.dataSource.data, row);
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  editStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(CreateTypeOrganizationComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        console.log(bs);
        this.api.createOrUpdateOrganizationType(bs).subscribe(() => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = bs;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }
}
