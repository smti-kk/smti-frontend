import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

import {TrunkChannel} from '@core/models';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrunkChannelComponent),
  multi: true,
};

@Component({
  selector: 'app-trunk-channel',
  template: `
    <div class="c-radiobox l-radiobox-row u-border-left u-border-right" [formGroup]="form">
      <label
        ><input formControlName="mobileGeneration" type="radio" [value]="TrunkChannel.SATELLITE" />
        <div class="c-radiobox-text">Спутник</div>
      </label>
      <label
        ><input formControlName="mobileGeneration" type="radio" [value]="TrunkChannel.VOLS" />
        <div class="c-radiobox-text">ВОЛС</div>
      </label>
      <label
        ><input
          formControlName="mobileGeneration"
          type="radio"
          [value]="TrunkChannel.COPPER_CABLE"
        />
        <div class="c-radiobox-text">Медь</div>
      </label>
      <label
        ><input
          formControlName="mobileGeneration"
          type="radio"
          [value]="TrunkChannel.RADIO_CHANEL"
        />
        <div class="c-radiobox-text">Радиоканал</div>
      </label>
    </div>
  `,
  providers: [VALUE_ACCESSOR],
})
export class TrunkChannelComponent implements OnInit, ControlValueAccessor {
  TrunkChannel = TrunkChannel;

  control: FormControlTyped<TrunkChannel>;

  form: FormGroupTyped<{trunkChannel: TrunkChannel}>;

  private onTouched: () => {};

  ngOnInit(): void {
    this.control = new FormControl(null);

    this.form = new FormGroup({trunkChannel: this.control}) as FormGroupTyped<{
      trunkChannel: TrunkChannel;
    }>;
  }

  registerOnChange(onChange: (value: TrunkChannel) => {}): void {
    this.control.valueChanges.subscribe(value => {
      onChange(value);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({emitEvent: false});
    } else {
      this.control.enable({emitEvent: false});
    }
  }

  writeValue(obj: TrunkChannel): void {
    this.control.setValue(obj, {emitEvent: false});
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
