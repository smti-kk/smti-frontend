import {OrganizationForTable} from '@api/dto/OrganizationForTable';
import {LocationParent} from '@api/dto/LocationDetail';
import {WriteableTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';

export class TcEdition {
  tcs: { [operator: number]: WriteableTechnicalCapability } = {};
  cachedTcsIds: { [operator: number]: WriteableTechnicalCapability } = {};
  type: TechnicalCapabilityType;

  constructor(items: { tc: WriteableTechnicalCapability; operator: number }[], type: TechnicalCapabilityType) {
    items.forEach(i => {
      this.tcs[i.operator] = i.tc;
    });
    this.type = type;
  }

  add(operatorId: number, locationId: number): void {
    if (this.cachedTcsIds[operatorId]) {
      this.tcs[operatorId] = this.cachedTcsIds[operatorId];
    } else {
      let trunkChannel;
      let typeMobile;
      let typePost;
      switch (this.type) {
        case 'INET':
          trunkChannel = 3;
          break;
        case 'MOBILE':
          typeMobile = 1;
          break;
        case 'POST':
          typePost = 'UPS';
          break;
      }
      const payphones = this.type === 'PAYPHONE' ? 0 : null;
      this.tcs[operatorId] = {
        id: null,
        operatorId,
        trunkChannel,
        typeMobile,
        governmentDevelopmentProgram: null,
        tvOrRadioTypes: null,
        type: this.type,
        locationId,
        quality: 'GOOD',
        govYearComplete: null,
        typePost,
        state: 'WAIT_FOR_STATE_TO_BE_SET',
        payphones
      };
    }
  }

  remove(operatorId: number): void {
    this.cachedTcsIds[operatorId] = this.tcs[operatorId];
    delete this.tcs[operatorId];
  }
}

export class TechnicalCapabilityEdition {
  constructor(
    public id: number,
    public type: string,
    public name: string,
    public population: number,
    public locationParent: LocationParent,
    public organizations: OrganizationForTable[],
    public cellular: TcEdition,
    public internet: TcEdition,
    public tv: TcEdition,
    public telephone: TcEdition,
    public post: TcEdition,
    public payphone: TcEdition,
    public radio: TcEdition,
    public infomat: TcEdition,
  ) {
  }
}
