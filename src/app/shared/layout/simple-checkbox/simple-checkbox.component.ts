import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const SIMPLE_CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SimpleCheckbox),
  multi: true,
};

@Component({
  selector: 'app-simple-checkbox',
  templateUrl: './simple-checkbox.component.html',
  providers: [SIMPLE_CHECKBOX_VALUE_ACCESSOR],
})
export class SimpleCheckbox implements ControlValueAccessor {
  @Input()
  value: any;

  @Input()
  label: string;

  disabled: boolean;

  @ViewChild('checkbox', {static: true})
  private checkbox: ElementRef;

  private onChange: (_: any) => {};

  constructor() {}

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {}

  writeValue(obj: any): void {
    console.log(obj, this.value);
    if (obj && obj.id) {
      this.checkbox.nativeElement.checked = obj.id === this.value.id;
    }
  }

  inputChange(event) {
    if (event.target.checked === true) {
      this.onChange(this.value);
    } else {
      this.onChange(null);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
