import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss']
})
export class GroupSelectComponent implements OnInit {
  @Input() items;
  @Input() loc;
  @Input() form: FormGroup;
  @Input() iFormControl: string;

  constructor() {}

  ngOnInit(): void {
  }
}
