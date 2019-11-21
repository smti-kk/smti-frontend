import { ApiMapper } from './api-mapper';
import { Internet, LocationCapabilities, Mobile, Payphone, Provider, Radio, Telephone, Tv } from '../models/location-capabilities';


export class LocationCapabilitiesMapper
  extends ApiMapper<LocationCapabilities, LocationCapabilities, LocationCapabilities> {

  private getNotExistedProviders(allProviders: Provider[], existedProviders: Provider[], result: any[]) {
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

  public mapFromApi(tcApi): LocationCapabilities {
    const telephone: Telephone[] = tcApi.ats.map(ats => {
      return {
        provider: {
          name: ats.operator.name,
          isActive: true,
          icon: ats.operator.icon
        },
        countPayphone: ats.quantity_payphone
      };
    });

    const cellular: Mobile[] = tcApi.cellular.map(cellularItem => {
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

    const internet: Internet[] = tcApi.internet.map(internetItem => {
      return {
        provider: {
          isActive: true,
          name: internetItem.operator.name,
          icon: internetItem.operator.icon
        },
        channel: internetItem.type_trunkchannel,
        quality: ''
      };
    });

    const tv: Tv[] = tcApi.television.map(tvItem => {
      return {
        provider: {
          isActive: true,
          name: tvItem.operator.name,
          icon: tvItem.operator.icon
        },
        // tslint:disable-next-line:no-magic-numbers
        type: '/' + tvItem.type.map(type => type.id === 1 ? 'АТВ ' : type.id === 2 ? 'ЦТВ ' : '').join(' ')
      };
    });

    const radio: Radio[] = tcApi.radio.map(rad => {
      return {
        provider: {
          isActive: true,
          name: rad.operator.name,
          icon: rad.operator.icon
        },
        // tslint:disable-next-line:no-magic-numbers
        type: rad.type === 1 ? 'АТВ ' : rad.type === 2 ? 'ЦТВ ' : ''
      };
    });

    this.getNotExistedProviders(tcApi.operators.ats, tcApi.ats.map(atsItem => atsItem.operator), telephone);

    this.getNotExistedProviders(tcApi.operators.cellurar, tcApi.cellular.map(cellularItem => cellularItem.operator), cellular);

    this.getNotExistedProviders(tcApi.operators.internet, tcApi.internet.map(internetItem => internetItem.operator), internet);

    this.getNotExistedProviders(tcApi.operators.television, tcApi.television.map(televisionItem => televisionItem.operator), tv);

    this.getNotExistedProviders(tcApi.operators.radio, tcApi.radio.map(radioItem => radioItem.operator), radio);

    const payphone: Payphone[] = telephone.map(tel => {
      return {
        provider: tel.provider,
        count: tel.countPayphone
      };
    });

    return new LocationCapabilities(
      tcApi.location.type_location + ' ' + tcApi.location.name,
      '',
      {
        population: tcApi.location.people_count,
        cellular,
        mail: [], // Негде брать
        telephone,
        informat: false,
        internet,
        payphone,
        radio,
        tv
      }
    );
  }

  public mapDetailApi(apiData): LocationCapabilities {
    return this.mapFromApi(apiData);
  }

  public mapShortApi(apiData): LocationCapabilities {
    return this.mapFromApi(apiData);
  }
}
