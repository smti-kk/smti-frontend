import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Observable, of } from 'rxjs';
import { LocationCapabilities } from '../model/LocationCapabilities';

const TEST_LOCATION = new LocationCapabilities(
  'с. Богучаны',
  'Богучанский район',
  {
    population: 11512,
    telephone: [],
    cellular: [],
    informat: false,
    internet: [],
    payphone: [],
    radio: [],
    tv: []
  },
  []
);

const TEST_LOCATION2 = new LocationCapabilities(
  'с. Небогучаны',
  'НеБогучанский район',
  {
    population: 11512,
    telephone: [],
    cellular: [],
    informat: false,
    internet: [],
    payphone: [],
    radio: [],
    tv: []
  },
  []
);

@Injectable({
  providedIn: SharedModule
})
export class LocationCapabilitiesService {
  constructor() {
  }

  getById(id: number): Observable<LocationCapabilities> {
    if (id === 2419) {
      console.log(1);
      return of(TEST_LOCATION);
    } else {
      return of(TEST_LOCATION2);
    }
  }
}
