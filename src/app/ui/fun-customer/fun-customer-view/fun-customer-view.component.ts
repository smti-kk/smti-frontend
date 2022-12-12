import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFunCustomer } from '@core/models/funCustomer';

@Component({
  selector: 'app-fun-customer-view',
  templateUrl: './fun-customer-view.component.html',
  styleUrls: ['./fun-customer-view.component.scss'],
})
export class FunCustomerViewComponent implements OnInit {
  action: 'EDIT' | 'CREATE';
  funCustomer: IFunCustomer;

  constructor(
    private dialogRef: MatDialogRef<FunCustomerViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFunCustomer
  ) {
    if (data) {
      this.funCustomer = { ...data };
      this.action = 'EDIT';
    } else {
      this.funCustomer = {
        id: null,
        name: null,
      };
      this.action = 'CREATE';
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
