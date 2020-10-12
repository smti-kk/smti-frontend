import {OperatorIcon} from './OperatorIcon';
import {Signal} from '@api/dto/Signal';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class TvOrRadioIcon extends OperatorIcon {
  readonly type: Signal[];

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: Signal[],
              tc: ShortTechnicalCapability) {
    super(id, state, iconUrl, name, govYearComplete, tc);
    this.type = type;
  }

  signalsToString(): string {
    const result = [];
    if (this.hasAnal()) {
      result.push('АТВ');
    }
    if (this.hasDigit()) {
      result.push('ЦТВ');
    }
    return result.join(', ');
  }

  hasAnal(): boolean {
    if (!this.type) {
      return false;
    }
    return !!this.type.find(t => t.name === 'Аналоговое');
  }

  hasDigit(): boolean {
    if (!this.type) {
      return false;
    }
    return !!this.type.find(t => t.name === 'Цифровое');
  }
}
