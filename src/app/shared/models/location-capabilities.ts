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
              // tslint:disable-next-line:no-any
              private _espd: any[] = [],
              // tslint:disable-next-line:no-any
              private _smo: any[]) {

  }


  // tslint:disable-next-line:no-any
  get espd(): any[] {
    return this._espd;
  }

  // tslint:disable-next-line:no-any
  get smo(): any[] {
    return this._smo;
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

  // tslint:disable-next-line:no-any
  private static getNotExistedProviders(allProviders: Provider[], existedProviders: Provider[], result: any[]) {
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

  static createFromApiModel(tcApi, pseudoApi): LocationCapabilities {
    const telephone = tcApi.ats.map(ats => {
      return {
        provider: {
          name: ats.operator.name,
          isActive: true,
          icon: ats.operator.icon
        },
        count: 5
      };
    });

    const cellular = tcApi.cellular.map(cellularItem => {
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

    const internet = tcApi.internet.map(internetItem => {
      return {
        provider: {
          isActive: true,
          name: internetItem.operator.name,
          icon: internetItem.operator.icon
        },
        type: internetItem.type_trunkchannel.name === 'медный кабель' ? 'медь' : internetItem.type_trunkchannel.name,
        quality: ''
      };
    });

    const tv = tcApi.television.map(tvItem => {
      return {
        provider: {
          isActive: true,
          name: tvItem.operator.name,
          icon: tvItem.operator.icon
        },
        type: '/' + tvItem.type.map(type => type.id === 1 ? 'АТВ ' : type.id === 2 ? 'ЦТВ ' : '').join(' ')
      };
    });

    this.getNotExistedProviders(tcApi.operators.ats, tcApi.ats.map(atsItem => atsItem.operator), telephone);

    this.getNotExistedProviders(tcApi.operators.cellurar, tcApi.cellular.map(cellularItem => cellularItem.operator), cellular);

    this.getNotExistedProviders(tcApi.operators.internet, tcApi.internet.map(internetItem => internetItem.operator), internet);

    this.getNotExistedProviders(tcApi.operators.television, tcApi.television.map(televisionItem => televisionItem.operator), tv);

    return new LocationCapabilities(
      tcApi.location.type_location + ' ' + tcApi.location.name,
      '',
      {
        population: tcApi.location.people_count,
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
      pseudoApi.accesspointespd,
      pseudoApi.accesspointsmo
    );
  }
}

/*
"radio": [
        {
            "id": 8572,
            "operator": {
                "id": 7,
                "name": "РТРС",
                "icon": "/media/rtrs.png"
            },
            "state": null,
            "completed": null,
            "quality": "normal",
            "technical_status": "confirmed",
            "requests": null,
            "functional_customer": null,
            "commissioning": null,
            "dismiss_date": null,
            "type": 2,
            "government_program": null,
            "location": 2100,
            "clarify_petition": null,
            "previous": null,
            "contract": null
        }
 */

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

export interface Telephone {
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
