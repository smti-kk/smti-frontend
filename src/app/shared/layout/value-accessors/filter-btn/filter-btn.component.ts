import {Component, forwardRef, Input, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {OrderingDirection} from '@core/services/tc-pivots.service';

export interface OrderingFilter {
  orderingDirection: OrderingDirection;
  name: string;
  priority: number
}

export const FILTER_BUTTONS_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterBtnComponent),
  multi: true,
};

@Component({
  selector: 'app-filter-btn',
  templateUrl: './filter-btn.component.html',
  styleUrls: ['./filter-btn.component.scss'],
  providers: [FILTER_BUTTONS_VALUE_ACCESSOR],
})
export class FilterBtnComponent implements ControlValueAccessor {
  @Input() orderings: {name: string; value: string; orderingDirection: OrderingDirection}[];

  onChange: (_) => {};

  onTouched: () => {};

  OrderingDirection = OrderingDirection;

  sortParams: string[] = [];

  registerOnChange(fn: (_: []) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(obj): void {
    if (obj === null) {
      this.reset();
    }
  }

  onOrderingBtnClick(ordering: {
    name: string;
    value: string;
    orderingDirection: OrderingDirection;
  }): void {
    const orderingBuffer = ordering;

    switch (orderingBuffer.orderingDirection) {
      case OrderingDirection.UNDEFINED:
        orderingBuffer.orderingDirection = OrderingDirection.ASC;
        break;

      case OrderingDirection.ASC:
        orderingBuffer.orderingDirection = OrderingDirection.DSC;
        break;

      case OrderingDirection.DSC:
        orderingBuffer.orderingDirection = OrderingDirection.UNDEFINED;
        break;
    }

    switch (orderingBuffer.orderingDirection) {
      case OrderingDirection.ASC:
        this.sortParams.push(orderingBuffer.value);
        break;

      case OrderingDirection.DSC:
        this.sortParams.splice(this.sortParams.indexOf(orderingBuffer.value, 0), 1, `-${orderingBuffer.value}`);
        break;

      case OrderingDirection.UNDEFINED:
        this.sortParams.splice(this.sortParams.indexOf(`-${orderingBuffer.value}`, 0), 1);
        break;

      default:
        break;
    }

    this.onChange(this.sortParams);
  }

  private reset(): void {
    this.orderings.forEach(o => {
      // eslint-disable-next-line no-param-reassign
      o.orderingDirection = OrderingDirection.UNDEFINED;
    });
  }
}
