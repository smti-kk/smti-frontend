import {OperatorIcon} from './OperatorIcon';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';
import {GovProgram} from '@api/dto/GovProgram';
import {TvOrRadioIcon} from '@service/dto/TvOrRadioIcon';
import {PostIcon} from '@service/dto/PostIcon';
import {PayphoneIcon} from "@service/dto/PayphoneIcon";

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
  payphone: PayphoneIcon[];
  infomat: OperatorIcon[];
  post: PostIcon[];
  television: TvOrRadioIcon[];
  radio: TvOrRadioIcon[];
  cellular: CellularIcon[];
  internet: InternetIcon[];
  contract: GovProgram[];
  hasESPD: boolean;
  hasSMO: boolean;
  hasZSPD: boolean;
}
