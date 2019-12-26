import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FilterTcPivotsService, OrderingDirection} from './tc-pivots.service';
import {LocationFeatures} from '@core/models';
import {sortStringAscCompareFn, sortStringDescCompareFn} from '@core/utils/sort';

@Injectable()
export class FilterOnClientTcPivotsService extends FilterTcPivotsService {
  filtersFn = {
    ats: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => {
        return tc.ats.length !== 0;
      });
    },
    payphone: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => {
        return tc.ats.filter(payphone => payphone.quantityPayphone !== 0).length !== 0;
      });
    },
    infomat: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => tc.location.infomat > 0);
    },
    radio: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => {
        return tc.radio.length !== 0;
      });
    },
    internet_type: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => {
        return tc.internet.find(
          i => i.channel && i.channel.type === this.filters.internetType.type
        );
      });
    },
    tv_type: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc =>
        tc.television.find(i => {
          return i.type && i.type.find(t => t.id === this.filters.tvType.id);
        })
      );
    },
    mobile_type: (tcs: LocationFeatures[]) => {
      return tcs.filter(tc => {
        return tc.cellular.find(i => {
          return i.type && i.type.type === this.filters.mobileType.type;
        });
      });
    },
    govenmet_programs: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => tc.governmentPrograms.find(gp => gp.id === this.filters.program.id));
    },
    internet_operator: (tcs: LocationFeatures[]) => {
      const providers = this.filters.internet
        .filter(internetItem => Object.values(internetItem)[0] === true)
        .map(i => Object.keys(i)[0]);

      return tcs.filter(tc => {
        return tc.internet.find(internet => {
          return providers.find(p => p === internet.operator.id.toString());
        });
      });
    },
    mobile_operator: (tcs: LocationFeatures[]) => {
      const providers = this.filters.mobile
        .filter(mobile => Object.values(mobile)[0] === true)
        .map(i => Object.keys(i)[0]);

      return tcs.filter(tc => {
        return tc.cellular.find(mobile => {
          return providers.find(p => p === mobile.operator.id.toString());
        });
      });
    },
    ordering: (tcs: LocationFeatures[]): LocationFeatures[] => {
      switch (this.filters.order.name) {
        case 'name':
          return tcs.sort(
            this.filters.order.orderingDirection === OrderingDirection.ASC
              ? sortStringAscCompareFn('name')
              : sortStringDescCompareFn('name')
          );
        case 'parent':
          return tcs.sort(
            this.filters.order.orderingDirection === OrderingDirection.ASC
              ? sortStringAscCompareFn('area')
              : sortStringDescCompareFn('area')
          );
        case 'people_count':
          return tcs.sort(
            this.filters.order.orderingDirection === OrderingDirection.ASC
              ? (a, b) => a.location.peopleCount - b.location.peopleCount
              : (a, b) => b.location.peopleCount - a.location.peopleCount
          );
      }
    },
    post_type: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc => {
        return tc.post.find(mail => mail.type === this.filters.mailType);
      });
    },
    locationName: (tcs: LocationFeatures[]): LocationFeatures[] => {
      return tcs.filter(tc =>
        tc.location.name.toLowerCase().includes(this.filters.locationName.toLowerCase())
      );
    },
  };

  cachedTc: LocationFeatures[];

  list(): Observable<LocationFeatures[]> {
    if (!this.cachedTc) {
      // this.params = this.params.set('parent', '2093');
      return super.list().pipe(tap(tcs => (this.cachedTc = tcs)));
    } else {
      let filtered = [...this.cachedTc];
      this.params
        .keys()
        // .filter(p => p !== 'parent')
        .forEach(filter => {
          filtered = this.filtersFn[filter](filtered);
        });

      return of(filtered);
    }
  }
}
