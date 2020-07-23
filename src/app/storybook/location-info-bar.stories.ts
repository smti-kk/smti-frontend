import {LocationInfoBar} from '../ui/map-page/location-info-bar/LocationInfoBar';
import {moduleMetadata} from '@storybook/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';

export default {
  title: 'Данные о локации',
  decorators: [
    moduleMetadata({
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule,
        MatTooltipModule
      ]
    })
  ]
};

export const Базовый = () => ({
  component: LocationInfoBar,
  props: {
    location: {
      cellular: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ],
      infomat: [],
      internet: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ],
      locationName: 'г Красноярск',
      mail: [],
      payphone: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: true
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ],
      population: 100,
      radio: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ],
      telephone: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: true
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ],
      tv: [
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/beeline.png',
          isActive: true
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
        {
          iconUrl: '/mts.png',
          isActive: false
        },
      ]
    }
  },
});
