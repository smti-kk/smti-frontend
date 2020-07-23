import {LogicalCondition} from '@service/dto/LogicalCondition';

export interface LocationFilter {
  label: string;
  id: number;
  isSelected: boolean;
}

export interface LocationFilters {
  signalLevel: LocationFilter[];
  connectionType: LocationFilter[];
  tvType: LocationFilter[];
  postType: LocationFilter[];
  internetOperators: LocationFilter[];
  cellularOperators: LocationFilter[];
  location: string;
  parent: number[];
  govProgram: number[];
  hasESPD: boolean;
  hasSMO: boolean;
  hasZSPD: boolean;
  hasRSZO: boolean;
  logicalCondition: LogicalCondition;
}
