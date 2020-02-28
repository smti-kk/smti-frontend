import { Component, forwardRef, OnInit } from '@angular/core';
import { Quality } from '@core/models';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: any = {
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
export class QualityComponent implements OnInit, ControlValueAccessor {
  quality: FormControlTyped<Quality>;
  Quality = Quality;

  constructor() {
    this.quality = new FormControl(null);
  }

  ngOnInit() {}

  registerOnChange(fn: any): void {
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

  registerOnTouched(fn: any): void {}
}
