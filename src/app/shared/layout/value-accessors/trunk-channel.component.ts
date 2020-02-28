import {Component, forwardRef, OnInit} from '@angular/core';
import {MobileGeneration, TrunkChannel} from '@core/models';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrunkChannelComponent),
  multi: true,
};

@Component({
  selector: 'app-trunk-channel',
  template: `
    <div class="c-radiobox l-radiobox-row u-border-left u-border-right">
      <label
        ><input [formControl]="control" type="radio" [value]="TrunkChannel.SATELLITE" />
        <div class="c-radiobox-text">Спутник</div>
      </label>
      <label
        ><input [formControl]="control" type="radio" [value]="TrunkChannel.VOLS" />
        <div class="c-radiobox-text">ВОЛС</div>
      </label>
      <label
        ><input [formControl]="control" type="radio" [value]="TrunkChannel.COPPER_CABLE" />
        <div class="c-radiobox-text">Медь</div>
      </label>
      <label
        ><input [formControl]="control" type="radio" [value]="TrunkChannel.RADIO_CHANEL" />
        <div class="c-radiobox-text">Радиоканал</div>
      </label>
    </div>
  `,
  providers: [VALUE_ACCESSOR],
})
export class TrunkChannelComponent implements OnInit, ControlValueAccessor {
  TrunkChannel = TrunkChannel;
  control: FormControlTyped<MobileGeneration>;

  constructor() {}

  ngOnInit() {
    this.control = new FormControl(null);
  }

  registerOnChange(onChange: any): void {
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

  writeValue(obj: MobileGeneration): void {
    this.control.setValue(obj, {emitEvent: false});
  }

  registerOnTouched(fn: any): void {}
}
