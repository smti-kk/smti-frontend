import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
})
export class SimpleSelectComponent implements OnInit {
  @Input() items;
  @Input() form: FormGroup;
  @Input() iFormControl: string;

  constructor() { }

  ngOnInit() {
  }
}
