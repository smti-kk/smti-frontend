import { autoserializeAs } from 'cerialize';

export class LocationAreaProperties {

  @autoserializeAs('type')
  private readonly _type: number;

  @autoserializeAs('mark')
  private readonly _mark: number;

  @autoserializeAs('mobileInternetMaxType')
  private readonly _mobileInternetMaxType: string;

  @autoserializeAs('mobile_mark')
  private readonly _mobileMark: number;


  constructor(name: string, type: number, mark: number, mobileInternetMaxType: string, mobileMark: number) {
    this._type = type;
    this._mark = mark;
    this._mobileInternetMaxType = mobileInternetMaxType;
    this._mobileMark = mobileMark;
  }

  get type(): number {
    return this._type;
  }

  get mark(): number {
    return this._mark;
  }

  get mobileInternetMaxType(): string {
    return this._mobileInternetMaxType;
  }

  get mobileMark(): number {
    return this._mobileMark;
  }
}
