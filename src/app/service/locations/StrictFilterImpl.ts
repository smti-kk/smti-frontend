import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationFilter, LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {StrictFilter} from './StrictFilter';

export class StrictFilterImpl extends StrictFilter {
  filter(locations: LocationTableItem[], locationFilters: LocationFilters): LocationTableItem[] {
    const cellularOperators = locationFilters.cellularOperators.filter(o => o.isSelected);
    const internetOperators = locationFilters.internetOperators.filter(o => o.isSelected);
    const signals = locationFilters.signalLevel.filter(s => s.isSelected);
    const channels = locationFilters.connectionType.filter(ct => ct.isSelected);
    console.log(123);
    if (locationFilters.location && locationFilters.location.length > 0) {
      locations = this.filterByLocation(locations, locationFilters.location);
    }
    if (locationFilters.hasESPD) {
      locations = this.filterByHasESPD(locations);
    }
    if (locationFilters.hasSMO) {
      locations = this.filterByHasSMO(locations);
    }
    if (locationFilters.hasRSZO) {
      locations = this.filterByHasRSZO(locations);
    }
    if (locationFilters.hasZSPD) {
      locations = this.filterByHasZSPD(locations);
    }
    if (locationFilters.govProgram && locationFilters.govProgram.length > 0) {
      locations = this.filterByGovPrograms(locations, locationFilters.govProgram);
    }
    if (locationFilters.parent && locationFilters.parent.length > 0) {
      locations = this.filterByParents(locations, locationFilters.parent);
    }
    if (signals.length > 0 && cellularOperators.length > 0) {
      locations = this.filterBySignalsAndOperators(locations, cellularOperators, signals);
    } else {
      if (signals.length > 0) {
        locations = this.filterBySignal(locations, signals);
      }
      if (cellularOperators.length > 0) {
        locations = this.filterByCellularOperators(locations, cellularOperators);
      }
    }
    console.log(123);
    if (channels.length > 0 && internetOperators.length > 0) {
      locations = this.filterByTrunkChannelAndOperators(locations, internetOperators, channels);
    } else {
      if (channels.length > 0) {
        locations = this.filterByTrunkChannel(locations, channels);
      }
      if (internetOperators.length > 0) {
        locations = this.filterByInternetOperators(locations, internetOperators);
      }
    }
    return locations;
  }

  filterByLocation(locations: LocationTableItem[], location: string): LocationTableItem[] {
    if (location === null || location === '') {
      return locations;
    }
    return locations.filter((l) => l.name.toLowerCase().includes(location.toLowerCase()));
  }

  filterByHasESPD(locations: LocationTableItem[]): LocationTableItem[] {
    return locations.filter(l => {
      if (l.hasESPD) {
        return true;
      }
    });
  }

  filterByHasSMO(locations: LocationTableItem[]): LocationTableItem[] {
    return locations.filter(l => {
      if (l.hasSMO) {
        return true;
      }
    });
  }

  filterByHasRSZO(locations: LocationTableItem[]): LocationTableItem[] {
    return locations.filter(l => {
      if (l.hasRSZO) {
        return true;
      }
    });
  }

  filterByHasZSPD(locations: LocationTableItem[]): LocationTableItem[] {
    return locations.filter(l => {
      if (l.hasZSPD) {
        return true;
      }
    });
  }

  filterByGovPrograms(locations: LocationTableItem[], govProgramIds: number[]): LocationTableItem[] {
    return locations.filter(l => {
      let result = true;
      govProgramIds.forEach(gpi => {
        const exists = l.contract.find(gp => gpi === gp.id);
        if (!exists) {
          result = false;
          return;
        }
      });
      return result;
    });
  }

  filterByParents(locations: LocationTableItem[], parents: number[]): LocationTableItem[] {
    return locations.filter(l => {
      return parents.indexOf(l.area.id) !== -1;
    });
  }

  filterBySignalsAndOperators(locations: LocationTableItem[],
                              operators: LocationFilter[],
                              signals: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      const existedOperators = l.cellular.filter(c => {
        const operatorIncludedInFilterOperators = operators.find(o => o.id === c.id);
        return !!operatorIncludedInFilterOperators;
      });
      if (existedOperators.length === 0) {
        return false;
      }
      const existedCellular = existedOperators.find(cellularOperator => {
        if (cellularOperator) {
          const existedSignal = signals.find(signal => {
            return cellularOperator.type === signal.label;
          });
          if (existedSignal) {
            return true;
          }
        }
        return false;
      });
      return !!existedCellular;
    });
  }

  filterByTrunkChannelAndOperators(locations: LocationTableItem[],
                                   operators: LocationFilter[],
                                   channels: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      const existedOperators = l.internet.filter(c => {
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
    });
  }

  filterByTrunkChannel(locations: LocationTableItem[],
                       channels: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      return !!l.internet.find(operator => {
        return !!channels.find(c => c.label === operator.type);
      });
    });
  }

  filterBySignal(locations: LocationTableItem[],
                 signals: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      return !!l.cellular.find(operator => {
        return !!signals.find(c => c.label === operator.type);
      });
    });
  }

  filterByCellularOperators(locations: LocationTableItem[],
                            operators: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      return !!l.cellular
        .filter(operator => operator.isActive)
        .find(operator => {
          return !!operators.find(c => c.id === operator.id);
        });
    });
  }

  filterByInternetOperators(locations: LocationTableItem[],
                            operators: LocationFilter[]): LocationTableItem[] {
    return locations.filter(l => {
      return !!l.internet
        .filter(operator => operator.isActive)
        .find(operator => {
          return !!operators.find(c => c.id === operator.id);
        });
    });
  }
}
