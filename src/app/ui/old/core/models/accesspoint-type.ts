export interface AccessPointType {
  id: number;
  name: string;
  desc: string;
}
export interface AccessPointState {
  DISABLED:      number;
  ACTIVE:        number;
  PROBLEM:       number;
  NOT_MONITORED: number;
}
