import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationCapabilities } from '../../../shared/model/LocationCapabilities';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'marker-info-control',
  templateUrl: './marker-info-control.component.html',
  styleUrls: ['./marker-info-control.component.scss']
})
export class MarkerInfoControlComponent implements OnInit {
  @Input() location: LocationCapabilities;
  @Input() locations: any[];
  @Output() selectLocation: EventEmitter<any> = new EventEmitter<any>();
  searchForm = this.fb.group({
    area: []
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSelectLocation() {
    this.selectLocation.emit(this.searchForm.value.area);
  }
}
