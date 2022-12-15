import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilter, LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {StrictFilter} from './StrictFilter';
import {OrderingDirection, OrderingFilter} from '../../ui/buttons/filter-btn/filter-btn.component';
import {
  sortStringAscCompareFn,
  sortStringAscCompareFn2,
  sortStringDescCompareFn,
  sortStringDescCompareFn2
} from '@service/util/sort';
import { Quality } from '@api/dto/Quality';
import { CellularIcon } from '@service/dto/CellularIcon';

export class StrictFilterImpl extends StrictFilter {
  private defaultFilterResponse: boolean;

  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[] {
    const cellularOperators = locationFilters.cellularOperators.filter(o => o.isSelected);
    const internetOperators = locationFilters.internetOperators.filter(o => o.isSelected);
    const signals = locationFilters.signalLevel.filter(s => s.isSelected);
    const channels = locationFilters.connectionType.filter(ct => ct.isSelected);
    const postTypes = locationFilters.postType.filter(pt => pt.isSelected);
    const tvTypes = locationFilters.tvType.filter(pt => pt.isSelected);
    const cellularAllowQuality = locationFilters.quality
      .filter((q) => q.isSelected)
      .map((q) => q.name.toUpperCase() as Quality);

    if (!this.anyOneFilterSelected(locationFilters,
      cellularOperators,
      internetOperators,
      signals,
      channels,
      postTypes,
      tvTypes,
      cellularAllowQuality)) {
      return this.sort(locations, locationFilters.ordering, locationFilters.parent);
    }
    switch (locationFilters.logicalCondition) {
      case 'OR':
        this.defaultFilterResponse = false;
        return this.sort(locations.filter(l => {
          return this.includesLocationName(l, locationFilters.location) ||
            this.hasESPD(l, locationFilters) ||
            this.hasSMO(l, locationFilters) ||
            this.hasZSPD(l, locationFilters) ||
            this.hasGovProgramAndGovYearComplete(l, locationFilters.govProgram, locationFilters.govYear) ||
            this.hasParents(l, locationFilters.parent) ||
            this.hasCellularOperatorsAndSignalsAndQualities(l, cellularOperators, signals, cellularAllowQuality) ||
            this.hasTrunkChannelAndOperators(l, internetOperators, channels) ||
            this.hasPostTypes(l, postTypes) ||
            this.hasTvSignals(l, tvTypes) ||
            this.acceptCondition(l, locationFilters.hasATS, this.hasAts) ||
            this.acceptCondition(l, locationFilters.hasInfomat, this.hasInfomat) ||
            this.acceptCondition(l, locationFilters.hasPayphone, this.hasPayphones) ||
            this.acceptCondition(l, locationFilters.hasRadio, this.hasRadio) ||
            this.acceptCondition(l, locationFilters.hasCellular, this.hasCellular) ||
            this.acceptCondition(l, locationFilters.hasInternet, this.hasInternet) ||
            this.populationLeftBorder(l, locationFilters.populationRightBorder) ||
            this.populationRightBorder(l, locationFilters.populationLeftBorder);
        }), locationFilters.ordering, locationFilters.parent);
      case 'AND':
        this.defaultFilterResponse = true;
        return this.sort(locations.filter(l => {
          return this.includesLocationName(l, locationFilters.location) &&
            this.hasESPD(l, locationFilters) &&
            this.hasSMO(l, locationFilters) &&
            this.hasZSPD(l, locationFilters) &&
            this.hasGovProgramAndGovYearComplete(l, locationFilters.govProgram, locationFilters.govYear) &&
            this.hasParents(l, locationFilters.parent) &&
            this.hasCellularOperatorsAndSignalsAndQualities(l, cellularOperators, signals, cellularAllowQuality) &&
            this.hasTrunkChannelAndOperators(l, internetOperators, channels) &&
            this.hasPostTypes(l, postTypes) &&
            this.hasTvSignals(l, tvTypes) &&
            this.acceptCondition(l, locationFilters.hasATS, this.hasAts) &&
            this.acceptCondition(l, locationFilters.hasInfomat, this.hasInfomat) &&
            this.acceptCondition(l, locationFilters.hasPayphone, this.hasPayphones) &&
            this.acceptCondition(l, locationFilters.hasRadio, this.hasRadio) &&
            this.acceptCondition(l, locationFilters.hasCellular, this.hasCellular) &&
            this.acceptCondition(l, locationFilters.hasInternet, this.hasInternet) &&
            this.populationLeftBorder(l, locationFilters.populationLeftBorder) &&
            this.populationRightBorder(l, locationFilters.populationRightBorder);
        }), locationFilters.ordering, locationFilters.parent);
    }
  }

