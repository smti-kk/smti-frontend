import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-technical-capabilities',
  templateUrl: './technical-capabilities.component.html',
  styleUrls: ['./technical-capabilities.component.scss']
})
export class TechnicalCapabilitiesComponent implements OnInit {

  tcForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tcForm = fb.group({});
  }

  ngOnInit() {
  }

}
