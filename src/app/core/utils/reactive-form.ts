import {FormArray, FormGroup} from '@angular/forms';

export const getArrayGroup = (form: FormGroup, name: string): FormArray => {
  return form.get(name) as FormArray;
};
