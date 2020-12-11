import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {Observable} from 'rxjs';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GovProgramSelect),
  multi: true
};

@Component({
  selector: 'gov-program-select',
  template: `
    <mat-form-field>
      <mat-label>Гос. программа</mat-label>
      <mat-select [formControl]="formControl">
        <mat-option [value]="null">Гос. программа</mat-option>
        <mat-option *ngFor="let gp of govPrograms$ | async" [value]="gp.id">{{gp.name}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['gov-program-select.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GovProgramSelect implements ControlValueAccessor, OnInit {
  govPrograms$: Observable<GovProgram[]>;
  formControl: FormControl;

  constructor(private govProgramService: GovProgramService) {
    this.formControl = new FormControl();
  }

  registerOnChange(onChange: (gp: GovProgram) => void): void {
    this.formControl.valueChanges.subscribe(v => {
      onChange(v);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: GovProgram): void {
    this.formControl.setValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  ngOnInit(): void {
    this.govPrograms$ = this.govProgramService.list();
  }
}
