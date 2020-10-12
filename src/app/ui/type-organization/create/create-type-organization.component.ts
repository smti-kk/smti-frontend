import {Component, Inject, OnInit} from '@angular/core';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {Operator} from '@api/dto/Operator';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TypeOrganization} from '@api/dto/TypeOrganization';

@Component({
  selector: 'app-create-type-organization',
  templateUrl: './create-type-organization.component.html',
  styleUrls: ['./create-type-organization.component.scss']
})
export class CreateTypeOrganizationComponent implements OnInit {
  typeOrganization: TypeOrganization;
  operators: Operator[];
  action: 'EDIT' | 'CREATE';

  constructor(private operatorsApi: OperatorsApi,
              private dialogRef: MatDialogRef<CreateTypeOrganizationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeOrganization) {
    if (data) {
      this.typeOrganization = {...data};
      this.action = 'EDIT';
    } else {
      this.typeOrganization = {
        id: null,
        name: null
      };
      this.action = 'CREATE';
    }
    this.operatorsApi.findAll().subscribe(operators => {
      this.operators = operators;
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareById(station1: { id: number }, station2: { id: number }): boolean {
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
