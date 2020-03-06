import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {BaseFormComponent} from './base-form.component';

interface InternetClarification {
  isActive: boolean;
  type: string;
  quality: string;
  name: string;
}

@Component({
  selector: 'app-internet-clarification',
  templateUrl: './internet-clarification.component.html',
  styleUrls: ['./internet-clarification.component.scss'],
})
export class InternetClarificationComponent extends BaseFormComponent<InternetClarification>
  implements OnInit {
  form: FormGroup;

  private readonly PROVIDERS = ['Билайн', 'Мегафон'];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      internet: this.fb.array([]),
    });

    this.createProviders(this.PROVIDERS).forEach(provider => {
      this.internet.push(provider);
    });
  }

  get internet(): FormArray {
    return this.form.get('internet') as FormArray;
  }

  private createProviders(providers: string[]): FormGroup[] {
    return providers.map(provider => {
      return this.fb.group({
        provider: this.fb.group({
          isActive: [false],
          name: [provider],
          icon: [''],
        }),
        type: [],
        quality: [],
      });
    });
  }
}
