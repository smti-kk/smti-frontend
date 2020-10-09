import {OperatorIcon} from '@service/dto/OperatorIcon';
import {CellularType} from '@api/dto/CellularType';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class CellularIcon extends OperatorIcon {
  type: CellularType;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: CellularType,
              tc: ShortTechnicalCapability) {
    super(id, state, iconUrl, name, govYearComplete, tc);
    this.type = type;
  }
}
