import {Component, forwardRef} from '@angular/core';
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

  private onChange: (state) => {};
  private readonly states = [null, true, false];
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
    if (this.stateIndex === 2) {
      this.stateIndex = 0;
    } else {
      this.stateIndex++;
    }
  }

  findIndex(obj: any): number {
    return this.states.indexOf(obj);
  }
}
