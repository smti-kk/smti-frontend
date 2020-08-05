import {FeatureEdit} from './FeatureEdit';
import {AccountFromApi} from './AccountFromApi';

export type EditingRequestStatus = 'ACCEPTED' | 'DECLINED' | 'WAIT_FOR_STATE_TO_BE_SET';

export interface LocationFeatureEditingRequest {
  id: number;
  locationId: number;
  comment: string;
  created: string;
  user: AccountFromApi;
  featureEdits: FeatureEdit[];
  status: EditingRequestStatus;
}
