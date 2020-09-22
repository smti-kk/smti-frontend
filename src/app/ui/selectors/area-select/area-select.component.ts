import {AfterViewInit, Component, forwardRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SelectAreaItem} from '@service/dto/SelectAreaItem';
import {interval, ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounce, take, takeUntil} from 'rxjs/operators';
import {SelectAreasService} from "@service/area/SelectAreasService";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AreaSelectComponent),
  multi: true
};

@Component({
  selector: 'app-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AreaSelectComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  areas: SelectAreaItem[];
  filteredAreas: ReplaySubject<SelectAreaItem[]> = new ReplaySubject<SelectAreaItem[]>(1);
  bankMultiCtrl: FormControl = new FormControl();
  bankMultiFilterCtrl: FormControl = new FormControl();
  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect;
  protected onDestroy = new Subject<void>();
  private onChange: (areaId: number) => void;

  constructor(private areasService: SelectAreasService) {
  }

  ngOnInit(): void {
    this.areasService.areas().subscribe(areas => {
      this.areas = areas;
      this.filteredAreas.next(this.areas.slice());
      this.bankMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterBanksMulti();
        });
    });
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean): void {
    this.filteredAreas.pipe(
      take(1),
      takeUntil(this.onDestroy)
    )
      .subscribe(val => {
        if (selectAllValue) {
          this.bankMultiCtrl.patchValue(val);
        } else {
          this.bankMultiCtrl.patchValue([]);
        }
      });
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue(): void {
    // this.filteredAreas
    //   .pipe(take(1), takeUntil(this.onDestroy))
    //   .subscribe(() => {
    //     this.multiSelect.compareWith = (a: SelectAreaItem, b: SelectAreaItem) => a && b && a.id === b.id;
    //   });
  }

  protected filterBanksMulti(): void {
    if (!this.areas) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredAreas.next(this.areas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredAreas.next(
      this.areas.filter(area => area.label.toLowerCase().indexOf(search) > -1)
    );
  }

  registerOnChange(fn: (areaId: number) => void): void {
    this.onChange = fn;
    this.bankMultiCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestroy),
        debounce(() => interval(500))
      )
      .subscribe(areaId => {
        this.onChange(areaId);
      });
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.bankMultiCtrl.disable();
    } else {
      this.bankMultiCtrl.enable();
    }
  }

  writeValue(obj: number): void {
    this.bankMultiCtrl.setValue(obj);
  }

}
