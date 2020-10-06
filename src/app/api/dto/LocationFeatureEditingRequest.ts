import {FeatureEdit} from './FeatureEdit';
import {AccountFromApi} from './AccountFromApi';
import {LocationDetail, LocationParent} from '@api/dto/LocationDetail';
import {LocationFeature} from '@core/models';

export type EditingRequestStatus = 'ACCEPTED' | 'DECLINED' | 'WAIT_FOR_STATE_TO_BE_SET';

interface FeatureLocation {
  id: number;
  type: string;
  name: string;
  locationParent: LocationParent;
}

export interface LocationFeatureEditingRequest {
  id: number;
  locationId: number;
  comment: string;
  created: string;
  declineComment: string;
  user: AccountFromApi;
  featureEdits: FeatureEdit[];
  status: EditingRequestStatus;
  location: FeatureLocation;
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
