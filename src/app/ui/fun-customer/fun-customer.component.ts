import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FunCustomer, FunCustomerApType, IFunCustomer } from '@core/models/funCustomer';
import { FunCustomerService } from '@core/services/funCustomer.service';
import { FunCustomerViewComponent } from './fun-customer-view/fun-customer-view.component';
import { LocationFilters } from 'src/app/ui/locations-page/location-filters/LocationFilters';
import { Serialize } from 'cerialize';
import { AreYouSureComponent } from 'src/app/ui/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-fun-customer',
  templateUrl: './fun-customer.component.html',
  styleUrls: ['./fun-customer.component.scss'],
})
export class FunCustomerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'apType', 'select'];
  dataSource: MatTableDataSource<FunCustomer>;
  typeOrganizations: FunCustomer[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  page = 0;
  size = 30;
  filters: LocationFilters | any = {};

  constructor(
    private readonly funCustomerService: FunCustomerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<FunCustomer>(
      this.typeOrganizations
    );
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.funCustomerService.getCustomers().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  createStation(): void {
    const dialogRef = this.dialog.open<
      FunCustomerViewComponent,
      IFunCustomer,
      IFunCustomer
    >(FunCustomerViewComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        delete result.id;
        this.funCustomerService
          .create(result)
          .subscribe((newFunCustomer) => {
            this.dataSource.data = [...this.dataSource.data, newFunCustomer];
          });
      }
    });
  }

  editStation(row: FunCustomer): void {
    const dialogRef = this.dialog.open<
      FunCustomerViewComponent,
      IFunCustomer,
      IFunCustomer
    >(FunCustomerViewComponent, {
      width: '450px',
      data: Serialize(row, FunCustomer),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.funCustomerService
          .update(result)
          .subscribe((updatedFunCustomer) => {
            const idx = this.dataSource.data.findIndex(
              (fc) => fc.id === updatedFunCustomer.id
            );
            this.dataSource.data[idx] = updatedFunCustomer;
            this.dataSource.data = [...this.dataSource.data];
          });
      }
    });
  }

  deleteStation(row: FunCustomer): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '450px',
      data: 'Вы уверены, что хотите удалить?',
    });
    dialogRef.afterClosed().subscribe((isAccepted) => {
      if (isAccepted) {
        this.funCustomerService.delete(row.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(fc => fc.id !== row.id);
        })
      }
    });
  }

  getApTypeName(apType: FunCustomerApType): string {
    switch (apType) {
      case 'SMO':
        return 'СЗО';
      case 'ESPD':
        return 'ЕСПД';
      default:
        return 'ОБЩИЙ';
    }
  }
}
