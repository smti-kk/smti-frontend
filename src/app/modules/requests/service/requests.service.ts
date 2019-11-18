import { Injectable } from '@angular/core';
import { Request, RequestState } from '../model/request';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestsService {

  public requestsList(): Observable<Request[]> {
    return of(mock)
      .pipe(
        map(data => {
          return data.sort((a, b) => {
            if (a.state > b.state) {
              return 1;
            } else {
              return -1;
            }
          });
        })
      );
  }

}

const mock = [
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '104a',
    date: '07.06.19',
    changes: [
      {
        object: 'Интернет',
        action: 'Искра - проведен спутник (качество удовлетворительное)'
      }
    ],
    state: RequestState.ACCEPTED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.CONSIDERED
  },
  {
    id: '115a',
    date: '15.08.19',
    changes: [
      {
        object: 'Таксофон',
        action: 'Изменено количество таксофонов с 4 до 5 шт'
      },
      {
        object: 'Сотовая связь',
        action: 'МТС - с 2G на 3G, подключение Мегафон'
      },
      {
        object: 'Интернет',
        action: 'Мегафон - проведен ВОЛС(качество удовлетворительное); Tele2 - подключение,медь (качество хорошее)'
      }
    ],
    state: RequestState.ACCEPTED
  }
];
