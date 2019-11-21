import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterType } from '../../service/tc-pivots.service';

export interface OrderingFilter {
  orderingDirection: FilterType;
  name: string;
}

@Component({
  selector: 'app-filter-btn',
  templateUrl: './filter-btn.component.html'
})
export class FilterBtnComponent implements OnInit {

  @Input() orderings: { name: string, value: string, orderingDirection: FilterType }[];
  @Output() orderingFilter: EventEmitter<OrderingFilter> = new EventEmitter<OrderingFilter>();

  FilterType = FilterType;

  constructor() {

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

    this.orderingFilter.emit({name: ordering.value, orderingDirection: ordering.orderingDirection});
  }
}
