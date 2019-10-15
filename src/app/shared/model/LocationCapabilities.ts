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
