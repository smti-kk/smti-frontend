import {autoserializeAs, deserializeAs, inheritSerialization} from 'cerialize';
// import { Contract } from '@core/models/contract';
import {GovernmentProgram} from '@core/models/government-program';
import {InternetAccessType} from '@core/models/internet-access-type';
import {Operator} from '@core/models/operator';
import {Quality} from '@core/models/enums';
import {MonitoringPoint} from '@map-wrapper/model/monitoring-point';

const ESPD_MARKER_ACTIVE = '../../../../assets/img/ap-ena-espd.svg';
const ESPD_MARKER_UNDEFINED = '../../../../assets/img/ap-na-espd.svg';
const ESPD_MARKER_DISABLED = '../../../../assets/img/ap-dis-espd.svg';

const ORGANIZATION_DESERIALIZER = {
  Deserialize(json) {
    return json.id;
  }
};

const LOCATION_DESERIALIZER = {
  Deserialize(json) {
    return json.location;
  }
};

@inheritSerialization(MonitoringPoint)
export class Reaccesspoint extends MonitoringPoint {

  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('billing_id')
  private readonly _billingId: number;

  @autoserializeAs('completed')
  private readonly _completed: boolean;

  @autoserializeAs(InternetAccessType, 'connection_type')
  private readonly _connectionType: InternetAccessType[];

  @deserializeAs(ORGANIZATION_DESERIALIZER, 'organization')
  private readonly _organizationId: number;

  @deserializeAs(LOCATION_DESERIALIZER, 'organization')
  private readonly _locationId: number;

  @autoserializeAs('contractor')
  private readonly _contractor: string;

  @autoserializeAs(Date, 'created_at')
  private readonly _createdAt: Date;

  @autoserializeAs('customer')
  private readonly _customer: string;

  @autoserializeAs('defined_speed')
  private readonly _definedSpeed: string;

  @autoserializeAs('description')
  private readonly _description: string;

  @autoserializeAs(GovernmentProgram, 'government_program')
  private readonly _governmentProgram: GovernmentProgram;

  @autoserializeAs('ip_config')
  private readonly _ipConfig: string;

  @autoserializeAs('max_amount')
  private readonly _maxAmount: number;

  @autoserializeAs('name')
  private readonly _name: string;

  @autoserializeAs('net_traffic_last_month')
  private readonly _netTrafficLastMonth: string;

  @autoserializeAs('net_traffic_last_week')
  private readonly _netTrafficLastWeek: string;

  @autoserializeAs('node')
  private readonly _node: string;

  @autoserializeAs(Operator, 'operator')
  private readonly _operator: Operator;

  @autoserializeAs(Quality, 'quality')
  private readonly _quality: Quality;

  @autoserializeAs('state')
  private readonly _state: string;

  @autoserializeAs('ucn')
  private readonly _ucn: number;

  @autoserializeAs(Date, 'updated_at')
  private readonly _updatedAt: Date;

  @autoserializeAs('visible')
  private readonly _visible: boolean;


  get locationId(): number {
    return this._locationId;
  }

  get organizationId(): number {
    return this._organizationId;
  }

  get address(): string {
    return this._address;
  }

  get billingId(): number {
    return this._billingId;
  }

  get completed(): boolean {
    return this._completed;
  }

  get connectionType(): InternetAccessType[] {
    return this._connectionType;
  }

  get contractor(): string {
    return this._contractor;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get customer(): string {
    return this._customer;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  get description(): string {
    return this._description;
  }

  get governmentProgram(): GovernmentProgram {
    return this._governmentProgram;
  }

  get ipConfig(): string {
    return this._ipConfig;
  }

  get maxAmount(): number {
    return this._maxAmount;
  }

  get name(): string {
    return this._name;
  }

  get netTrafficLastMonth(): string {
    return this._netTrafficLastMonth;
  }

  get netTrafficLastWeek(): string {
    return this._netTrafficLastWeek;
  }

  get node(): string {
    return this._node;
  }

  get operator(): Operator {
    return this._operator;
  }

  get quality(): Quality {
    return this._quality;
  }

  get state(): string {
    return this._state;
  }

  get ucn(): number {
    return this._ucn;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get visible(): boolean {
    return this._visible;
  }

  get connectionTypeString() {
    return this.connectionType
      .map(ct => ct.name)
      .join(',');
  }

  get iconUrl() {
    if (this.governmentProgram.shortName === 'СЗО') {
      return '../../../../assets/img/ap-ena-smo.svg';
    } else if (this.governmentProgram.shortName === 'ЕСПД') {
      // if (this.avstate === null) {
      //   return ESPD_MARKER_UNDEFINED;
      // } else if (this.avstate.includes('Не доступно')) {
      //   return ESPD_MARKER_DISABLED;
      // } else {
      //   return ESPD_MARKER_ACTIVE;
      // }
      return ESPD_MARKER_ACTIVE;
    }
  }


}
