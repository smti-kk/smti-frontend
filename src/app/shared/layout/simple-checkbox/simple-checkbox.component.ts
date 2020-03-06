import { Component, ElementRef, forwardRef, Input, Provider, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const SIMPLE_CHECKBOX_VALUE_ACCESSOR: Provider = {
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
  value;

  @Input()
  label: string;

  disabled: boolean;

  @ViewChild('checkbox', {static: true})
  private checkbox: ElementRef;

  private onChange: (_) => {};

  private onTouched: () => {};

  registerOnChange(fn: (_) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(obj: {id: number}): void {
    if (obj === null) {
      this.checkbox.nativeElement.checked = obj === this.value;
    }

    if (obj && obj.id) {
      this.checkbox.nativeElement.checked = obj.id === this.value.id;
    }
  }

  inputChange(event): void {
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
