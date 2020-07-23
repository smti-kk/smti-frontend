import {OrganizationForTable} from '@api/dto/OrganizationForTable';
import {LocationParent} from '@api/dto/LocationDetail';

export interface Tc {
  id: number;
  typeId: number;
  govProgramId: number;
  locationId: number;
}

export class TcEdition {
  private readonly defaultTypeValue: number;
  tcs: {[operator: number]: Tc} = {};

  constructor(items: { tc: Tc; operator: number }[], defaultTypeValue: number) {
    items.forEach(i => {
      this.tcs[i.operator] = i.tc;
    });
    this.defaultTypeValue = defaultTypeValue;
  }

  add(operatorId: number): void {
    this.tcs[operatorId] = {
      id: null,
      typeId: this.defaultTypeValue,
      govProgramId: null,
      locationId: null,
    };
  }

  remove(operatorId: number): void {
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
