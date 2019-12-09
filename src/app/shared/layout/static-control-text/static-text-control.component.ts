import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GovernmentProgram } from '@core/models';

export const SIMPLE_CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StaticTextControl),
  multi: true,
};

@Component({
  selector: 'app-static-text-control',
  templateUrl: './static-text-control.html',
  providers: [SIMPLE_CHECKBOX_VALUE_ACCESSOR]
})
export class StaticTextControl implements ControlValueAccessor {

  value: string;

  constructor() {

  }

  registerOnChange(fn: (_: any) => {}): void {
  }

  registerOnTouched(fn: () => {}): void {
  }

  writeValue(obj: string | GovernmentProgram): void {
    if (obj instanceof GovernmentProgram) {
      this.value = obj.shortName;
    } else if (obj !== null) {
      this.value = obj;
    } else {
      this.value = '------';
    }
  }
}
