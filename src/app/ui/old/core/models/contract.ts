import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';

import {Reaccesspoint} from '@core/models/reaccesspoint';
import {Organization} from '@core/models/organization';
import {InternetAccessType} from '@core/models/internet-access-type';
import {ID_SERIALIZER} from '@core/utils/serializers';

export class Contract {
  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('contractor')
  private readonly _contractor: string;

  @autoserializeAs('declaredSpeed')
  private readonly _declaredSpeed: string;

  @deserializeAs(InternetAccessType, 'internetAccess')
  @serializeAs(ID_SERIALIZER, 'internetAccess')
  private readonly _internetAccessType: InternetAccessType;

  @autoserializeAs('type')
  private readonly _type: string;

  @deserializeAs(Organization, 'organization')
  @serializeAs('organization')
  private readonly _organization: Organization;

  @autoserializeAs('amount')
  private readonly _amount: number;

  @autoserializeAs('number')
  private readonly _number: string;


  // @autoserializeAs('registration_number')
  // private readonly _registrationNumber: string;

  // @autoserializeAs(Date, 'date_realization')
  // private readonly _dateRealization: Date;

  // @autoserializeAs(Reaccesspoint, 'reaccesspoint_set')
  // private readonly _reaccesspoints: Reaccesspoint[];

  // @autoserializeAs(Organization, 'customer')
  // private readonly _customer: Organization;

  constructor(
    id: number,
    registrationNumber: string,
    amount: number,
    dateRealization: Date
    // , customer: Organization
  ) {
    this._id = id;
    // this._registrationNumber = registrationNumber;
    this._amount = amount;
    // this._dateRealization = dateRealization;
    // this._customer = customer;
  }

  get id(): number {
    return this._id;
  }

  get address(): string {
    return this._address;
  }

  get contractor(): string {
    return this._contractor;
  }

  get declaredSpeed(): string {
    return this._declaredSpeed;
  }

  get internetAccessType(): InternetAccessType {
    return this._internetAccessType;
  }

  get type(): string {
    return this._type;
  }

  get organization(): Organization {
    return this._organization;
  }

  get amount(): number {
    return this._amount;
  }

  get number(): string {
    return this._number;
  }

  // get reaccesspoints(): Reaccesspoint[] {
  //   return this._reaccesspoints;
  // }

  // get registrationNumber(): string {
  //   return this._registrationNumber;
  // }

  // get dateRealization(): Date {
  //   return this._dateRealization;
  // }

  // get customer(): Organization {
  //   return this._customer;
  // }
}
