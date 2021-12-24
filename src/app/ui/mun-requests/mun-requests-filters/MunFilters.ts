import {EditingRequestStatus} from '../../../api/dto/LocationFeatureEditingRequest';

export interface MunFilters {
  status: EditingRequestStatus[];
  locationName: number[];
  parents: number[];
  logicalCondition?: string;
}
