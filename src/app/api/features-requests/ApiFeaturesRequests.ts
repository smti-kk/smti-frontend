import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest, LocationFeatureEditingRequestFull} from '../dto/LocationFeatureEditingRequest';
import {Pageable} from '@api/dto/Pageable';

export abstract class ApiFeaturesRequests {
  abstract requests(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequestFull[]>>;
  abstract requestsAndImportsAndEditions(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequestFull[]>>;
  abstract requestsByLocation(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>>;
  abstract archive(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>>;
  abstract plan(locationId: number, page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>>;
  abstract requestsByUser(page: number, size: number): Observable<Pageable<LocationFeatureEditingRequest[]>>;
  abstract accept(reqId: number): Observable<void>;
  abstract decline(reqId: number, comment: string): Observable<void>;
}
