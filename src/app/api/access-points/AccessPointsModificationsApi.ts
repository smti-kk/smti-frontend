import {Observable} from 'rxjs';
import {AccessPointFromApi} from '../dto/AccessPointFromApi';

export interface AccessPointsModificationsApi {
  /**
   * Список точек, изменившихся после after даты
   * @param after - брать точки, которые изменились после этой даты (формат yyyy-MM-dd HH:mm:ss)
   * @param type тип точки (например, ЕСПД)
   */
  getModifiedAfterDate(after: string, type: string): Observable<AccessPointFromApi[]>;
}

