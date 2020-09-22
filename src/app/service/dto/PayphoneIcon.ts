import {OperatorIcon} from '@service/dto/OperatorIcon';
import {InternetType} from '@api/dto/InternetType';

export class PayphoneIcon extends OperatorIcon {
  payphones: number;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              payphones: number) {
    super(id, state, iconUrl, name, govYearComplete);
    this.payphones = payphones;
  }
}
