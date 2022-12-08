import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';

import {OrganizationType} from '@core/models/organization-type';
import {SmoType} from '@core/models/smo-type';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {Contract} from '@core/models/contract';
import {ID_SERIALIZER} from '@core/utils/serializers';
import {Location} from '@core/models/location';


const LOCATION_DESERIALIZER = {
  Deserialize(json): number {
    return json.location;
  },
};

export class Organization {
  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('fias')
  private readonly _fias: string;

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('acronym')
  private readonly _acronym: string;

  @autoserializeAs('inn')
  private readonly _inn: number;

  @autoserializeAs('kpp')
  private readonly _kpp: number;

  @autoserializeAs(Organization, 'parent')
  private readonly _parent: Organization;

  // @autoserializeAs(Reaccesspoint, 'aps')
  // private readonly _reaccesspoints: Reaccesspoint[];

  @deserializeAs(OrganizationType, 'type')
  @serializeAs(ID_SERIALIZER, 'type')
  private readonly _type: OrganizationType;

  @deserializeAs(SmoType, 'smo')
  @serializeAs(ID_SERIALIZER, 'smo')
  private readonly _smoType: SmoType;

  // @autoserializeAs(Contract, 'contract_set')
  // private readonly _contracts: Contract[];

  @deserializeAs(Location, 'location')
  @autoserializeAs(ID_SERIALIZER, 'location')
  private readonly _location: Location;


  @deserializeAs(LOCATION_DESERIALIZER, 'organization')
  private readonly _locationId: number;

  @autoserializeAs('funCustomer')
  private readonly _fun_customer: number;

  // @autoserializeAs('ogrn')
  // private readonly ogrn: string;

  // @autoserializeAs('oktmo')
  // private readonly oktmo: string;

  constructor(locationId: number) {
    // this._location = locationId;
  }

  // get contracts(): Contract[] {
  //   return this._contracts;
  // }

  get location(): Location {
    return this._location;
  }

  get address(): string {
    return this._address;
  }

  get fias(): string {
    return this._fias;
  }

  get name(): string {
    return this._name;
  }

  get acronym(): string {
    return this._acronym;
  }

  get id(): number {
    return this._id;
  }

  get inn(): number {
    return this._inn;
  }

  get kpp(): number {
    return this._kpp;
  }

  get parent(): Organization {
    return this._parent;
  }

  // get reaccesspoints(): Reaccesspoint[] {
  //   return this._reaccesspoints;
  // }

  get type(): OrganizationType {
    return this._type;
  }

  get smoType(): SmoType {
    return this._smoType;
  }
}
