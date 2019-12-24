import { MonitoringPoint } from './monitoring-point';
import { Coordinate } from '../interface/coordinate';
import { autoserializeAs, inheritSerialization } from 'cerialize';

const ESPD_MARKER_ACTIVE = '../../../../assets/img/ap-ena-espd.svg';
const ESPD_MARKER_UNDEFINED = '../../../../assets/img/ap-na-espd.svg';
const ESPD_MARKER_DISABLED = '../../../../assets/img/ap-dis-espd.svg';

@inheritSerialization(MonitoringPoint)
export class AccessPointEspd extends MonitoringPoint {

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('node')
  private readonly _node: string;

  @autoserializeAs('description')
  private readonly _description: string;

  @autoserializeAs('ucn')
  private readonly _ucn: string;

  @autoserializeAs('customer')
  private readonly _customer: string;

  @autoserializeAs('contractor')
  private readonly _contractor: string;

  @autoserializeAs('defined_speed')
  private readonly _definedSpeed: string;

  @autoserializeAs('net_traffic_last_month')
  private readonly _traffic;




  @autoserializeAs('medium_type') //connection_type
  private readonly _mediumType: string;

  @autoserializeAs('connection')
  private readonly _connection: string;

  @autoserializeAs('avstate')
  private readonly _avstate: string;


  @autoserializeAs('org_name')
  private readonly _orgName;

  constructor(point: Coordinate, id: number, name: string, node: string, ucn: string,
              address: string,
              customer: string, contractor: string, mediumType: string,
              definedSpeed: string, connection: string, description: string, avstate: string, traffic) {
    super(point, id);
    this._name = name;
    this._node = node;
    this._address = address;
    this._ucn = ucn;
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

  get address(): string {
    return this._address;
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
      return ESPD_MARKER_DISABLED;
    } else {
      return ESPD_MARKER_ACTIVE;
    }
  }
}
