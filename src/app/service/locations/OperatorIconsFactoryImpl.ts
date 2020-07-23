import {Operator} from '@api/dto/Operator';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {OperatorIcon} from '../dto/OperatorIcon';
import {OperatorIconsFactory} from './OperatorIconsFactory';
import {CellularIcon} from '@service/dto/CellularIcon';
import {InternetIcon} from '@service/dto/InternetIcon';

export class OperatorIconsFactoryImpl implements OperatorIconsFactory {
  operatorIcons(operators: Operator[],
                technicalCapabilities: ShortTechnicalCapability[],
                type: TechnicalCapabilityType): OperatorIcon[] {
    return operators.map(operator => {
      const tc = technicalCapabilities.find(tcItem => {
        return tcItem.operatorId === operator.id && tcItem.type === type;
      });
      if (tc) {
        return new OperatorIcon(operator.id, true, operator.icon, operator.name);
      } else {
        return new OperatorIcon(operator.id, false, operator.icon, operator.name);
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
        return new CellularIcon(operator.id, true, operator.icon, operator.name, cellularType);
      } else {
        return new CellularIcon(operator.id, false, operator.icon, operator.name, 'UNDEFINED');
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
        return new InternetIcon(operator.id, true, operator.icon, operator.name, internetType);
      } else {
        return new InternetIcon(operator.id, false, operator.icon, operator.name, 'Неопределено');
      }
    });
  }
}
