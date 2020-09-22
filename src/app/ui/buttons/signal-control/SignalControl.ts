import {Component, forwardRef, OnDestroy} from '@angular/core';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {Signal} from '@api/dto/Signal';
import {Subscription} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SignalControl),
  multi: true
};

@Component({
  selector: 'signal-control',
  template: `
    <mat-checkbox
      [disabled]="isDisabled"
      [checked]="hasSignal(signal)"
      (change)="onChange($event, signal)"
      *ngFor="let signal of signals"
    >
      {{signal.name}}
    </mat-checkbox>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SignalControl implements OnDestroy, ControlValueAccessor {
  signals: Signal[];
  controlValue: Signal[] = [];
  isDisabled = false;
  private subscription: Subscription;
  private fnOnChange: any;

  constructor(private readonly tvTypeApi: TvTypeApi) {
    this.subscription = this.tvTypeApi.list().subscribe(signals => {
      this.signals = signals;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerOnChange(fn: any): void {
    this.fnOnChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj === null) {
      this.controlValue = [];
    } else {
      this.controlValue = obj;
    }
  }

  onChange(event: MatCheckboxChange, signal: Signal): void {
    if (event.checked) {
      this.controlValue.push(signal);
    } else {
      this.controlValue = this.controlValue.filter(s => s.id !== signal.id);
    }
    if (this.fnOnChange) {
      this.fnOnChange(this.controlValue);
    }
  }

  hasSignal(signal: Signal): boolean {
    if (!this.controlValue) {
      return false;
    }
    return !!this.controlValue.find(s => s.id === signal.id);
  }
}
