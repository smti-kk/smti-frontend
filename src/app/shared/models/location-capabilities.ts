import { GovProgram } from '@shared/services/gov-program.service';

export enum TrunkChannelType {
  UNDEFINED,
  VOLS = 3,
  SATELLITE = 4,
  COPPER_CABLE = 5,
  RADIO_CHANEl = 6
}

export interface TrunkChannel {
  id: TrunkChannelType;
  name: string;
}

export class LocationCapabilities {
  constructor(
    private _id: number,
    private _name: string = '',
    private _area: string = '',
    private _govPrograms: GovProgram[],
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
    }) {

  }

  get govPrograms(): GovProgram[] {
    return this._govPrograms;
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

  get id(): number {
    return this._id;
  }
}

export interface Provider {
  id: number;
  name: string;
  icon: string;
  isActive: boolean;
}

export interface Mobile {
  provider: Provider;
  mobileGeneration: string;
  quality: string;
}

export interface Internet {
  provider: Provider;
  channel: TrunkChannel;
  quality: string;
}

export interface Tv {
  provider: Provider;
  type: string;
}

export interface Radio {
  provider: Provider;
  type: string;
}

export interface Payphone {
  count: number;
  provider: Provider;
}

export interface Telephone {
  provider: Provider;
  countPayphone: number;
}

export interface Mail {
  provider: Provider;
}

export interface LocationCapabilitiesInformation {
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
