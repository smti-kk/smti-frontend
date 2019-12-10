import { autoserializeAs } from 'cerialize';
import { OrganizationType } from '@core/models/organization-type';
import { SmoType } from '@core/models/smo-type';
import { Reaccesspoint } from '@core/models/reaccesspoint';
import { Contract } from '@core/models/contract';

export class Organization {

  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('fias')
  private readonly _fias: string;

  @autoserializeAs('full_name')
  private readonly _fullName: string;

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('inn')
  private readonly _inn: number;

  @autoserializeAs('kpp')
  private readonly _kpp: number;

  @autoserializeAs(Organization, 'parent')
  private readonly _parent: Organization;

  @autoserializeAs(Reaccesspoint, 'reaccesspoints')
  private readonly _reaccesspoints: Reaccesspoint[];

  @autoserializeAs(OrganizationType, 'type')
  private readonly _type: OrganizationType;

  @autoserializeAs(SmoType, 'type_smo')
  private readonly _smoType: SmoType;

  @autoserializeAs(Contract, 'contract_set')
  private readonly _contracts: Contract[];


  constructor(address: string, fias: string, fullName: string,
              id: number, inn: number, kpp: number,
              parent: Organization, reaccesspoints: Reaccesspoint[], type: OrganizationType,
              smoType: SmoType) {
    this._address = address;
    this._fias = fias;
    this._fullName = fullName;
    this._id = id;
    this._inn = inn;
    this._kpp = kpp;
    this._parent = parent;
    this._reaccesspoints = reaccesspoints;
    this._type = type;
    this._smoType = smoType;
  }


  get contracts(): Contract[] {
    return this._contracts;
  }

  get address(): string {
    return this._address;
  }

  get fias(): string {
    return this._fias;
  }

  get fullName(): string {
    return this._fullName;
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

  get reaccesspoints(): Reaccesspoint[] {
    return this._reaccesspoints;
  }

  get type(): OrganizationType {
    return this._type;
  }

  get smoType(): SmoType {
    return this._smoType;
  }
}
