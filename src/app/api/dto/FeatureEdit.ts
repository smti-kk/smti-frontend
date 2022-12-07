import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {FCAccessPoint} from '@api/dto/ShortAccessPoint';

export type FeatureEditAction = 'UPDATE' | 'CREATE' | 'DELETE';

export interface FeatureEdit {
  id: number;
  action: FeatureEditAction;
  tc: FCTechnicalCapability;
  newValue: FCTechnicalCapability;
  ap: FCAccessPoint;
  newValueAp: FCAccessPoint;
}
