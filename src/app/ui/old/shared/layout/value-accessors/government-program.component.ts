import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

import {GovernmentProgram} from '@core/models';
import {GovernmentProgramService} from '@core/services';
import {compareById} from '@core/utils/compare';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GovernmentProgramComponent),
  multi: true,
};

@Component({
  selector: 'app-government-program',
  template: `
    <select class="m-l-1" [formControl]="governmentProgramControl" [compareWith]="compareById">
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

  onTouched: () => {};

  compareById = compareById;

  constructor(private governmentProgramService: GovernmentProgramService) {
    this.governmentProgramControl = new FormControl(null);
  }

  ngOnInit(): void {
    this.governmentPrograms$ = this.governmentProgramService.list();
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (value: GovernmentProgram) => {}): void {
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
}
