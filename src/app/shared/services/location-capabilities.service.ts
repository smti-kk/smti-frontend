import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Observable, of } from 'rxjs';
import { LocationCapabilities } from '../model/LocationCapabilities';

@Injectable({
  providedIn: SharedModule
})
export class LocationCapabilitiesService {
  constructor() {
  }

  getById(id: number): Observable<LocationCapabilities> {
    if (id === 2419) {
      return of(TEST_LOCATION);
    } else {
      return of(TEST_LOCATION2);
    }
  }
}

const TEST_LOCATION = new LocationCapabilities(
  'г. Красноряск',
  'Красноярский Край',
  {
    population: 11512,
    cellular: [],
    informat: false,
    internet: [],
    telephone: [],
    payphone: [],
    radio: [],
    tv: [],
    mail: []
  },
  []
);

const TEST_LOCATION2 = new LocationCapabilities(
  'Все кроме Красноярска',
  'Все районы',
  {
    population: 11512,
    cellular: [
      {
        provider: {
          name: 'МТС',
          icon: '../../../../assets/img/mts.png',
          isActive: false
        },
        mobileGeneration: '3G',
        quality: ''
      },
      {
        provider: {
          name: 'Билайн',
          icon: '../../../../assets/img/beeline.png',
          isActive: true
        },
        mobileGeneration: '4G',
        quality: ''
      },
      {
        provider: {
          name: 'Мегафон',
          icon: '../../../../assets/img/megafon.png',
          isActive: true
        },
        mobileGeneration: '2G',
        quality: ''
      },
      {
        provider: {
          name: 'Теле2',
          icon: '../../../../assets/img/tele2.png',
          isActive: true
        },
        mobileGeneration: '3G',
        quality: ''
      },
      {
        provider: {
          name: 'РосТелеком',
          icon: '../../../../assets/img/rostelecom.png',
          isActive: true
        },
        mobileGeneration: '3G',
        quality: ''
      },
    ],
    informat: false,
    telephone: [
      {
        count: 5,
        provider: {
          name: 'РосТелеком',
          isActive: true,
          icon: '../../../../assets/img/rostelecom.png'
        }
      }
    ],
    internet: [
      {
        provider: {
          name: 'МТС',
          icon: '../../../../assets/img/mts.png',
          isActive: false
        },
        quality: '',
        type: 'ВОЛС'
      },
      {
        provider: {
          name: 'Билайн',
          icon: '../../../../assets/img/beeline.png',
          isActive: true
        },
        quality: '',
        type: 'Медь'
      },
      {
        provider: {
          name: 'Мегафон',
          icon: '../../../../assets/img/megafon.png',
          isActive: true
        },
        quality: '',
        type: 'ВОЛС'
      },
      {
        provider: {
          name: 'Теле2',
          icon: '../../../../assets/img/tele2.png',
          isActive: true
        },
        quality: '',
        type: 'Медь'
      },
      {
        provider: {
          name: 'РосТелеком',
          icon: '../../../../assets/img/rostelecom.png',
          isActive: true
        },
        quality: '',
        type: 'Радио'
      },
      {
        provider: {
          name: 'Искра',
          icon: '../../../../assets/img/iskra.png',
          isActive: true
        },
        quality: '',
        type: 'Спутник'
      },
      {
        provider: {
          name: 'ТТК',
          icon: '../../../../assets/img/ttk.png',
          isActive: true
        },
        quality: '',
        type: 'ВОЛС'
      }
    ],
    payphone: [
      {
        count: 5,
        provider: {
          icon: '../../../../assets/img/rostelecom.png',
          isActive: true,
          name: 'РосТелеком'
        }
      }
    ],
    radio: [
      {
        type: '',
        provider: {
          icon: '../../../../assets/img/rostelecom.png',
          isActive: true,
          name: 'РосТелеком'
        }
      }
    ],
    tv: [
      {
        provider: {
          name: 'Билайн',
          icon: '../../../../assets/img/beeline.png',
          isActive: true
        },
        type: 'АТВ'
      },
      {
        provider: {
          name: 'РосТелеком',
          icon: '../../../../assets/img/rostelecom.png',
          isActive: true
        },
        type: 'АТВ'
      },
      {
        provider: {
          name: 'ТелСпутник',
          icon: '../../../../assets/img/telsputnik.png',
          isActive: true
        },
        type: 'ЦТВ'
      }
    ],
    mail: [
      {
        provider: {
          name: 'УПС',
          isActive: true,
          icon: '',
        }
      }
    ]
  },
  [
    {
      name: 'МБОУ СОШ №30',
      connectionPointAddress: 'с.Богучаны, ул. Лесная, 147',
      customer: 'МЦР',
      contractor: 'МТС',
      connectionTechnology: '3G/4G',
      connectionPoint: '---',
      connectionSpeed: '10 Мбит',
      state: 'Доступно (01.10.2019 16:00:14)',
      traffic: '0.00 Gb (29.09.2019)'
    }
  ]
);
