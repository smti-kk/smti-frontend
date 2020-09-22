import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum OrderingDirection {
  ASC,
  DSC,
  UNDEFINED,
}

export interface OrderingFilter {
  orderingDirection: OrderingDirection;
  name: string;
}

export const FILTER_BUTTONS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterBtnComponent),
  multi: true,
};

@Component({
  selector: 'sort-btn',
  templateUrl: './filter-btn.component.html',
  providers: [FILTER_BUTTONS_VALUE_ACCESSOR]
})
export class FilterBtnComponent implements ControlValueAccessor {

  @Input() orderings: { name: string, value: string, orderingDirection: OrderingDirection }[];
  onChange: (_: any) => {};
  onTouched: () => {};
  OrderingDirection = OrderingDirection;

  constructor() {

  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj === null) {
      this.reset();
    }
  }

  onOrderingBtnClick(ordering: { name: string; value: string; orderingDirection: OrderingDirection }): void {
    if (ordering.orderingDirection === OrderingDirection.UNDEFINED) {
      ordering.orderingDirection = OrderingDirection.ASC;
    } else if (ordering.orderingDirection === OrderingDirection.ASC) {
      ordering.orderingDirection = OrderingDirection.DSC;
    } else {
      ordering.orderingDirection = OrderingDirection.UNDEFINED;
    }

    this.orderings.forEach(iOrdering => {
      if (iOrdering !== ordering) {
        iOrdering.orderingDirection = OrderingDirection.UNDEFINED;
      }
    });

    this.onChange({name: ordering.value, orderingDirection: ordering.orderingDirection});
  }

  private reset(): void {
    this.orderings.forEach(o => {
      o.orderingDirection = OrderingDirection.UNDEFINED;
    });
  }
}
