import { autoserializeAs } from 'cerialize';
import { Reaccesspoint } from '@core/models/reaccesspoint';

export class Contract {

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('registration_number')
  private readonly _registrationNumber: string;

  @autoserializeAs('amount')
  private readonly _amount: number;

  @autoserializeAs(Date, 'date_realization')
  private readonly _dateRealization: Date;

  @autoserializeAs(Reaccesspoint, 'reaccesspoint_set')
  private readonly _reaccesspoints: Reaccesspoint[];

  // @autoserializeAs(Organization, 'customer')
  // private readonly _customer: Organization;


  constructor(id: number, registrationNumber: string, amount: number, dateRealization: Date
              // , customer: Organization
  ) {
    this._id = id;
    this._registrationNumber = registrationNumber;
    this._amount = amount;
    this._dateRealization = dateRealization;
    // this._customer = customer;
  }

  get reaccesspoints(): Reaccesspoint[] {
    return this._reaccesspoints;
  }

  get id(): number {
    return this._id;
  }

  get registrationNumber(): string {
    return this._registrationNumber;
  }

  get amount(): number {
    return this._amount;
  }

  get dateRealization(): Date {
    return this._dateRealization;
  }

  // get customer(): Organization {
  //   return this._customer;
  // }
}
