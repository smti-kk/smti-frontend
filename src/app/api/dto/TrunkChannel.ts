import {MapLocation} from './MapLocation';
import {Operator} from './Operator';
import {TrunkChannelType} from './TrunkChannelType';
import {GovernmentProgram} from './GovernmentProgram';

export interface TrunkChannel {
  id: number;
  locationStart: MapLocation;
  locationEnd: MapLocation;
  operator: Operator;
  typeTrunkChannel: TrunkChannelType;
  commissioning: string;
  decommissioning: string;
  program: GovernmentProgram;
  completed: number;
}
