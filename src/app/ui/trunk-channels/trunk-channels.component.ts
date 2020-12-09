import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CreateTrunkChannelComponent} from './create-trunk-channel/create-trunk-channel.component';
import {TrunkChannel} from '@api/dto/TrunkChannel';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
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
  dataSource: TrunkChannel[];
  baseStations: TrunkChannel[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  totalCount: number;
  pageSize: number = 20;
  totalPage: number;
  currentPage = 0;
  isLoading = false;

  constructor(
    private readonly api: TrunkChannelsApi,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.api.list().subscribe(bs => {
      this.dataSource = bs;
      this.totalCount = this.dataSource.length;
      this.totalPage = Math.ceil(this.dataSource.length / this.pageSize);

      this.baseStations = this.getItems();
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open(CreateTrunkChannelComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe(baseStation => {
          this.dataSource = [...this.dataSource, baseStation];
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
          this.dataSource = this.dataSource.filter(bs => bs.id !== row.id);
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
          const index = this.dataSource.findIndex(bst => bst.id === row.id);
          this.dataSource[index] = bs;
          this.dataSource = [...this.dataSource];
        });
      }
    });
  }

  onNextPage(){
    if(this.isLoading){return;}
    if((this.totalPage - 1) <= this.currentPage){return;}
    this.isLoading = true;
    this.currentPage++;

    setTimeout(() => {
      this.baseStations = this.getItems();
      this.isLoading = false;
    }, 200);
  }

  getItems(){
    const viewItemsCount = this.pageSize * (this.currentPage + 1);
    return this.dataSource.slice(0, viewItemsCount);
  }
}
