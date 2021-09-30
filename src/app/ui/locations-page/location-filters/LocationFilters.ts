import {LogicalCondition} from '@service/dto/LogicalCondition';
import {OrderingFilter} from '../../buttons/filter-btn/filter-btn.component';

export interface LocationFilter {
  label: string;
  id: number;
  isSelected: boolean;
  name?: string;
}

export interface LocationFilters {
  signalLevel: LocationFilter[];
  connectionType: LocationFilter[];
  tvType: LocationFilter[];
  postType: LocationFilter[];
  internetOperators: LocationFilter[];
  cellularOperators: LocationFilter[];
  location: string[] | string;
  parent: number[];
  govProgram: number;
  hasESPD: boolean;
  hasSMO: boolean;
  hasZSPD: boolean;
  hasRSZO: boolean;
  logicalCondition: LogicalCondition;
  hasATS: boolean;
  hasPayphone: boolean;
  hasInfomat: boolean;
  hasRadio: boolean;
  hasCellular: boolean;
  hasInternet: boolean;
  populationLeftBorder: number;
  populationRightBorder: number;
  govYear: number;
  ordering: OrderingFilter;
}
