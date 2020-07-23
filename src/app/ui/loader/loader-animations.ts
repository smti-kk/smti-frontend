import {animate, state, style, transition, trigger} from '@angular/animations';

export const loading = trigger('loading', [
  state(
    'show',
    style({
      opacity: '0',
    })
  ),
  state(
    'hide',
    style({
      opacity: '100%',
    })
  ),
  transition('* <=> *', [animate('1s')])
]);
