import { MonitoringPoint } from './monitoring-point';
import { autoserializeAs, inheritSerialization } from 'cerialize';
import { Coordinate } from '@map-wrapper/interface/coordinate';

const SMO_MARKER_PATH = '../../../../assets/img/ap-ena-smo.svg';

@inheritSerialization(MonitoringPoint)
export class AccessPointSmo extends MonitoringPoint {

  @autoserializeAs('actual_address')
  private readonly _actualAddress: string;

  @autoserializeAs('address')
  private readonly _address: string;

  @autoserializeAs('cmo_type')
  private readonly _cmoType: string;

  @autoserializeAs('defined_speed')
  private readonly _definedSpeed: string;

  @autoserializeAs('description')
  private readonly _description: string;

  @autoserializeAs('institution_type')
  private readonly _institutionType: string;

  @autoserializeAs('label')
  private readonly _label: string;

  @autoserializeAs('medium_type')
  private readonly _mediumType: string;

  @autoserializeAs('network_provider')
  private readonly _networkProvider: string;

  @autoserializeAs('org_name')
  private readonly _orgName: string;

  @autoserializeAs('visible')
  private readonly _visible: boolean;


  constructor(id: number, point: Coordinate, name: string,
              actualAddress: string, address: string, cmoType: string,
              definedSpeed: string, description: string, institutionType: string,
              label: string, mediumType: string, networkProvider: string, orgName: string, visible: boolean) {
    super(point, id);
    this._actualAddress = actualAddress;
    this._address = address;
    this._cmoType = cmoType;
    this._definedSpeed = definedSpeed;
    this._description = description;
    this._institutionType = institutionType;
    this._label = label;
    this._mediumType = mediumType;
    this._networkProvider = networkProvider;
    this._orgName = orgName;
    this._visible = visible;
  }

  get iconUrl() {
    return SMO_MARKER_PATH;
  }

  get actualAddress(): string {
    return this._actualAddress;
  }

  get address(): string {
    return this._address;
  }

  get cmoType(): string {
    return this._cmoType;
  }

  get definedSpeed(): string {
    return this._definedSpeed;
  }

  get description(): string {
    return this._description;
  }

  get institutionType(): string {
    return this._institutionType;
  }

  get label(): string {
    return this._label;
  }

  get mediumType(): string {
    return this._mediumType;
  }

  get networkProvider(): string {
    return this._networkProvider;
  }

  get orgName(): string {
    return this._orgName;
  }

  get visible(): boolean {
    return this._visible;
  }
}
