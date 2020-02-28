import { Component, forwardRef, OnInit } from '@angular/core';
import {MobileGeneration} from '@core/models';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MobileGenerationComponent),
  multi: true,
};

@Component({
  selector: 'app-mobile-generation',
  template: `
    <div class="c-radiobox l-radiobox-row u-border-left u-border-right">
      <label
        ><input
          type="radio"
          [value]="MobileGeneration._2G"
          [formControl]="mobileGenerationControl"
        />
        <div class="c-radiobox-text">2G</div>
      </label>
      <label
        ><input
          type="radio"
          [value]="MobileGeneration._3G"
          [formControl]="mobileGenerationControl"
        />
        <div class="c-radiobox-text">3G</div>
      </label>
      <label
        ><input
          type="radio"
          [value]="MobileGeneration._4G"
          [formControl]="mobileGenerationControl"
        />
        <div class="c-radiobox-text">4G</div>
      </label>
      <label
        ><input
          type="radio"
          [value]="MobileGeneration._5G"
          [formControl]="mobileGenerationControl"
        />
        <div class="c-radiobox-text">5G</div>
      </label>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class MobileGenerationComponent implements OnInit, ControlValueAccessor {
  MobileGeneration = MobileGeneration;
  mobileGenerationControl: FormControlTyped<MobileGeneration>;

  constructor() {}

  ngOnInit() {
    this.mobileGenerationControl = new FormControl(null);
  }

  registerOnChange(onChange: any): void {
    this.mobileGenerationControl.valueChanges.subscribe(value => {
      onChange(value);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.mobileGenerationControl.disable({emitEvent: false});
    } else {
      this.mobileGenerationControl.enable({emitEvent: false});
    }
  }

  writeValue(obj: MobileGeneration): void {
    this.mobileGenerationControl.setValue(obj, {emitEvent: false});
  }

  registerOnTouched(fn: any): void {}
}
