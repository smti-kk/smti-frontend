import { MonitoringPoint } from './monitoring-point';
import { Coordinate } from '../interface/coordinate';
import { autoserializeAs, inheritSerialization } from 'cerialize';

const ESPD_MARKER_ACTIVE = '../../../../assets/img/Ресурс 5.svg';
const ESPD_MARKER_UNDEFINED = '../../../../assets/img/Ресурс 4.svg';
const ESPD_MARKER_DISABLED = '../../../../assets/img/Ресурс 3.svg';

@inheritSerialization(MonitoringPoint)
export class AccessPointEspd extends MonitoringPoint {

  @autoserializeAs('actual_address')
  private readonly _actualAddress: string;

  @autoserializeAs('customer')
  private readonly _customer: string;

  @autoserializeAs('contractor')
  private readonly _contractor: string;

  @autoserializeAs('medium_type')
  private readonly _mediumType: string;

  @autoserializeAs('defined_speed')
  private readonly _definedSpeed: string;

  @autoserializeAs('connection')
  private readonly _connection: string;

  @autoserializeAs('description')
  private readonly _description: string;

  @autoserializeAs('avstate')
  private readonly _avstate: string;

  @autoserializeAs('traffic')
  private readonly _traffic;

  @autoserializeAs('org_name')
  private readonly _orgName;

  constructor(point: Coordinate, id: number, actualAddress: string,
              customer: string, contractor: string, mediumType: string,
              definedSpeed: string, connection: string, description: string, avstate: string, traffic) {
    super(point, id);
    this._actualAddress = actualAddress;
    this._customer = customer;
    this._contractor = contractor;
    this._mediumType = mediumType;
    this._definedSpeed = definedSpeed;
    this._connection = connection;
    this._description = description;
    this._avstate = avstate;
    this._traffic = traffic;
  }

  get traffic() {
    return this._traffic;
  }

  get avstate(): string {
    return this._avstate;
  }

  get description(): string {
    return this._description;
  }

  get orgName() {
    return this._orgName;
  }

  get actualAddress(): string {
    return this._actualAddress;
  }

  get customer(): string {
    return this._customer;
  }

  get contractor(): string {
    return this._contractor;
  }

  get mediumType(): string {
    return this._mediumType;
  }

  get connection(): string {
    return this._connection;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  get iconUrl(): string {
    if (this.avstate === null) {
      return ESPD_MARKER_UNDEFINED;
    } else if (this.avstate.includes('Не доступно')) {
      return ESPD_MARKER_ACTIVE;
    } else {
      return ESPD_MARKER_DISABLED;
    }
  }
}
