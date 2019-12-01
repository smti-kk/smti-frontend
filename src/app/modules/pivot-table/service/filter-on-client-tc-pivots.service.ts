import { Injectable } from '@angular/core';
import { sortStringAscCompareFn, sortStringDescCompareFn } from '@shared/utils/sort';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FilterTcPivotsService, OrderingDirection } from './tc-pivots.service';
import { LocationCapabilities } from '@core/models';

@Injectable()
export class FilterOnClientTcPivotsService extends FilterTcPivotsService {
  filtersFn = {
    ats: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => {
        return tc.information.telephone
          .filter(telephone => telephone.provider.isActive)
          .length !== 0;
      });
    },
    payphone: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => {
        return tc.information.payphone
          .filter(payphone => payphone.provider.isActive && payphone.count !== 0)
          .length !== 0;
      });
    },
    infomat: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.information.informat !== false);
    },
    radio: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => {
        return tc.information.radio
          .filter(radio => radio.provider.isActive)
          .length !== 0;
      });
    },
    internet_type: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.information.internet.find(i => i.channel && i.channel.id === this.filters.internetType));
    },
    tv_type: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.information.tv.find(i => {
        return i.type && i.type.find(t => t.type === this.filters.tvType);
      }));
    },
    mobile_type: (tcs: LocationCapabilities[]) => {
      return tcs.filter(tc => {
        return tc.information.cellular.find(i => {
          return i.mobileGeneration && i.mobileGeneration.id === this.filters.mobileType;
        });
      });
    },
    govenmet_programs: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.govPrograms.find(gp => gp.id === this.filters.program.id));
    },
    internet_operator: (tcs: LocationCapabilities[]) => {
      const providers = this.filters.internet
        .filter(internetItem => Object.values(internetItem)[0] === true)
        .map(i => Object.keys(i)[0]);

      return tcs.filter(tc => {
        return tc.information.internet.find(internet => {
          return providers.find(p => internet.provider.isActive && p === internet.provider.id.toString());
        });
      });
    },
    mobile_operator: (tcs: LocationCapabilities[]) => {
      const providers = this.filters.mobile
        .filter(mobile => Object.values(mobile)[0] === true)
        .map(i => Object.keys(i)[0]);

      return tcs.filter(tc => {
        return tc.information.cellular.find(mobile => {
          return providers.find(p => mobile.provider.isActive && p === mobile.provider.id.toString());
        });
      });
    },
    ordering: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
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
              ? ((a, b) => a.information.population - b.information.population)
              : ((a, b) => b.information.population - a.information.population)
          );
      }
    },
    post_type: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.information.mail.find(mail => mail.type === this.filters.mailType));
    },
    locationName: (tcs: LocationCapabilities[]): LocationCapabilities[] => {
      return tcs.filter(tc => tc.name.toLowerCase().includes(this.filters.locationName.toLowerCase()));
    }
  };

  cachedTc: LocationCapabilities[];

  list(): Observable<LocationCapabilities[]> {
    if (!this.cachedTc) {
      this.params = this.params.append('parent', '2093');
      return super
        .list()
        .pipe(tap((tcs) => this.cachedTc = tcs));
    } else {
      let filtered = [...this.cachedTc];
      this.params
        .keys()
        .filter(p => p !== 'parent')
        .forEach((filter) => {
          filtered = this.filtersFn[filter](filtered);
        });

      return of(filtered);
    }
  }
}
