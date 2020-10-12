import {OperatorIcon} from '@service/dto/OperatorIcon';
import {InternetType} from '@api/dto/InternetType';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class InternetIcon extends OperatorIcon {
  type: InternetType;
  typeIcon: string;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: InternetType,
              tc: ShortTechnicalCapability) {
    super(id, state, iconUrl, name, govYearComplete, tc);
    this.type = type;
    this.typeIcon = '/assets/' + type + '.svg';
  }
}
