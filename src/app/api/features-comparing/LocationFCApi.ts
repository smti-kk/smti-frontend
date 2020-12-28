import {Observable} from 'rxjs';
import {LocationFC} from '../dto/LocationFC';
import {Pageable} from '@api/dto/Pageable';
import {LocationOrdering} from '@api/features-comparing/LocationFCApiImpl';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';

export abstract class LocationFCApi {
  abstract locations(page: number, size: number): Observable<Pageable<LocationFC[]>>;

  abstract locationsFiltered(page: number,
                             size: number,
                             type: TechnicalCapabilityType,
                             ordering?: LocationOrdering,
                             parentIds?: number[],
                             locationName?: string | string[],
                             internetOperators?: number[],
                             connectionTypes?: number[],
                             govProgram?: number,
                             govProgramYear?: number,
                             hasAnyInternet?: boolean): Observable<Pageable<LocationFC[]>>;

  abstract locationsExportExcel(type: TechnicalCapabilityType,
                                ordering?: LocationOrdering,
                                parentIds?: number[],
                                locationName?: string | string[],
                                internetOperators?: number[],
                                connectionTypes?: number[],
                                govProgram?: number,
                                govProgramYear?: number,
                                hasAnyInternet?: boolean): Observable<void>;

  abstract makeItActive(locationId: number, featureId: number): Observable<void>;
}
