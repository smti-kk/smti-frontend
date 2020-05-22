import {Component, forwardRef, Input, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {OrderingDirection} from '@core/services/tc-pivots.service';

export interface OrderingFilter {
  orderingDirection: OrderingDirection;
  name: string;
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

  registerOnChange(fn: (_) => {}): void {
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

    if (orderingBuffer.orderingDirection === OrderingDirection.UNDEFINED) {
      orderingBuffer.orderingDirection = OrderingDirection.ASC;
    } else if (orderingBuffer.orderingDirection === OrderingDirection.ASC) {
      orderingBuffer.orderingDirection = OrderingDirection.DSC;
    } else {
      orderingBuffer.orderingDirection = OrderingDirection.UNDEFINED;
    }

    // this.orderings.forEach(iOrdering => {
    //   if (iOrdering.value !== ordering.value) {
    //     iOrdering.orderingDirection = OrderingDirection.UNDEFINED;
    //   }
    // });

    this.onChange({
      name: orderingBuffer.value,
      orderingDirection: orderingBuffer.orderingDirection,
    });
  }

  private reset(): void {
    this.orderings.forEach(o => {
      // eslint-disable-next-line no-param-reassign
      o.orderingDirection = OrderingDirection.UNDEFINED;
    });
  }
}
