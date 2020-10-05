import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AreYouSureComponent} from '../dialogs/are-you-sure/are-you-sure.component';
import {CreateOperatorsComponent} from './create-operators/create-operators.component';
import {Operator} from '@api/dto/Operator';
import {OperatorsApi} from '@api/operators/OperatorsApi';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  displayedColumns: string[] = ['address', 'propHeight', 'operator', 'mobileType', 'coverageRadius', 'select'];
  dataSource: MatTableDataSource<Operator>;
  operators: Operator[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  page = 0;
  size = 30;

  constructor(private readonly api: OperatorsApi,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Operator>(this.operators);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.api.findAll(this.page, this.size).subscribe(bs => {
      this.dataSource.data = bs.content;
    });
  }

  createOperator(): void {
    const dialogRef = this.dialog.open(CreateOperatorsComponent, {
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

  deleteOperator(row: Operator): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить станцию?'
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
        this.api.remove(row.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(bs => bs.id !== row.id);
        });
      }
    });
  }

  editOperator(row: Operator): void {
    const dialogRef = this.dialog.open(CreateOperatorsComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(bs => {
      if (bs) {
        console.log(bs);
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
    this.api.findAll(this.page, this.size).subscribe(bs => {
      this.dataSource.data = [...this.dataSource.data, ...bs.content];
    });
  }
}
