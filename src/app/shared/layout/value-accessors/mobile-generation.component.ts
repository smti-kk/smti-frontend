import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';

import {MobileGeneration} from '@core/models';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MobileGenerationComponent),
  multi: true,
};

@Component({
  selector: 'app-mobile-generation',
  template: `
    <div class="c-radiobox l-radiobox-row u-border-left u-border-right" [formGroup]="form">
      <label
        ><input type="radio" [value]="MobileGeneration._2G" formControlName="mobileGeneration" />
        <div class="c-radiobox-text">2G</div>
      </label>
      <label
        ><input type="radio" [value]="MobileGeneration._3G" formControlName="mobileGeneration" />
        <div class="c-radiobox-text">3G</div>
      </label>
      <label
        ><input type="radio" [value]="MobileGeneration._4G" formControlName="mobileGeneration" />
        <div class="c-radiobox-text">4G</div>
      </label>
      <label
        ><input type="radio" [value]="MobileGeneration._5G" formControlName="mobileGeneration" />
        <div class="c-radiobox-text">5G</div>
      </label>
    </div>
  `,
  providers: [VALUE_ACCESSOR],
})
export class MobileGenerationComponent implements OnInit, ControlValueAccessor {
  MobileGeneration = MobileGeneration;

  form: FormGroupTyped<{mobileGeneration: MobileGeneration}>;

  private onTouched: () => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({mobileGeneration: null}) as FormGroupTyped<{
      mobileGeneration: MobileGeneration;
    }>;
  }

  registerOnChange(onChange: (value: MobileGeneration) => {}): void {
    this.form.valueChanges.subscribe(value => {
      onChange(value.mobileGeneration);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable({emitEvent: false});
    } else {
      this.form.enable({emitEvent: false});
    }
  }

  writeValue(obj: MobileGeneration): void {
    this.form.setValue({mobileGeneration: obj}, {emitEvent: false});
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
