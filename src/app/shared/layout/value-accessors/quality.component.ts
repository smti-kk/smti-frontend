import { Component, forwardRef, Provider } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Quality} from '@core/models';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QualityComponent),
  multi: true,
};

@Component({
  selector: 'app-quality',
  template: `
    <select [formControl]="quality">
      <option [ngValue]="Quality.GOOD">Хорошее качество</option>
      <option [ngValue]="Quality.NORMAL">Удовлетворительное качество</option>
      <option [ngValue]="Quality.ABSENT">Отсутствует</option>
    </select>
  `,
  providers: [VALUE_ACCESSOR],
})
export class QualityComponent implements ControlValueAccessor {
  quality: FormControlTyped<Quality>;

  Quality = Quality;

  private onTouched: () => {};

  constructor() {
    this.quality = new FormControl(null);
  }

  registerOnChange(fn: (quality: Quality) => {}): void {
    this.quality.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.quality.disable({emitEvent: false});
    } else {
      this.quality.enable({emitEvent: false});
    }
  }

  writeValue(obj: Quality): void {
    this.quality.setValue(obj, {emitEvent: false});
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