  sort(locations: LocationTableItem[], order: OrderingFilter, parent: number[]): LocationTableItem[] {
    if (!order) {
      if (parent && parent.length > 0) {
        return locations.sort((l1, l2) => {
          if (l1.area.name > l2.area.name) {
            return 1;
          } else if (l1.area.name < l2.area.name) {
            return -1;
          } else {
            if (l1.name > l2.name) {
              return 1;
            } else {
              return -1;
            }
          }
        });
      }
      return locations;
    }
    if (order.orderingDirection === OrderingDirection.UNDEFINED) {
      return locations;
    }
    switch (order.name) {
      case 'name':
        return locations.sort(
          order.orderingDirection === OrderingDirection.ASC
            ? sortStringAscCompareFn('name')
            : sortStringDescCompareFn('name')
        );
      case 'parent':
        return locations.sort(
          order.orderingDirection === OrderingDirection.ASC
            ? sortStringAscCompareFn2('area', 'name')
            : sortStringDescCompareFn2('area', 'name')
        );
      case 'people_count':
        return locations.sort(
          order.orderingDirection === OrderingDirection.ASC
            ? ((a, b) => parseInt(a.population, 10) - parseInt(b.population, 10))
            : ((a, b) => parseInt(b.population, 10) - parseInt(a.population, 10))
        );
    }
  }

  includesLocationName(location: LocationTableItem, locationName: string | string[]): boolean {
    if (locationName === null || locationName === '' || !locationName.length) {
      return this.defaultFilterResponse;
    }
    if(typeof locationName === 'string'){
      return location.name.toLowerCase().replace(/\./g, "") == locationName.toLowerCase().replace(/\./g, "");
    }
    else {
      for(let i = 0; i < locationName.length; i++){
        if(location.name.toLowerCase().replace(/\./g, "") == locationName[i].toLowerCase().replace(/\./g, "")){
          return true;
        }
      }
    }
  }

  hasESPD(location: LocationTableItem, filters: LocationFilters): boolean {
    if (!filters.hasESPD) {
      return this.defaultFilterResponse;
    }
    return location.hasESPD;
  }

  hasSMO(location: LocationTableItem, filters: LocationFilters): boolean {
    if (!filters.hasSMO) {
      return this.defaultFilterResponse;
    }
    return location.hasSMO;
  }

  hasZSPD(location: LocationTableItem, filters: LocationFilters): boolean {
    if (!filters.hasZSPD) {
      return this.defaultFilterResponse;
    }
    return location.hasZSPD;
  }

  hasGovProgramAndGovYearComplete(location: LocationTableItem, govProgramId: number, year: number): boolean {
    if (govProgramId === null && year === null) {
      return this.defaultFilterResponse;
    } else if (govProgramId === null) {
      return !!location.contract.find(c => c.govYearComplete === year);
    } else if (year === null) {
      return !!location.contract.find(c => govProgramId === c.id);
    }
    return !!location.contract.find(c => govProgramId === c.id && year === c.govYearComplete);
  }

  hasParents(location: LocationTableItem, parents: number[]): boolean {
    if (parents.length < 1) {
      return this.defaultFilterResponse;
    }
    return parents.indexOf(location.area.id) !== -1;
  }

