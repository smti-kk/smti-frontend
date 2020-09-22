import {OperatorIcon} from '@service/dto/OperatorIcon';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';
import {PostIcon} from '@service/dto/PostIcon';
import {TvOrRadioIcon} from '@service/dto/TvOrRadioIcon';

export interface LocationInfoBarValue {
  population: number;
  locationName: string;
  telephone: OperatorIcon[];
  internet: InternetIcon[];
  cellular: CellularIcon[];
  radio: TvOrRadioIcon[];
  tv: TvOrRadioIcon[];
  payphone: OperatorIcon[];
  mail: PostIcon[];
  infomat: OperatorIcon[];
  id: number;
}
