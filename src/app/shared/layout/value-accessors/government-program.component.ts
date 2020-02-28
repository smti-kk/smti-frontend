import {Component, forwardRef, OnInit} from '@angular/core';
import {GovernmentProgram} from '@core/models';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GovernmentProgramService} from '@core/services';

const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GovernmentProgramComponent),
  multi: true,
};

@Component({
  selector: 'app-government-program',
  template: `
    <select
      class="m-l-1"
      [formControl]="governmentProgramControl"
      [compareWith]="compareGovProgram"
    >
      <option [value]="null">Нет программы</option>
      <option *ngFor="let gp of governmentPrograms$ | async" [ngValue]="gp">{{
        gp.shortName
      }}</option>
    </select>
  `,
  providers: [VALUE_ACCESSOR],
})
export class GovernmentProgramComponent implements OnInit, ControlValueAccessor {
  governmentProgramControl: FormControlTyped<GovernmentProgram>;
  governmentPrograms$: Observable<GovernmentProgram[]>;

  constructor(private governmentProgramService: GovernmentProgramService) {
    this.governmentProgramControl = new FormControl(null);
  }

  ngOnInit() {
    this.governmentPrograms$ = this.governmentProgramService.list();
  }

  compareGovProgram(gp1: GovernmentProgram, gp2: GovernmentProgram) {
    if (gp1 === null && gp2 === null) {
      return true;
    }

    if (gp1 === null || gp2 === null) {
      return false;
    }

    return gp1.id === gp2.id;
  }

  registerOnChange(fn: any): void {
    this.governmentProgramControl.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.governmentProgramControl.disable({emitEvent: false});
    } else {
      this.governmentProgramControl.enable({emitEvent: false});
    }
  }

  writeValue(obj: GovernmentProgram): void {
    this.governmentProgramControl.setValue(obj, {emitEvent: false});
  }

  registerOnTouched(fn: any): void {}
}
