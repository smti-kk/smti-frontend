import {API_STATIC} from '../../../environments/api.routes';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class OperatorIcon {
  isActive: boolean;
  isNormal: boolean;
  iconUrl: string;
  name: string;
  id: number;
  govYearComplete: number;
  tc: ShortTechnicalCapability;

  constructor(id: number, state: boolean, iconUrl: string, name: string, govYearComplete: number, tc: ShortTechnicalCapability) {
    this.isActive = state;
    this.iconUrl = API_STATIC + '/' + iconUrl;
    this.name = name;
    this.id = id;
    this.govYearComplete = govYearComplete;
    this.tc = tc;
  }
}
