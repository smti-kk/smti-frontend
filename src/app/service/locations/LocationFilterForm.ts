import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

export abstract class LocationFilterFormBuilder {
  abstract build(): Observable<FormGroup>;
}

