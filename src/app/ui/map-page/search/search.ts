import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationSearchGroup, LocationSearchItem} from '@service/dto/LocationSearchOptions';
import {SearchService} from '@service/location-search/SearchService';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class Search implements OnInit {
  readonly searchControl: FormControl;
  filteredOptions: LocationSearchGroup[];

  @Output()
  selectLocation: EventEmitter<number>;

  constructor(private readonly searchService: SearchService) {
    this.selectLocation = new EventEmitter<number>();
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.subscribe(value => {
      searchService.search(value).subscribe(filterOptions => {
        this.filteredOptions = filterOptions;
      });
    });
  }

  ngOnInit(): void {
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.selectLocation.emit((event.option.value as LocationSearchItem).id);
  }

  getOptionText(option: LocationSearchItem): string {
    if (!option) {
      return '';
    }
    return option.label;
  }
}
