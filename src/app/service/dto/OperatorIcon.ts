import {API_STATIC} from '../../../environments/api.routes';

export class OperatorIcon {
  isActive: boolean;
  iconUrl: string;
  name: string;
  id: number;

  constructor(id: number, state: boolean, iconUrl: string, name: string) {
    this.isActive = state;
    this.iconUrl = API_STATIC + '/' + iconUrl;
    this.name = name;
    this.id = id;
  }
}
