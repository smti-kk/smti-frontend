import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-internet-clarification',
  templateUrl: './internet-clarification.component.html',
  styleUrls: ['./internet-clarification.component.scss']
})
export class InternetClarificationComponent implements OnInit {

  readonly PROVIDERS = ['Билайн', 'Мегафон'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({});

    this.createProviders(this.PROVIDERS);
  }

  createProviders(providers: string[]) {
    return providers.map(provider => {
      return this.form.addControl(provider, this.fb.group({
        isActive: [false],
        type: [],
        quality: []
      }));
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
