import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateTypeSmoComponent} from './create/create-type-smo.component';
import {BaseStation} from '@api/dto/BaseStation';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';
import {SmoType} from '@api/dto/SmoType';
import {ApiSmoType} from '@api/ApiSmoType';

@Component({
  selector: 'app-type-smo',
  templateUrl: './type-smo.component.html',
  styleUrls: ['./type-smo.component.scss']
})
export class TypeSmoComponent implements OnInit {
  displayedColumns: string[] = ['name', 'select'];
  dataSource: MatTableDataSource<SmoType>;
  typeOrganizations: SmoType[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(private readonly api: ApiSmoType,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SmoType>(this.typeOrganizations);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.list().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateTypeSmoComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.createSmoType(result).subscribe(typeOrganization => {
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
        this.api.delete(row.id).subscribe(() => {
          console.log(this.dataSource.data, row);
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  editStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(CreateTypeSmoComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        console.log(bs);
        this.api.createSmoType(bs).subscribe(() => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = bs;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }
}
