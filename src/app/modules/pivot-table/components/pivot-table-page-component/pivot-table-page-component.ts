import { Component, OnInit } from '@angular/core';
import { FilterTcPivotsService, FilterType } from '../../service/tc-pivots.service';
import { LocationCapabilities, TrunkChannelType } from '@shared/models/location-capabilities';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderingFilter } from '../filter-btn/filter-btn.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss']
})
export class PivotTablePageComponent implements OnInit {

  lcs: LocationCapabilities[];
  TrunkChannelType = TrunkChannelType;
  FilterType = FilterType;

  filterForm: FormGroup;

  constructor(private tcPivots: FilterTcPivotsService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService) {
    this.loadPivots();
    this.buildForm();
  }

  ngOnInit() {
  }

  private loadPivots() {
    this.spinner.show();
    this.tcPivots.list().subscribe(lcs => {
      this.lcs = lcs;
      this.spinner.hide();
    });
  }

  private buildForm() {
    this.filterForm = this.fb.group({
      order: [null],
      hasEspd: [false],
      hasPayphone: [false],
      hasInfomat: [false],
      hasRadio: [false],
      hasTelephone: [false],
      mailType: [null],
      tvType: [null],
      cellular: this.fb.group({
        mts: [false],
        megafone: [false],
        beeline: [false],
        tele2: [false],
        rostelecom: [false]
      }),
      cellularType: [null],
      internet: this.fb.group({
        mts: [false],
        beeline: [false],
        megaphone: [false],
        tele2: [false],
        rostelecom: [false],
        iskra: [false],
        ttk: [false]
      })
    });

    this.filterForm.get('order')
      .valueChanges
      .subscribe((ordering: OrderingFilter) => this.ordering(ordering));
  }

  private ordering(ordering: OrderingFilter) {
    if (ordering) {
      this.tcPivots.addFilterOrdering(ordering.name, ordering.orderingDirection);
    } else {
      this.tcPivots.addFilterOrdering(null, FilterType.UNDEFINED);
    }
    this.loadPivots();
  }
}
