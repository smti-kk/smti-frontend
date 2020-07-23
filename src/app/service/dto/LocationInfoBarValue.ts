import {OperatorIcon} from '@service/dto/OperatorIcon';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';

export interface LocationInfoBarValue {
  population: number;
  locationName: string;
  telephone: OperatorIcon[];
  internet: InternetIcon[];
  cellular: CellularIcon[];
  radio: OperatorIcon[];
  tv: OperatorIcon[];
  payphone: OperatorIcon[];
  mail: OperatorIcon[];
  infomat: OperatorIcon[];
}
