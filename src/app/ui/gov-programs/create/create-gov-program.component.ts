import {Component, Inject, OnInit} from '@angular/core';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {Operator} from '@api/dto/Operator';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SmoType} from '@api/dto/SmoType';
import {GovProgram} from '@api/dto/GovProgram';

@Component({
  selector: 'app-create-gov-program',
  templateUrl: './create-gov-program.component.html',
  styleUrls: ['./create-gov-program.component.scss']
})
export class CreateGovProgramComponent implements OnInit {
  govProgram: GovProgram;
  operators: Operator[];
  action: 'EDIT' | 'CREATE';

  constructor(private operatorsApi: OperatorsApi,
              private dialogRef: MatDialogRef<CreateGovProgramComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GovProgram) {
    if (data) {
      this.govProgram = {...data};
      this.action = 'EDIT';
    } else {
      this.govProgram = {
        id: null,
        name: null,
        govYearComplete: null,
        acronym: null,
        description: null
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
