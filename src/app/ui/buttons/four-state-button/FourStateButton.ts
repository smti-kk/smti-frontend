import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FourStateButton),
  multi: true
};

@Component({
  selector: 'four-state-button',
  template: `
    <span class="state state_{{stateIndex}}" (click)="onClick()"><ng-content></ng-content></span>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['four-state-button.scss']
})
export class FourStateButton implements ControlValueAccessor {
  private onChange: (state) => {};
  private states: (string|null)[] = [null, 'state_1', 'state_2', 'state_3'];
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
    const lastIdx = 3;
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
