import {autoserializeAs, deserializeAs, inheritSerialization, serializeAs} from 'cerialize';

import {GovernmentProgram} from '@core/models/government-program';
import {InternetAccessType} from '@core/models/internet-access-type';
import {Operator} from '@core/models/operator';
import {ParticipationStatus, Quality} from '@core/models/enums';
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

// tslint:disable:variable-name
@inheritSerialization(MonitoringPoint)
export class Reaccesspoint extends MonitoringPoint {
  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs(Avstatus, 'avstatus')
  private readonly _avstatus: Avstatus;

  @autoserializeAs('billing_id')
  private readonly _billingId: number;

  @autoserializeAs('completed')
  private readonly _completed: number;

  @deserializeAs(InternetAccessType, 'internetAccess')
  @serializeAs(ID_SERIALIZER, 'internetAccess')
  private readonly _connectionType: InternetAccessType;

  @deserializeAs(ORGANIZATION_DESERIALIZER, 'organization')
  private readonly _organizationId: number;

  @deserializeAs(LOCATION_DESERIALIZER, 'organization')
  private readonly _locationId: number;

  @autoserializeAs('connectionState')
  private readonly _connectionState: string;
  
  @autoserializeAs('contractor')
  private readonly _contractor: string;

  @autoserializeAs(Date, 'created_at')
  private readonly _createdAt: Date;

  @autoserializeAs(Date, 'createDate')
  private readonly _createDate: Date;

  @autoserializeAs('customer')
  private readonly _customer: string;

  @autoserializeAs('dayTraffic')
  private readonly _dayTraffic: number;

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

  @autoserializeAs(Operator, 'problemDefinition')
  private readonly _problemDefinition: string;

  @autoserializeAs(Quality, 'quality')
  private readonly _quality: Quality;

  @autoserializeAs('state')
  private readonly _state: ParticipationStatus;

  @autoserializeAs('ucn')
  private readonly _ucn: number;

  @autoserializeAs(Date, 'updated_at')
  private readonly _updatedAt: Date;

  @autoserializeAs('visible')
  private readonly _visible: boolean;

  @autoserializeAs('type')
  private readonly _type: string;

  @autoserializeAs('number')
  private readonly _number: string;

  @autoserializeAs('amount')
  private readonly _amount: number;

  @autoserializeAs('utm5')
  private readonly _utm5: boolean;

  @autoserializeAs('zabbix')
  private readonly _zabbix: boolean;

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

  get completed(): number {
    return this._completed;
  }

  get createDate(): Date {
    return this._createDate;
  }

  get connectionState(): string {
    return this._connectionState;
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

  get dayTraffic(): number {
    return this._dayTraffic;
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

  get problemDefinition(): string {
    return this._problemDefinition;
  }

  get quality(): Quality {
    return this._quality;
  }

  get state(): ParticipationStatus {
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

  get utm5(): boolean {
    return this._utm5;
  }

  get zabbix(): boolean {
    return this._zabbix;
  }
}
