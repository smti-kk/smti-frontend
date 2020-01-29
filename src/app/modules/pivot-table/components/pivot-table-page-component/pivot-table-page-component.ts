import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FilterTcPivotsService, OrderingDirection} from '@core/services/tc-pivots.service';
import {
  ExistingOperators,
  GovernmentProgram,
  LocationFeatures,
  MailType,
  MobileGeneration,
  Operator,
  PaginatedList,
  TrunkChannel,
} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EnumService, GovernmentProgramService} from '@core/services';
import {forkJoin, Subscription} from 'rxjs';
import {debounceTime, filter, tap} from 'rxjs/operators';
import {Signal} from '@core/models/signal';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss'],
})
export class PivotTablePageComponent implements OnInit, AfterViewInit {
  locationFeatures: PaginatedList<LocationFeatures>;
  existingOperators: ExistingOperators;
  govPrograms: GovernmentProgram[];
  pageNumber = 1;
  itemsPerPage = 10;
  isOpenedAccordion = false;
  searchControl: FormControl;
  searchedTc: LocationFeatures;
  displayBlockSearch = true;

  TrunkChannel = TrunkChannel;
  OrderingDirection = OrderingDirection;
  Signal = Signal;
  MailType = MailType;
  MobileGeneration = MobileGeneration;

  internetProviders: Operator[];
  mobileProviders: Operator[];

  filterForm: FormGroup;
  private observer: Subscription;

  constructor(
    public tcPivots: FilterTcPivotsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private govProgramsService: GovernmentProgramService,
    private enumService: EnumService
  ) {
    this.buildForm();
    this.buildSearchControl();

    forkJoin(
      this.loadPivotsTable(),
      this.loadGovPrograms(),
      this.loadInternetProviders(),
      this.loadMobileProviders(),
      this.loadExistingOperators()
    ).subscribe(() => {
      this.observer = this.filterForm.valueChanges.subscribe(value => {
        this.tcPivots.filter(value);
        this.loadPivotsTable().subscribe();
      });
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    window.addEventListener('keydown', e => {
      // tslint:disable-next-line:no-magic-numbers
      if (e.ctrlKey && (e.key === 'f' || e.key === 'а')) {
        this.displayBlockSearch = false;
        const searchControl = document.getElementById('searchControl');
        if (searchControl) {
          searchControl.focus();
          e.preventDefault();
        }
      }
    });
  }

  onSearchInputFocusOut() {
    this.searchedTc = null;
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadPivotsTable().subscribe();
  }

  onSearchControlKeyPress(event) {
    if (event.key === 'Escape') {
      event.target.blur();
      this.searchControl.reset();
      this.displayBlockSearch = true;
    }
  }

  loadPivotsTable() {
    this.spinner.show();
    return this.tcPivots.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(lcs => {
        this.locationFeatures = lcs;
        console.log(lcs);
        this.spinner.hide();
      })
    );
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
      mobileType: [null],
      internetType: [null],
      program: [null],
      locationName: [null],
    });
  }

  private loadGovPrograms() {
    return this.govProgramsService
      .list()
      .pipe(tap(govPrograms => (this.govPrograms = govPrograms)));
  }

  private loadInternetProviders() {
    return this.enumService.getInternetProvider().pipe(
      tap(response => {
        this.internetProviders = response;

        const internetArrayControl = this.fb.array([]);
        response.forEach(provider => {
          internetArrayControl.push(
            this.fb.group({
              [provider.id]: false,
            })
          );
        });

        this.filterForm.addControl('internet', internetArrayControl);
      })
    );
  }

  private loadMobileProviders() {
    return this.enumService.getMobileProvider().pipe(
      tap(response => {
        this.mobileProviders = response;

        const mobileArrayControl = this.fb.array([]);

        response.forEach(provider => {
          mobileArrayControl.push(
            this.fb.group({
              [provider.id]: false,
            })
          );
        });

        this.filterForm.addControl('mobile', mobileArrayControl);
      })
    );
  }

  private buildSearchControl() {
    const DEBOUNCE_TIME_MS = 50;
    this.searchControl = this.fb.control(null);
    this.searchControl.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME_MS))
      .pipe(filter(value => value && value.length > 0))
      .subscribe(value => {
        this.searchedTc = this.locationFeatures.results.find(lc =>
          lc.location.name.toLowerCase().includes(value.toLowerCase())
        );
        const lcIndex = this.locationFeatures.results.indexOf(this.searchedTc) + 1;
        this.pageNumber = Math.ceil(lcIndex / this.itemsPerPage);

        if (this.searchedTc) {
          this.displayBlockSearch = false;
          const lcElement = document.getElementById(this.searchedTc.location.id.toString());
          if (lcElement) {
            lcElement.scrollIntoView({block: 'center'});
          }
        }
      });
  }

  private loadExistingOperators() {
    return this.enumService
      .getExistingOperators()
      .pipe(tap(response => (this.existingOperators = response)));
  }
}
