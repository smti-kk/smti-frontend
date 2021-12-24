import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ThreeStateButton),
  multi: true
};

@Component({
  selector: 'three-state-button',
  template: `
    <span class="state state_{{stateIndex}}" (click)="onClick()"><ng-content></ng-content></span>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['three-state-button.scss']
})
export class ThreeStateButton implements ControlValueAccessor {

  @Input() set isExtended( value : boolean | string) {
    if (value) {
      this.states = [null, true, false, '0', '1'];
    }

  };

  private onChange: (state) => {};
  private states: (string|boolean)[] = [null, true, false];
  stateIndex = 0;

  registerOnChange(fn: (state: number) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: number): void {
    const fundedIndex = this.findIndex(obj);
    if (fundedIndex === -1) {
      throw Error(`illegal button state exception ${obj}`);
    }
    this.stateIndex = fundedIndex;
  }

  onClick(): void {
    this.incrementIndexState();
    this.onChange(this.states[this.stateIndex]);
  }

  incrementIndexState(): void {
    const lastIdx = this.states.length === 3 ? 2 : 4;
    if (this.stateIndex === lastIdx) {
      this.stateIndex = 0;
    } else {
      this.stateIndex++;
    }
  }

  findIndex(obj: any): number {
    return this.states.indexOf(obj);
  }
}
