import {OperatorIcon} from './OperatorIcon';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';
import {GovProgram} from '@api/dto/GovProgram';
import {TvOrRadioIcon} from '@service/dto/TvOrRadioIcon';
import {PostIcon} from '@service/dto/PostIcon';

interface LocationArea {
  id: number;
  name: string;
}

export interface LocationTableItem {
  id: number;
  population: string;
  area: LocationArea;
  name: string;
  ats: OperatorIcon[];
  payphone: OperatorIcon[];
  infomat: OperatorIcon[];
  post: PostIcon[];
  television: TvOrRadioIcon[];
  radio: TvOrRadioIcon[];
  cellular: CellularIcon[];
  internet: InternetIcon[];
  contract: GovProgram[];
  hasESPD: boolean;
  hasSMO: boolean;
  hasRSZO: boolean;
  hasZSPD: boolean;
}
