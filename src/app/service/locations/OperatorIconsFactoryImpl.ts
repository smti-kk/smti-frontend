import {Operator} from '@api/dto/Operator';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {OperatorIcon} from '../dto/OperatorIcon';
import {OperatorIconsFactory} from './OperatorIconsFactory';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';
import {TvOrRadioIcon} from '@service/dto/TvOrRadioIcon';
import {PostIcon} from '@service/dto/PostIcon';
import {PayphoneIcon} from "@service/dto/PayphoneIcon";

export class OperatorIconsFactoryImpl implements OperatorIconsFactory {
  operatorIcons(operators: Operator[],
                technicalCapabilities: ShortTechnicalCapability[],
                type: TechnicalCapabilityType): OperatorIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        return new OperatorIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete);
      } else {
        return new OperatorIcon(operator.id, false, operator.icon, operator.name, null);
      }
    });
  }

  cellularIcons(operators: Operator[],
                technicalCapabilities: ShortTechnicalCapability[],
                type: TechnicalCapabilityType): CellularIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        const cellularType = tc.typeMobile ? tc.typeMobile.name : 'UNDEFINED';
        return new CellularIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete, cellularType);
      } else {
        return new CellularIcon(operator.id, false, operator.icon, operator.name, null, 'UNDEFINED');
      }
    });
  }

  internetIcons(operators: Operator[],
                technicalCapabilities: ShortTechnicalCapability[],
                type: TechnicalCapabilityType): InternetIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        const internetType = tc.trunkChannel ? tc.trunkChannel.name : 'Неопределено';
        return new InternetIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete, internetType);
      } else {
        return new InternetIcon(operator.id, false, operator.icon, operator.name, null, 'Неопределено');
      }
    });
  }

  tvOrRadioIcons(operators: Operator[],
                 technicalCapabilities: ShortTechnicalCapability[],
                 type: TechnicalCapabilityType): TvOrRadioIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        return new TvOrRadioIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete, tc.tvOrRadioTypes);
      } else {
        return new TvOrRadioIcon(operator.id, false, operator.icon, operator.name, null, null);
      }
    });
  }

  postIcons(operators: Operator[],
            technicalCapabilities: ShortTechnicalCapability[],
            type: TechnicalCapabilityType): PostIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        return new PostIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete, tc.typePost);
      } else {
        return new PostIcon(operator.id, false, operator.icon, operator.name, null, null);
      }
    });
  }

  payphoneIcons(operators: Operator[],
                technicalCapabilities: ShortTechnicalCapability[],
                type: TechnicalCapabilityType): PayphoneIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        return new PayphoneIcon(operator.id, true, operator.icon, operator.name, tc.govYearComplete, tc.payphones);
      } else {
        return new PayphoneIcon(operator.id, false, operator.icon, operator.name, null, null);
      }
    });
  }
}
