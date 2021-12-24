import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FeatureEditAction} from '@api/dto/FeatureEdit';
import {environment} from '../../../environments/environment';

const ACTIONS = `${environment.API_BASE_URL}/api/simple/actions/`;

@Injectable()
export class ActionTypeService {
  constructor(private httpClient: HttpClient) {}

  getActions() {
    return this.httpClient.get<FeatureEditAction[]>(ACTIONS);
  }
}
