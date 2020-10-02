import {Component, Inject, OnInit} from '@angular/core';
import {BaseStation} from '@api/dto/BaseStation';
import {Operator} from '@api/dto/Operator';
import {MobileType} from '@api/dto/MobileType';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-operators',
  templateUrl: './create-operators.component.html',
  styleUrls: ['./create-operators.component.scss']
})
export class CreateOperatorsComponent implements OnInit {

  baseStation: BaseStation;
  operators: Operator[];
  mobileTypes$: Observable<MobileType[]>;
  action: 'EDIT' | 'CREATE';

  constructor(private operatorsApi: OperatorsApi,
              private mobileTypeApi: MobileTypeApi,
              private dialogRef: MatDialogRef<CreateOperatorsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BaseStation) {
    if (data) {
      this.baseStation = {...data};
      this.action = 'EDIT';
    } else {
      this.baseStation = {
        propHeight: null,
        coverageRadius: null,
        address: null,
        actionDate: null,
        id: null,
        mobileType: null,
        operator: null,
        point: {
          lat: null,
          lng: null
        }
      };
      this.action = 'CREATE';
    }
    this.operatorsApi.findAll().subscribe(operators => {
      this.operators = operators;
    });
  }

  ngOnInit(): void {
    this.mobileTypes$ = this.mobileTypeApi.list();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareById(station1: {id: number}, station2: {id: number}): boolean {
    if (station1 === station2) {
      return true;
    }
    if (station1 === null || station2 === null) {
      return false;
    }
    if (station1.id === station2.id) {
      return true;
    }
  }

}