  hasCellularOperatorsAndSignalsAndQualities(
    location: LocationTableItem,
    operators: LocationFilter[],
    signals: LocationFilter[],
    allowQuality: Quality[]
  ): boolean {
    if (signals.length < 1 && operators.length < 1 && allowQuality.length < 1) {
      return this.defaultFilterResponse;
    }

    const cellularMap = location.cellular.map((c: CellularIcon) => ({
      quality: c.tc && c.isActive ? c.tc.quality : 'ABSENT',
      operatorId: c.isActive ? c.id : -1,
      operatorName: c.name,
      signalType: c.type,
    }));

    let cellular = [...cellularMap];

    let hasQuality = true;
    if (allowQuality.length > 0) {
      const isSomeTCisGood = cellular.some((cq) => cq.quality === 'GOOD');
      const isAllTCisAbsent = cellular.every((cq) => cq.quality === 'ABSENT');
      const isAllTCisNormal = cellular.every((cq) => cq.quality === 'NORMAL');

      hasQuality =
        (isAllTCisNormal && allowQuality.includes('NORMAL')) ||
        (isSomeTCisGood && allowQuality.includes('GOOD')) ||
        (isAllTCisAbsent && allowQuality.includes('ABSENT'));
    }

    if (operators.length > 0) {
      cellular = cellular.filter(
        ({ operatorId }) => !!operators.find(({ id }) => id === operatorId)
      );
    }

    if (signals.length > 0) {
      cellular = cellular.filter(
        ({ signalType }) =>
          signals.length < 1 ||
          !!signals.find(({ label }) => label === signalType)
      );
    }

    const hasOperatorAndSignal = cellular.length > 0;

    if (allowQuality.includes('NORMAL') && operators.length > 0) {
      return (
        hasOperatorAndSignal &&
        cellular.every((cq) => cq.quality === 'NORMAL') &&
        cellularMap
          .filter(
            ({ operatorId }) => !!operators.find(({ id }) => id !== operatorId)
          )
          .every((cq) => cq.quality === 'NORMAL' || cq.quality === 'ABSENT')
      );
    }

    if (allowQuality.includes('NORMAL') && signals.length > 0) {
      return (
        hasOperatorAndSignal &&
        cellular.every((cq) => cq.quality === 'NORMAL') &&
        cellularMap
          .filter(
            ({ signalType }) => !!signals.find(({ label }) => label !== signalType)
          )
          .every((cq) => cq.quality === 'NORMAL' || cq.quality === 'ABSENT')
      );
    }

    if (allowQuality.includes('ABSENT') && (operators.length > 0 || signals.length > 0)) {
      return hasQuality;
    }

    return hasQuality && hasOperatorAndSignal;
  }

  hasTrunkChannelAndOperators(location: LocationTableItem,
                              operators: LocationFilter[],
                              channels: LocationFilter[]): boolean {
    if (channels.length < 1 && operators.length < 1) {
      return this.defaultFilterResponse;
    }
    if (!(channels.length > 0 && operators.length > 0)) {
      if (channels.length > 0) {
        return this.hasTrunkChannels(location, channels);
      } else if (operators.length > 0) {
        return this.hasByInternetOperators(location, operators);
      }
    }
    const existedOperators = location.internet.filter(c => {
      const operatorIncludedInFilterOperators = operators.find(o => o.id === c.id);
      return !!operatorIncludedInFilterOperators;
    });
    if (existedOperators.length === 0) {
      return false;
    }
    const existedCellular = existedOperators.find(cellularOperator => {
      if (cellularOperator) {
        const existedChannel = channels.find(signal => {
          return cellularOperator.type === signal.label;
        });
        if (existedChannel) {
          return true;
        }
      }
      return false;
    });
    return !!existedCellular;
  }

