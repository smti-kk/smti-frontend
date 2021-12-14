import { Location } from './../../core/models/location';
import { Deserialize } from 'cerialize';
const KRSK_STATE = {
  id: 4,
  parent: null,
  name: 'Красноярский',
  fullName: 'Красноярский край',
  type: 'край',
};

export const KrskState = Deserialize(KRSK_STATE, Location)

