import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {MatDialog} from '@angular/material/dialog';
import {CreateBaseStationComponent} from './create-base-station/create-base-station.component';
import {BaseStation} from '@api/dto/BaseStation';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';

@Component({
  selector: 'app-base-stations',
  templateUrl: './base-stations.component.html',
  styleUrls: ['./base-stations.component.scss']
})
export class BaseStationsComponent implements OnInit {
  displayedColumns: string[] = ['address', 'propHeight', 'operator', 'mobileType', 'coverageRadius', 'actionDate', 'select'];
  dataSource: MatTableDataSource<BaseStation>;
  baseStations: BaseStation[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(private readonly api: BaseStationsApi,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<BaseStation>(this.baseStations);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.list(this.page, this.size, this.filters).subscribe(bs => {
      this.dataSource.data = bs.content;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateBaseStationComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe(baseStation => {
          this.dataSource.data = [...this.dataSource.data, baseStation];
        });
      }
    });
  }

  deleteStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить станцию?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.remove(row.id).subscribe(() => {
          console.log(this.dataSource.data, row);
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  editStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(CreateBaseStationComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        this.api.update(bs).subscribe(() => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = bs;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }

  onScrollDown(): void {
    this.page++;
    this.api.list(this.page, this.size).subscribe(bs => {
      this.dataSource.data = [...this.dataSource.data, ...bs.content];
    });
  }

  filter(filters: LocationFilters): void {
    this.page = 0;
    this.filters = filters;
    this.api.list(this.page, this.size, filters).subscribe(bs => {
      this.dataSource.data = bs.content;
    });
  }
}