  hasTrunkChannels(location: LocationTableItem, channels: LocationFilter[]): boolean {
    if (channels.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.internet.find(operator => {
      return !!channels.find(c => c.label === operator.type);
    });
  }

  hasSignals(location: LocationTableItem, signals: LocationFilter[]): boolean {
    if (signals.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.cellular.find(operator => {
      return !!signals.find(c => c.label === operator.type);
    });
  }

  hasCellularOperators(location: LocationTableItem,
                       operators: LocationFilter[]): boolean {
    if (operators.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.cellular
      .filter(operator => operator.isActive)
      .find(operator => !!operators.find(c => c.id === operator.id));
  }

  hasByInternetOperators(location: LocationTableItem,
                         operators: LocationFilter[]): boolean {
    if (operators.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.internet
      .filter(operator => operator.isActive)
      .find(operator => {
        return !!operators.find(c => c.id === operator.id);
      });
  }

  hasPostTypes(location: LocationTableItem, postTypes: any[]): boolean {
    if (postTypes.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.post.find(postIcon => {
      return !!postTypes.find(postType => postType.id === (postIcon.postType ? postIcon.postType.id : null));
    });
  }

  hasTvSignals(location: LocationTableItem, tvSignal: LocationFilter[]): boolean {
    if (tvSignal.length < 1) {
      return this.defaultFilterResponse;
    }
    return !!location.television.find(tv => {
      if (!tv.type) {
        return false;
      }
      return !!tv.type.find(type => {
        return !!tvSignal.find(ts => ts.id === type.id);
      });
    });
  }

  acceptCondition(location: LocationTableItem,
                  state: boolean,
                  condition: (location: LocationTableItem) => boolean): boolean {
    if (state === true) {
      return condition(location);
    } else if (state === false) {
      return !condition(location);
    } else {
      return this.defaultFilterResponse;
    }
  }

  hasInfomat(location: LocationTableItem): boolean {
    return location.infomat
      .filter(tc => tc.isActive)
      .length > 0;
  }

  hasRadio(location: LocationTableItem): boolean {
    return location.radio
      .filter(tc => tc.isActive)
      .length > 0;
  }

  hasAts(location: LocationTableItem): boolean {
    return location.ats
      .filter(tc => tc.isActive)
      .length > 0;
  }

  hasPayphones(location: LocationTableItem): boolean {
    return location.payphone
      .filter(tc => tc.isActive)
      .length > 0;
  }

  hasCellular(location: LocationTableItem): boolean {
    return location.cellular
      .filter(tc => tc.isActive)
      .length > 0;
  }

  hasInternet(location: LocationTableItem): boolean {
    return location.internet
      .filter(tc => tc.isActive)
      .length > 0;
  }

  populationLeftBorder(location: LocationTableItem, border: number): boolean {
    if (border === null) {
      return this.defaultFilterResponse;
    }
    return parseInt(location.population, 10) > border;
  }

  populationRightBorder(location: LocationTableItem, border: number): boolean {
    if (border === null) {
      return this.defaultFilterResponse;
    }
    return parseInt(location.population, 10) < border;
  }

  anyOneFilterSelected(filters: LocationFilters,
                       cellularOperators: any[],
                       internetOperators: any[],
                       signals: any[],
                       channels: any[],
                       postTypes: any[],
                       tvTypes: any[],
                       cellularQuality: any[]): boolean {
    return filters.hasESPD ||
      filters.hasSMO ||
      filters.hasZSPD ||
      (filters.location !== null && filters.location.length > 0) ||
      filters.parent.length > 0 ||
      filters.govProgram !== null ||
      filters.govYear !== null ||
      filters.hasInternet !== null ||
      filters.hasInfomat !== null ||
      filters.populationLeftBorder !== null ||
      filters.populationRightBorder !== null ||
      filters.hasCellular !== null ||
      filters.hasRadio !== null ||
      filters.hasPayphone !== null ||
      filters.hasATS !== null ||
      tvTypes.length > 0 ||
      postTypes.length > 0 ||
      cellularOperators.length > 0 ||
      channels.length > 0 ||
      internetOperators.length > 0 ||
      signals.length > 0 ||
      cellularQuality.length > 0;
  }

  hasCellularQuality(location: LocationTableItem,
                     quality: LocationFilter[]) : boolean {
    if (quality.length < 1) {
      return this.defaultFilterResponse;
    }
    const allowQuality = quality.map(q => q.name.toUpperCase())
    return location.cellular.every(({tc}) => {
      if (!tc) {
        return allowQuality.includes('ABSENT')
      } else {
        allowQuality.includes(tc.quality)
      }
    })
  }
}
