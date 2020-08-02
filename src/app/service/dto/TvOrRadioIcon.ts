import {OperatorIcon} from './OperatorIcon';
import {Signal} from '@api/dto/Signal';

export class TvOrRadioIcon extends OperatorIcon {
  readonly type: Signal[];

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              type: Signal[]) {
    super(id, state, iconUrl, name, govYearComplete);
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
