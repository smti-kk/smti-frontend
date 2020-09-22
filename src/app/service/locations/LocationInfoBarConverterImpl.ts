import {LocationShort} from '@api/dto/LocationShort';
import {Operators} from '@api/dto/Operators';
import {LocationInfoBarValue} from '../dto/LocationInfoBarValue';
import {LocationInfoBarConverter} from './LocationInfoBarConverter';
import {OperatorIconsFactory} from '@service/locations/OperatorIconsFactory';

export class LocationInfoBarConverterImpl implements LocationInfoBarConverter {
  private readonly operatorIconsFactory: OperatorIconsFactory;

  constructor(operatorIconsFactory: OperatorIconsFactory) {
    this.operatorIconsFactory = operatorIconsFactory;
  }

  convert(location: LocationShort, operators: Operators): LocationInfoBarValue {
    return {
      locationName: location.type + ' ' + location.name,
      population: location.population,
      mail: this.operatorIconsFactory.postIcons(operators.post, location.technicalCapability, 'POST'),
      payphone: this.operatorIconsFactory.operatorIcons(operators.ats, location.technicalCapability, 'ATS'),
      tv: this.operatorIconsFactory.tvOrRadioIcons(operators.television, location.technicalCapability, 'TV'),
      internet: this.operatorIconsFactory.internetIcons(operators.internet, location.technicalCapability, 'INET'),
      cellular: this.operatorIconsFactory.cellularIcons(operators.mobile, location.technicalCapability, 'MOBILE'),
      telephone: this.operatorIconsFactory.operatorIcons(operators.ats, location.technicalCapability, 'ATS'),
      radio: this.operatorIconsFactory.tvOrRadioIcons(operators.radio, location.technicalCapability, 'RADIO'),
      infomat: [],
      id: location.id
    };
  }
}
