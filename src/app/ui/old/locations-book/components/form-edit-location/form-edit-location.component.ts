import { KrskState } from './../krsk-krai';
import { Location } from './../../../core/models/location';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalityBookPageComponent } from 'src/app/ui/old/locations-book/pages/locality-book-page/locality-book.component';
import { LocationsBookService } from 'src/app/ui/old/locations-book/services/locations-book.service';
import { Subscription } from 'rxjs';
import { LocationCategories } from 'src/app/ui/old/locations-book/interfaces/locations-book.interface';

@Component({
  templateUrl: './form-edit-location.component.html',
  styleUrls: ['./form-edit-location.component.scss'],
})
export class FormEditLocationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  fParents: Location[];
  flocationCategories: LocationCategories[];
  flocationCategoriesFiltered: LocationCategories[];

  locationSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LocalityBookPageComponent>,
    private locationBookService: LocationsBookService,
    @Inject(MAT_DIALOG_DATA)
    public data: { row: any; headerContent: string; canBeParent?: boolean }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: null,
      population: [{value: null, disabled: this.data.canBeParent}],
      parent: [{value: null, disabled: this.data.canBeParent}],
    });

    this.locationSub = this.locationBookService
      .getLocations()
      .subscribe((res) => {
        if (res?.locationCategories && res?.locationParents) {
          this.flocationCategories = res.locationCategories;

          // вручную добавляем Красноярский край
          this.fParents = [...res.locationParents, KrskState];
          if (this.data.canBeParent) {
            this.flocationCategoriesFiltered = this.flocationCategories.filter(
              (item) => item.canBeParent
            );
          } else {
            this.flocationCategoriesFiltered = this.flocationCategories;
          }
        }
      });

    this.form.patchValue(this.data.row);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }
}
