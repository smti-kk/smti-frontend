import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CreateTrunkChannelComponent} from './create-trunk-channel/create-trunk-channel.component';
import {TrunkChannel} from '@api/dto/TrunkChannel';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {TrunkChannelsApi} from '@api/trunk-channels/TrunkChannelsApi';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-trunk-channels',
  templateUrl: './trunk-channels.component.html',
  styleUrls: ['./trunk-channels.component.scss']
})
export class TrunkChannelsComponent implements OnInit {

  displayedColumns: string[] = ['locationStart', 'locationEnd', 'operator', 'typeTrunkChannel', 'commissioning', 'decommissioning', 'program', 'completed', 'select'];
  dataSource: MatTableDataSource<TrunkChannel>;
  baseStations: TrunkChannel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private readonly api: TrunkChannelsApi,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TrunkChannel>(this.baseStations);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.list().subscribe(bs => {
      this.dataSource.data = bs;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateTrunkChannelComponent, {
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

  delete(row: TrunkChannel): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.remove(row.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  edit(row: TrunkChannel): void {
    const dialogRef = this.dialog.open(CreateTrunkChannelComponent, {
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
}
