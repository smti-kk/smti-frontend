import { ApiMapper } from './api-mapper';
import { Internet, LocationCapabilities, Mobile, Payphone, Provider, Radio, SignalType, Telephone, Tv } from '@core/models';
import { GovProgramMapper } from '@core/services/gov-program-mapper.service';

export class LocationCapabilitiesMapper
  extends ApiMapper<LocationCapabilities, LocationCapabilities, LocationCapabilities> {

  private getNotExistedProviders(allProviders: Provider[], existedProviders: Provider[], result: any[]) {
    allProviders
      .filter(provider => !existedProviders.find(ep => ep.name === provider.name))
      .forEach(provider => result.push({
        provider: {
          name: provider.name,
          isActive: false,
          icon: provider.icon
        }
      }));

    result = result.sort((a, b) => {
      if (a.provider.name > b.provider.name) {
        return 1;
      } else {
        return -1;
      }
    });
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
          id: cellularItem.operator.id,
          name: cellularItem.operator.name,
          icon: cellularItem.operator.icon,
          isActive: true
        },
        mobileGeneration: cellularItem.type,
        quality: cellularItem.quality
      };
    });

    const internet: Internet[] = tcApi.internet.map(internetItem => {
      return {
        provider: {
          id: internetItem.operator.id,
          isActive: true,
          name: internetItem.operator.name,
          icon: internetItem.operator.icon
        },
        channel: internetItem.type_trunkchannel,
        quality: internetItem.quality
      };
    });

    const tv: Tv[] = tcApi.television.map(tvItem => {
      return {
        provider: {
          id: tvItem.operator.id,
          isActive: true,
          name: tvItem.operator.name,
          icon: tvItem.operator.icon
        },
        type: tvItem.type.map(type => {
          return {
            type: type.id,
            name: type.id === SignalType.ATV ? 'АТВ' : 'ЦТВ',
          };
        })
      };
    });

    const radio: Radio[] = tcApi.radio.map(rad => {
      return {
        provider: {
          isActive: true,
          name: rad.operator.name,
          icon: rad.operator.icon
        },
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
      tcApi.location.id,
      tcApi.location.type_location + ' ' + tcApi.location.name,
      tcApi.location.parent,
      this.getGovPrograms(tcApi),
      {
        population: tcApi.location.people_count,
        cellular,
        mail: tcApi.post,
        telephone,
        informat: tcApi.location.infomat > 0,
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

  private getGovPrograms(tcApi: any): any[] {
    const gp = [];

    this.foo(tcApi.cellular, gp);
    this.foo(tcApi.television, gp);
    this.foo(tcApi.ats, gp);
    this.foo(tcApi.post, gp);
    this.foo(tcApi.internet, gp);
    this.foo(tcApi.radio, gp);

    return gp.map(g => GovProgramMapper.mapApiModel(g.government_program));
  }

  private foo(tc: any[], result: any[]) {
    tc.forEach(tcItem => {
      if (tcItem.government_program && result.indexOf(tcItem.government_program) === -1) {
        result.push(tcItem);
      }
    });
  }
}
