import { autoserializeAs } from 'cerialize';

export class Contract {

  @autoserializeAs('id')
  private readonly _id: number;

  @autoserializeAs('registration_number')
  private readonly _registrationNumber: number;

  @autoserializeAs('amount')
  private readonly _amount: number;

  @autoserializeAs(Date, 'date_realization')
  private readonly _dateRealization: Date;

  // @autoserializeAs(Organization, 'customer')
  // private readonly _customer: Organization;


  constructor(id: number, registrationNumber: number, amount: number, dateRealization: Date
              // , customer: Organization
  ) {
    this._id = id;
    this._registrationNumber = registrationNumber;
    this._amount = amount;
    this._dateRealization = dateRealization;
    // this._customer = customer;
  }


  get id(): number {
    return this._id;
  }

  get registrationNumber(): number {
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
