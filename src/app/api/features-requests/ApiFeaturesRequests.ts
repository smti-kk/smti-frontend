import {Observable} from 'rxjs';
import {LocationFeatureEditingRequest, LocationFeatureEditingRequestFull} from '../dto/LocationFeatureEditingRequest';

export abstract class ApiFeaturesRequests {
  abstract requests(): Observable<LocationFeatureEditingRequestFull[]>;
  abstract requestsByLocation(locationId: number): Observable<LocationFeatureEditingRequest[]>;
  abstract archive(locationId: number): Observable<LocationFeatureEditingRequest[]>;
  abstract plan(locationId: number): Observable<LocationFeatureEditingRequest[]>;
  abstract requestsByUser(): Observable<LocationFeatureEditingRequest[]>;
  abstract accept(reqId: number): Observable<void>;
  abstract decline(reqId: number, comment: string): Observable<void>;
}
