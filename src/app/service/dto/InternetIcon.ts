import {OperatorIcon} from '@service/dto/OperatorIcon';
import {InternetType} from '@api/dto/InternetType';

export class InternetIcon extends OperatorIcon {
  type: InternetType;
  typeIcon: string;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: InternetType) {
    super(id, state, iconUrl, name, govYearComplete);
    this.type = type;
    this.typeIcon = '/assets/' + type + '.svg';
  }
}
