import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateGovProgramComponent} from './create/create-gov-program.component';
import {BaseStation} from '@api/dto/BaseStation';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';
import {GovProgram} from '../../api/dto/GovProgram';
import {GovProgramService} from '@service/gov-program/GovProgramService';

@Component({
  selector: 'app-gov-program',
  templateUrl: './gov-program.component.html',
  styleUrls: ['./gov-program.component.scss']
})
export class GovProgramComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'acronym', 'select'];
  dataSource: MatTableDataSource<GovProgram>;
  govPrograms: GovProgram[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(private readonly api: GovProgramService,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<GovProgram>(this.govPrograms);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.list().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateGovProgramComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe(typeOrganization => {
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
    const dialogRef = this.dialog.open(CreateGovProgramComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        console.log(bs);
        this.api.create(bs).subscribe(() => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = bs;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }
}
