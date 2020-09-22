import {FeatureEdit} from './FeatureEdit';
import {AccountFromApi} from './AccountFromApi';
import {LocationDetail} from '@api/dto/LocationDetail';

export type EditingRequestStatus = 'ACCEPTED' | 'DECLINED' | 'WAIT_FOR_STATE_TO_BE_SET';

export interface LocationFeatureEditingRequest {
  id: number;
  locationId: number;
  comment: string;
  created: string;
  declineComment: string;
  user: AccountFromApi;
  featureEdits: FeatureEdit[];
  status: EditingRequestStatus;
}

export interface LocationFeatureEditingRequestFull {
  id: number;
  location: LocationDetail;
  comment: string;
  declineComment: string;
  created: string;
  user: AccountFromApi;
  featureEdits: FeatureEdit[];
  status: EditingRequestStatus;
}
