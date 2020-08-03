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
      this.tcs[operatorId] = {
        id: null,
        operatorId,
        trunkChannel: 3,
        typeMobile: 1,
        governmentDevelopmentProgram: null,
        tvOrRadioTypes: null,
        type: this.type,
        locationId,
        quality: 'GOOD',
        govYearComplete: null,
        typePost: 'UPS',
        state: 'WAIT_FOR_STATE_TO_BE_SET'
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
