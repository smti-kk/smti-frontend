import AccessPoint from './access-point';
import Coordinate from '../interface/coordinate';
import LocationArea from './location-area';
import LocationSummaryCapability from './location-summary-capability';

export interface InfoRow {
  type: string;
  icon: string;
  name: string;
}

export interface Operator {
  icon: string;
  name: string;
  id: number;
}

export interface MobileType {
  icon: string;
  name: string;
  id: number;
}

export interface Tv {
  title: string;
  icon: string;
  type: string;
}

export default class AdministrativeCenterPoint extends AccessPoint {
  constructor(_pk: number,
              _coordinate: Coordinate,
              private _center: string,
              private _area: string,
              private _population: number,
              private _mobileConnection: InfoRow[],
              private _mobileLevel: string,
              private _internet: { name: string, icon: string }[],
              private _tv: Tv[],
              private _radio: InfoRow[]) {

    super(_pk, _coordinate, _center);
  }

  get area(): string {
    return this._area;
  }

  get center(): string {
    return this._center;
  }

  get population(): number {
    return this._population;
  }

  get mobileConnection(): InfoRow[] {
    return this._mobileConnection;
  }

  get mobileLevel(): string {
    return this._mobileLevel;
  }

  get internet(): { name: string; icon: string }[] {
    return this._internet;
  }

  get tv(): Tv[] {
    return this._tv;
  }

  get radio(): InfoRow[] {
    return this._radio;
  }

  static create(locationArea: LocationArea[],
                locationCapability: LocationSummaryCapability,
                mobileType: MobileType[],
                operators: Operator[]): AdministrativeCenterPoint {
    if (!locationCapability.administrativeCenter) {
      return;
    }
    const maxType = [];
    const mobileConnection: InfoRow[] = locationCapability.mobile ? locationCapability.mobile.data.map(lc => {
      maxType.push(lc.mobile_type);
      return {
        type: mobileType[mobileType.findIndex(x => x.id === lc.mobile_type)].name,
        icon: operators[operators.findIndex(x => x.id === lc.operator)].icon,
        name: operators[operators.findIndex(x => x.id === lc.operator)].name
      };
    }) : [];

    const value = Math.max.apply(Math, maxType);
    const mediumValueType = mobileType[mobileType.findIndex(x => x.id === value)]
      ? mobileType[mobileType.findIndex(x => x.id === value)].name
      : ' ';

    const internet = locationCapability.internet ? locationCapability.internet.data.map(element => {
      return {
        icon: operators[operators.findIndex(x => x.id === element.operator)].icon,
        name: operators[operators.findIndex(x => x.id === element.operator)].name
      };
    }) : [];

    const tv = locationCapability.tv ? locationCapability.tv.data.map(element => {
      let tvType = '/';
      element.signal_type.forEach(type => {
        tvType += type === '1' ? 'АТВ ' : type === '2' ? 'ЦТВ ' : '';
      });

      return {
        icon: operators[operators.findIndex(x => x.id === element.operator)].icon,
        title: operators[operators.findIndex(x => x.id === element.operator)].name,
        type: tvType
      };
    }) : [];

    const radio = locationCapability.radio ? locationCapability.radio.data.map(element => {
      let radioType = '/';
      radioType += element.signal_type === '1' ? 'АТВ ' : element.signal_type === '2' ? 'ЦТВ ' : '';

      return {
        name: operators[operators.findIndex(x => x.id === element.operator)].name,
        icon: operators[operators.findIndex(x => x.id === element.operator)].icon,
        type: radioType
      };
    }) : [];


    return new AdministrativeCenterPoint(
      locationCapability.id,
      {
        lng: locationCapability.administrativeCenter.coordinates[0],
        lat: locationCapability.administrativeCenter.coordinates[1],
      },
      locationCapability.locality,
      locationArea[locationArea.findIndex(x => x.id === locationCapability.area)].properties.name,
      locationCapability.peopleCount,
      mobileConnection,
      mediumValueType,
      internet,
      tv,
      radio
    );
  }
}
