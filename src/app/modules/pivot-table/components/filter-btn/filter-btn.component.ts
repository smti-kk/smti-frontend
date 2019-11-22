import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FilterType } from '../../service/tc-pivots.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface OrderingFilter {
  orderingDirection: FilterType;
  name: string;
}

export const FILTER_BUTTONS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterBtnComponent),
  multi: true,
};

@Component({
  selector: 'app-filter-btn',
  templateUrl: './filter-btn.component.html',
  providers: [FILTER_BUTTONS_VALUE_ACCESSOR]
})
export class FilterBtnComponent implements OnInit, ControlValueAccessor {

  @Input() orderings: { name: string, value: string, orderingDirection: FilterType }[];
  onChange: (_: any) => {};
  onTouched: () => {};
  FilterType = FilterType;

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

  ngOnInit() {
  }

  onOrderingBtnClick(ordering: { name: string; value: string; orderingDirection: FilterType }) {
    if (ordering.orderingDirection === FilterType.UNDEFINED) {
      ordering.orderingDirection = FilterType.ASC;
    } else if (ordering.orderingDirection === FilterType.ASC) {
      ordering.orderingDirection = FilterType.DSC;
    } else {
      ordering.orderingDirection = FilterType.UNDEFINED;
    }

    this.orderings.forEach(iOrdering => {
      if (iOrdering !== ordering) {
        iOrdering.orderingDirection = FilterType.UNDEFINED;
      }
    });

    this.onChange({name: ordering.value, orderingDirection: ordering.orderingDirection});
  }

  private reset() {
    this.orderings.forEach(o => {
      o.orderingDirection = FilterType.UNDEFINED;
    });
    if (this.onChange) {
      this.onChange(null);
    }
  }
}
