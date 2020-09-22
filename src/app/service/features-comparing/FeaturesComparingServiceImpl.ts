import {Observable} from 'rxjs';
import {FeaturesComparing} from '../dto/FeaturesComparing';
import {FeaturesComparingService} from './FeaturesComparingService';
import {LocationFCApi} from '@api/features-comparing/LocationFCApi';
import {map} from 'rxjs/operators';
import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {CurrentYearService} from '@service/util/CurrentYearService';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {LocationFC} from '@api/dto/LocationFC';
import {Pageable} from '@api/dto/Pageable';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {OrderingToApi} from '@service/features-comparing/OrderingToApi';

export class FeaturesComparingServiceImpl implements FeaturesComparingService {
  private readonly currentYear;

  constructor(private readonly api: LocationFCApi,
              private readonly currentYearService: CurrentYearService) {
    this.currentYear = currentYearService.currentYear();
  }

  featuresComparing(page: number,
                    size: number,
                    type: TechnicalCapabilityType): Observable<Pageable<FeaturesComparing[]>> {
    return this.api.locations(page, size).pipe(
      map(locations => {
        return this.groupLocations(locations, type);
      })
    );
  }

  featuresComparingFiltered(page: number,
                            size: number,
                            type: TechnicalCapabilityType,
                            filters: LocationFilters): Observable<Pageable<FeaturesComparing[]>> {
    if (!filters) {
      return this.featuresComparing(page, size, type);
    }
    const orderingFilter = new OrderingToApi(filters.ordering).toString();
    let operators;
    let connectionTypes;
    if (type === 'INET') {
      operators = filters.internetOperators.filter(io => io.isSelected).map(io => io.id);
      connectionTypes = filters.connectionType.filter(ip => ip.isSelected).map(ip => ip.id);
    }
    if (type === 'MOBILE') {
      operators = filters.cellularOperators.filter(io => io.isSelected).map(io => io.id);
      connectionTypes = filters.signalLevel.filter(ip => ip.isSelected).map(ip => ip.id);
    }
    return this.api.locationsFiltered(
      page,
      size,
      type,
      orderingFilter,
      filters.parent,
      filters.location,
      operators,
      connectionTypes,
      filters.govProgram,
      filters.govYear,
      filters.hasInternet
    ).pipe(
      map(locations => {
        return this.groupLocations(locations, type);
      })
    );
  }

  featuresComparingExportExcel(type: TechnicalCapabilityType,
                               filters: LocationFilters): Observable<void> {
    if (!filters) {
      return this.api.locationsExportExcel(type);
    }
    const orderingFilter = new OrderingToApi(filters.ordering).toString();
    let operators;
    let connectionTypes;
    if (type === 'INET') {
      operators = filters.internetOperators.filter(io => io.isSelected).map(io => io.id);
      connectionTypes = filters.connectionType.filter(ip => ip.isSelected).map(ip => ip.id);
    }
    if (type === 'MOBILE') {
      operators = filters.cellularOperators.filter(io => io.isSelected).map(io => io.id);
      connectionTypes = filters.signalLevel.filter(ip => ip.isSelected).map(ip => ip.id);
    }
    return this.api.locationsExportExcel(
      type,
      orderingFilter,
      filters.parent,
      filters.location,
      operators,
      connectionTypes,
      filters.govProgram,
      filters.govYear,
      filters.hasInternet
    );
  }

  makeItActive(locationId: number, featureId: number): Observable<void> {
    return this.api.makeItActive(locationId, featureId);
  }

  groupLocations(locations: Pageable<LocationFC[]>, type: TechnicalCapabilityType): Pageable<FeaturesComparing[]> {
    const content = locations.content
      .map(location => {
        const archive: FCTechnicalCapability[] = [];
        const planYear: FCTechnicalCapability[] = [];
        const planTwoYear: FCTechnicalCapability[] = [];
        const planThreeYear: FCTechnicalCapability[] = [];
        const active: FCTechnicalCapability[] = [];
        location.technicalCapabilities
          .filter(tc => type ? (tc.type === type) : (tc.type === 'MOBILE' || tc.type === 'INET'))
          .forEach(tc => {
            if (tc.state === 'ARCHIVE') {
              archive.push(tc);
            } else if (tc.state === 'PLAN' && tc.govYearComplete === this.currentYear) {
              planYear.push(tc);
            } else if (tc.state === 'PLAN' && tc.govYearComplete === this.currentYear + 1) {
              planTwoYear.push(tc);
            } else if (tc.state === 'PLAN' && tc.govYearComplete === this.currentYear + 2) {
              planThreeYear.push(tc);
            } else if (tc.state === 'ACTIVE') {
              active.push(tc);
            }
          });
        return {
          id: location.id,
          locationParent: location.locationParent,
          name: location.name,
          type: location.type,
          population: location.population,
          archive,
          planYear,
          planTwoYear,
          planThreeYear,
          active
        };
      });
    return {
      content,
      totalElements: locations.totalElements
    };
    // .filter(location => {
    //   return location.archive.length > 0 ||
    //     location.planYear.length > 0 ||
    //     location.planTwoYear.length > 0 ||
    //     location.planThreeYear.length > 0;
    // });
  }
}
