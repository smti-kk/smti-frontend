import {Observable, of} from 'rxjs';
import {OrganizationTableRow} from '../dto/OrganizationTableRow';
import {OrganizationService} from './OrganizationService';

export class OrganizationServiceImpl implements OrganizationService {
  list(): Observable<OrganizationTableRow[]> {
    return of([
      {
        id: 1,
        szoType: 'Вук',
        type: 'Вук',
        name: 'Крск112',
        population: '100 100 100',
        area: 'Лондон',
        locationName: 'Лондон',
        connectionPoints: []
      }
    ]);
  }
}
