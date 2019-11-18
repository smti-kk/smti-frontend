import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


export class BaseFormComponent<T> {
  @Output() formValue: EventEmitter<T> = new EventEmitter<T>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
}

interface InternetClarification {
  isActive: boolean;
  type: string;
  quality: string;
  name: string;
}

@Component({
  selector: 'app-internet-clarification',
  templateUrl: './internet-clarification.component.html',
  styleUrls: ['./internet-clarification.component.scss']
})
export class InternetClarificationComponent extends BaseFormComponent<InternetClarification> implements OnInit {
  form: FormGroup;

  private readonly PROVIDERS = ['Билайн', 'Мегафон'];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      internet: this.fb.array([])
    });

    this.createProviders(this.PROVIDERS).forEach(provider => {
      this.internet.push(provider);
    });
  }

  get internet(): FormArray {
    return this.form.get('internet') as FormArray;
  }

  private createProviders(providers: string[]) {
    return providers.map(provider => {
      return this.fb.group({
        provider: this.fb.group({
          isActive: [false],
          name: [provider],
          icon: ['']
        }),
        type: [],
        quality: []
      });
    });
  }

  /*
  {
        provider: {
          isActive: true,
          name: internetItem.operator.name,
          icon: internetItem.operator.icon
        },
        type: internetItem.type_trunkchannel.name === 'медный кабель' ? 'медь' : internetItem.type_trunkchannel.name,
        quality: ''
      };
   */
}
