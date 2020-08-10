import {TechnicalCapabilityEdition} from '../dto/TechnicalCapabilityEdition';
import {Observable} from 'rxjs';

export abstract class DetailLocations {
  abstract location(id: string): Observable<TechnicalCapabilityEdition>;
  abstract save(tc: TechnicalCapabilityEdition, locationId: number): Observable<TechnicalCapabilityEdition>;
  abstract sendRequest(tc: TechnicalCapabilityEdition, locationId: number): Observable<TechnicalCapabilityEdition>;
}
