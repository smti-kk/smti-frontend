import {LocationDetail} from '@api/dto/LocationDetail';
import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationTableItemConverter} from './LocationTableItemConverter';
import {OperatorIconsFactory} from './OperatorIconsFactory';
import {Operators} from '@api/dto/Operators';
import {GovProgram} from '@api/dto/GovProgram';

export class LocationTableItemConverterImpl implements LocationTableItemConverter {
  private readonly operatorIconsFactory: OperatorIconsFactory;

  constructor(operatorIconsFactory: OperatorIconsFactory) {
    this.operatorIconsFactory = operatorIconsFactory;
  }

  convert(location: LocationDetail, operators: Operators): LocationTableItem {
    return {
      id: location.id,
      name: location.type + ' ' + location.name,
      area: location.locationParent ? {
        id: location.locationParent.id,
        name: location.locationParent.type + ' ' + location.locationParent.name
      } : null,
      population: location.population.toString(),
      ats: this.operatorIconsFactory.operatorIcons(operators.ats, location.technicalCapabilities, 'ATS'),
      cellular: this.operatorIconsFactory.cellularIcons(operators.mobile, location.technicalCapabilities, 'MOBILE'),
      infomat: [],
      internet: this.operatorIconsFactory.internetIcons(operators.internet, location.technicalCapabilities, 'INET'),
      payphone: this.operatorIconsFactory.operatorIcons(operators.ats, location.technicalCapabilities, 'ATS'),
      post: [],
      radio: this.operatorIconsFactory.operatorIcons(operators.radio, location.technicalCapabilities, 'RADIO'),
      television: this.operatorIconsFactory.operatorIcons(operators.television, location.technicalCapabilities, 'TV'),
      contract: this.contracts(location),
      hasZSPD: false,
      hasRSZO: false,
      hasSMO: this.hasSMO(location),
      hasESPD: this.hasEspd(location)
    };
  }

  hasEspd(location: LocationDetail): boolean {
    let result = false;
    location.organizations.forEach(o => {
      o.accessPoints.forEach(ap => {
        if (ap.type === 'ESPD') {
          result = true;
          return;
        }
      });
    });
    return result;
  }

  hasSMO(location: LocationDetail): boolean {
    let result = false;
    location.organizations.forEach(o => {
      o.accessPoints.forEach(ap => {
        if (ap.type === 'SMO') {
          result = true;
          return;
        }
      });
    });
    return result;
  }

  contracts(location: LocationDetail): GovProgram[] {
    const result = [];
    location.organizations.forEach(o => {
      o.accessPoints.forEach(ap => {
        if (ap.governmentDevelopmentProgram) {
          result.push(ap.governmentDevelopmentProgram);
        }
      });
    });
    location.technicalCapabilities.forEach(tc => {
      if (tc.governmentDevelopmentProgram) {
        result.push(tc.governmentDevelopmentProgram);
      }
    });
    return result;
  }
}
