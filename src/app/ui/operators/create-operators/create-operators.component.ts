import {Component, Inject, OnInit} from '@angular/core';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiOperatorServices} from '@api/api.operator.services';
import {OperatorServiceItem} from '@api/dto/OperatorServiceItem';
import {Operator} from '@api/dto/Operator';

@Component({
  selector: 'app-create-operators',
  templateUrl: './create-operators.component.html',
  styleUrls: ['./create-operators.component.scss']
})
export class CreateOperatorsComponent implements OnInit {

  operator: Operator;
  operators: Operator[];
  action: 'EDIT' | 'CREATE';
  operatorServices$: Observable<OperatorServiceItem[]>;

  constructor(private operatorsApi: OperatorsApi,
              private apiOperatorServices: ApiOperatorServices,
              private dialogRef: MatDialogRef<CreateOperatorsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Operator) {
    if (data) {
      this.operator = {...data};
      this.action = 'EDIT';
    } else {
      this.operator = {};
      this.action = 'CREATE';
    }
    this.operatorsApi.findAll().subscribe(operators => {
      this.operators = operators;
    });
  }

  ngOnInit(): void {
    this.operatorServices$ = this.apiOperatorServices.operatorServices();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareById(station1: {id: number}, station2: {id: number}): boolean {
    if (station1 === station2) {
      return true;
    }
    if (!station1 || !station2) {
      return false;
    }
    if (station1.id === station2.id) {
      return true;
    }
  }

}
