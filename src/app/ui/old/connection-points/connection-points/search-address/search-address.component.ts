import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {SearchAddressService} from './search-address.service';

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss'],
})
export class SearchAddressComponent implements OnInit {
  readonly searchControl: FormControl;
  addresses$: Observable<string[]>;

  @Output() selectAddress: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchAddressService: SearchAddressService) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.addresses$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((searchString: string) => {
        if (!searchString) {
          this.selectAddress.emit(null);
          return of(null);
        }
        return this.searchAddressService.search(searchString);
      }),
    );
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.selectAddress.emit(event.option.value);
  }
}
