import {OrderingDirection, OrderingFilter} from '../../ui/buttons/filter-btn/filter-btn.component';
import {LocationOrdering} from '../../api/features-comparing/LocationFCApiImpl';

export class OrderingToApi {
  constructor(private readonly filter: OrderingFilter) {
  }

  toString(): LocationOrdering {
    if (this.filter === null) {
      return null;
    }
    switch (this.filter.name) {
      case 'name':
        if (this.filter.orderingDirection === OrderingDirection.ASC) {
          return 'name,asc';
        } else if (this.filter.orderingDirection === OrderingDirection.DSC) {
          return 'name,desc';
        }
        return null;
      case 'parent':
        if (this.filter.orderingDirection === OrderingDirection.ASC) {
          return 'locationParent.name,asc';
        } else if (this.filter.orderingDirection === OrderingDirection.DSC) {
          return 'locationParent.name,desc';
        }
        return null;
      case 'people_count':
        if (this.filter.orderingDirection === OrderingDirection.ASC) {
          return 'population,asc';
        } else if (this.filter.orderingDirection === OrderingDirection.DSC) {
          return 'population,desc';
        }
        return null;
    }
  }
}
