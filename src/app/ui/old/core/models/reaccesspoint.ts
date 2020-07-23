import {autoserializeAs, deserializeAs, inheritSerialization, serializeAs} from 'cerialize';

import {GovernmentProgram} from '@core/models/government-program';
import {InternetAccessType} from '@core/models/internet-access-type';
import {Operator} from '@core/models/operator';
import {Quality} from '@core/models/enums';
import {Avstatus} from '@core/models/avstatus';
import {ID_SERIALIZER} from '@core/utils/serializers';
import {Organization} from '@core/models/organization';
import {MonitoringPoint} from './monitoring-point';

const ESPD_MARKER_ACTIVE = '../../../../assets/img/ap-ena-espd.svg';
const ESPD_MARKER_UNDEFINED = '../../../../assets/img/ap-na-espd.svg';
const ESPD_MARKER_DISABLED = '../../../../assets/img/ap-dis-espd.svg';

const ORGANIZATION_DESERIALIZER = {
  Deserialize(json): number {
    return json.id;
  },
};

const LOCATION_DESERIALIZER = {
  Deserialize(json): number {
    return json.location;
  },
};

@inheritSerialization(MonitoringPoint)
export class Reaccesspoint extends MonitoringPoint {
  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs(Avstatus, 'avstatus')
  private readonly _avstatus: Avstatus;

  @autoserializeAs('billing_id')
  private readonly _billingId: number;

  @autoserializeAs('completed')
  private readonly _completed: boolean;

  @deserializeAs(InternetAccessType, 'internetAccess')
  @serializeAs(ID_SERIALIZER, 'internetAccess')
  private readonly _connectionType: InternetAccessType;

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

  @autoserializeAs('declaredSpeed')
  private readonly _declaredSpeed: string;

  @autoserializeAs('description')
  private readonly _description: string;

  @deserializeAs(GovernmentProgram, 'government_program')
  @serializeAs(ID_SERIALIZER, 'government_program')
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

  @autoserializeAs('type')
  private readonly _type: string;

  @deserializeAs(Organization, 'organization')
  @serializeAs('organization')
  private readonly _organization: Organization;

  get organization(): Organization {
    return this._organization;
  }

  get locationId(): number {
    return this._locationId;
  }

  get organizationId(): number {
    return this._organizationId;
  }

  get address(): string {
    return this._address;
  }

  get completed(): boolean {
    return this._completed;
  }

  get connectionType(): InternetAccessType {
    return this._connectionType;
  }

  get contractor(): string {
    return this._contractor;
  }

  get customer(): string {
    return this._customer;
  }

  get declaredSpeed(): string {
    return this._declaredSpeed;
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

  get name(): string {
    return this._name;
  }

  get netTrafficLastMonth(): string {
    return this._netTrafficLastMonth;
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

  get visible(): boolean {
    return this._visible;
  }

  get type(): string {
    return this._type;
  }

  get avstatus(): Avstatus {
    return this._avstatus;
  }

  get connectionTypeString(): string {
    if (this.connectionType != null) {
      return this.connectionType.name;
    }
    return '';
    // throw Error('connection type is null');
  }

  get iconUrl(): string {
    if (this.governmentProgram.acronym === 'СЗО') {
      return '../../../../assets/img/ap-ena-smo.svg';
    }
    if (this.governmentProgram.acronym === 'ЕСПД') {
      if (this.avstatus === null) {
        return ESPD_MARKER_UNDEFINED;
      }
      if (this.avstatus.available) {
        return ESPD_MARKER_ACTIVE;
      }
      if (!this.avstatus.available) {
        return ESPD_MARKER_DISABLED;
      }
    }
    throw Error('cant find icon url');
  }

  get avstateStr(): string {
    if (this.avstatus) {
      return this.avstatus.toString();
    }
    return '';
  }
}
