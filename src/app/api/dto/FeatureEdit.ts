import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export type FeatureEditAction = 'UPDATE' | 'CREATE' | 'DELETE';

export interface FeatureEdit {
  id: number;
  action: FeatureEditAction;
  tc: FCTechnicalCapability;
  newValue: FCTechnicalCapability;
}
