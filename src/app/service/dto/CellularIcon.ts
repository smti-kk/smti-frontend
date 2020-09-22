import {OperatorIcon} from '@service/dto/OperatorIcon';
import {CellularType} from '@api/dto/CellularType';

export class CellularIcon extends OperatorIcon {
  type: CellularType;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: CellularType) {
    super(id, state, iconUrl, name, govYearComplete);
    this.type = type;
  }
}
