import { GovProgram } from '@shared/services/gov-program.service';
import { MailType, MobileGenerationType, SignalType } from '@shared/models/enums';

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

export enum Quality {
  GOOD = 'good',
  NORMAL = 'normal',
  ABSENT = 'absent'
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

export interface MobileGeneration {
  id: MobileGenerationType;
  name: string;
}

export interface Mobile {
  provider: Provider;
  mobileGeneration: MobileGeneration;
  quality: Quality;
}

export interface Internet {
  provider: Provider;
  channel: TrunkChannel;
  quality: Quality;
}

export interface Tv {
  provider: Provider;
  type: {
    type: SignalType,
    name: string;
  }[];
}

export interface Radio {
  provider: Provider;
  type: SignalType[];
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
  type: MailType;
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
