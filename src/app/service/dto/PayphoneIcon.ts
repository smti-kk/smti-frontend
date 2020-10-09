import {OperatorIcon} from '@service/dto/OperatorIcon';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class PayphoneIcon extends OperatorIcon {
  payphones: number;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              payphones: number,
              tc: ShortTechnicalCapability) {
    super(id, state, iconUrl, name, govYearComplete, tc);
    this.payphones = payphones;
  }
}
