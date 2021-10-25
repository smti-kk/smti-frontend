import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {SearchAddressService} from './search-address.service';

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss'],
})
export class SearchAddressComponent implements OnInit {
  readonly searchControl: FormControl;
  addresses$: Observable<string[]>;

  @Input() control: FormControl;

  @Output() selectAddress: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchAddressService: SearchAddressService) {}

  ngOnInit(): void {
    this.addresses$ = this.control.valueChanges.pipe(
      filter((data) => data.trim().length > 0),
      debounceTime(500),
      switchMap((searchString: string) => this.searchAddressService.search(searchString)),
    );
  }

  setAddressField(value: any) {
    this.control.setValue(value);
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.selectAddress.emit(event.option.value);
  }
}
