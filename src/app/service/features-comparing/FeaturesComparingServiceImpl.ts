import {Observable} from 'rxjs';
import {FeaturesComparing} from '../dto/FeaturesComparing';
import {FeaturesComparingService} from './FeaturesComparingService';
import {LocationFCApi} from '@api/features-comparing/LocationFCApi';
import {map} from 'rxjs/operators';
import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {CurrentYearService} from '@service/util/CurrentYearService';
import {TechnicalCapabilityType} from "@api/dto/TechnicalCapabilityType";

export class FeaturesComparingServiceImpl implements FeaturesComparingService {
  private readonly currentYear;

  constructor(private readonly api: LocationFCApi,
              private readonly currentYearService: CurrentYearService) {
    this.currentYear = currentYearService.currentYear();
  }

  featuresComparing(type?: TechnicalCapabilityType): Observable<FeaturesComparing[]> {
    return this.api.locations().pipe(
      map(locations => {
        return locations
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
          // .filter(location => {
          //   return location.archive.length > 0 ||
          //     location.planYear.length > 0 ||
          //     location.planTwoYear.length > 0 ||
          //     location.planThreeYear.length > 0;
          // });
      })
    );
  }

  makeItActive(locationId: number, featureId: number): Observable<void> {
    return this.api.makeItActive(locationId, featureId);
  }
}
