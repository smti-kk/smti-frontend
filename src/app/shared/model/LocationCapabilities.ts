export class LocationCapabilities {
  constructor(private _name: string = '',
              private _area: string = '',
              private _information: LocationCapabilitiesInformation = {
                tv: [],
                radio: [],
                payphone: [],
                internet: [],
                informat: false,
                cellular: [],
                telephone: [],
                mail: [],
                population: 0
              },
              private _organizations: Organization[] = []) {

  }

  get name(): string {
    return this._name;
  }

  get area(): string {
    return this._area;
  }

  get information(): LocationCapabilitiesInformation {
    return this._information;
  }

  get organizations(): Organization[] {
    return this._organizations;
  }

  private static getNotExistedProviders(allProviders: any[], existedProviders: any[], result: any[]) {
    return allProviders
      .filter(provider => !existedProviders.find(ep => ep.name === provider.name))
      .forEach(provider => result.push({
        provider: {
          name: provider.name,
          isActive: false,
          icon: provider.icon
        }
      }));
  }

  static createFromApiModel(apiModel): LocationCapabilities {
    const telephone = apiModel.ats.map(ats => {
      return {
        provider: {
          name: ats.operator.name,
          isActive: true,
          icon: ats.operator.icon
        },
        count: 5
      };
    });

    const cellular = apiModel.cellular.map(cellularItem => {
      return {
        provider: {
          name: cellularItem.operator.name,
          icon: cellularItem.operator.icon,
          isActive: true
        },
        mobileGeneration: cellularItem.type.name,
        quality: ''
      };
    });

    const internet = apiModel.internet.map(internetItem => {
      return {
        provider: {
          isActive: true,
          name: internetItem.operator.name,
          icon: internetItem.operator.icon
        },
        type: 'ВОЛС',
        quality: ''
      };
    });

    const tv = apiModel.television.map(tvItem => {
      return {
        provider: {
          isActive: true,
          name: tvItem.operator.name,
          icon: tvItem.operator.icon
        },
        // type: tv.type.map(type => type.name).join('/')
        type: 'АТВ'
      };
    });

    this.getNotExistedProviders(apiModel.operators.ats, apiModel.ats.map(atsItem => atsItem.operator), telephone);

    this.getNotExistedProviders(apiModel.operators.cellurar, apiModel.cellular.map(cellularItem => cellularItem.operator), cellular);

    this.getNotExistedProviders(apiModel.operators.internet, apiModel.internet.map(internetItem => internetItem.operator), internet);

    this.getNotExistedProviders(apiModel.operators.television, apiModel.television.map(televisionItem => televisionItem.operator), tv);

    return new LocationCapabilities(
      apiModel.location.type_location + ' ' + apiModel.location.name,
      '',
      {
        population: apiModel.location.people_count,
        cellular,
        mail: [
          {
            provider: {
              name: 'УПС',
              isActive: true,
              icon: '',
            }
          }
        ],
        telephone,
        informat: false,
        internet,
        payphone: [
          {
            count: 5,
            provider: {
              icon: '../../../../assets/img/rostelecom.png',
              isActive: true,
              name: 'РосТелеком'
            }
          }
        ],
        radio: [
          {
            type: '',
            provider: {
              icon: '../../../../assets/img/rostelecom.png',
              isActive: true,
              name: 'РосТелеком'
            }
          }
        ],
        tv
      },
      [
        {
          name: 'МБОУ СОШ №30',
          connectionPointAddress: 'с.Богучаны, ул. Лесная, 147',
          customer: 'МЦР',
          contractor: 'МТС',
          connectionTechnology: '3G/4G',
          connectionPoint: '---',
          connectionSpeed: '10 Мбит',
          state: 'Доступно (01.10.2019 16:00:14)',
          traffic: '0.00 Gb (29.09.2019)'
        }
      ]
    );
  }
}

interface Provider {
  name: string;
  icon: string;
  isActive: boolean;
}

interface Mobile {
  provider: Provider;
  mobileGeneration: string;
  quality: string;
}

interface Internet {
  provider: Provider;
  type: string;
  quality: string;
}

interface Tv {
  provider: Provider;
  type: string;
}

interface Radio {
  provider: Provider;
  type: string;
}

interface Payphone {
  count: number;
  provider: Provider;
}

interface Telephone {
  count: number;
  provider: Provider;
}

interface Mail {
  provider: Provider;
}

interface LocationCapabilitiesInformation {
  population: number;
  cellular: Mobile[];
  internet: Internet[];
  tv: Tv[];
  radio: Radio[];
  payphone: Payphone[];
  telephone: Telephone[];
  informat: boolean;
  mail: Mail[];
}

interface Organization {
  name: string;
  connectionPointAddress: string;
  customer: string;
  contractor: string;
  connectionTechnology: string;
  connectionPoint: string;
  connectionSpeed: string;
  state: string;
  traffic: string;
}
