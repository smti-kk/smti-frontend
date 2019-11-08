import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


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

    this.form = this.fb.group({});

    this.createProviders(this.PROVIDERS);
  }

  private createProviders(providers: string[]) {
    return providers.map(provider => {
      return this.form.addControl(provider, this.fb.group({
        isActive: [false],
        type: [],
        quality: []
      }));
    });
  }
}
