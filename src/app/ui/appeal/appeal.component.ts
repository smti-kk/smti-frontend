import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BaseStation} from '@api/dto/BaseStation';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {AppealRes} from '../../swagger-api-generated/model/appealRes';
import {ApiAppealImplService} from '../../swagger-api-generated/api/apiAppealImpl.service';
import {CreateAppealComponent} from './create-appeal/create-appeal.component';

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.scss']
})
export class AppealComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'status', 'priority', 'level', 'location', 'file', 'responseFile', 'creator', 'select'];
  dataSource: MatTableDataSource<AppealRes>;
  appeals: AppealRes[];
  page = 0;
  size = 30;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private readonly api: ApiAppealImplService,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<AppealRes>(this.appeals);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.findAllUsingGET(this.page, this.size).subscribe(bs => {
      this.dataSource.data = bs.content;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateAppealComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.updateOrCreateUsingPOST(result).subscribe((baseStation: any) => {
          if (baseStation.body) {
            this.dataSource.data = [...this.dataSource.data, baseStation.body];
          }
        });
      }
    });
  }

  deleteStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '600px',
      data: 'Вы уверены, что хотите удалить?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.deleteUsingDELETE(row.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  editStation(row: BaseStation): void {
    const dialogRef = this.dialog.open(CreateAppealComponent, {
      width: '600px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        this.api.updateOrCreateUsingPOST(bs).subscribe(() => {
          const index = this.dataSource.data.findIndex(bst => bst.id === row.id);
          this.dataSource.data[index] = bs;
          this.dataSource.data = [...this.dataSource.data];
        });
      }
    });
  }

  asAppeal(appeal: any): AppealRes {
    return appeal;
  }

  statusLabel(status: AppealRes.StatusEnum): string {
    switch (status) {
      case 'CLOSED':
        return 'Закрыто';
      case 'OPENED':
        return 'Открыто';
      case 'WAIT':
        return 'В ожидании';
    }
  }

  levelLabel(level: AppealRes.LevelEnum): string {
    switch (level) {
      case 'FEDERAL':
        return 'Федеральный';
      case 'LOCAL':
        return 'Местный';
      case 'REGIONAL':
        return 'Региональный';
    }
  }

  priorityLabel(priority: AppealRes.PriorityEnum): string {
    switch (priority) {
      case 'HIGH':
        return 'Высокий';
      case 'LOW':
        return 'Низкий';
      case 'MEDIUM':
        return 'Средний';
    }
  }

  onScrollDown(): void {
    this.page++;
    this.api.findAllUsingGET(this.page, this.size).subscribe(bs => {
      this.dataSource.data = [...this.dataSource.data, ...bs.content];
    });
  }
}
