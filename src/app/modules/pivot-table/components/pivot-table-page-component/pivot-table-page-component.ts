import {Component} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormGroup} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {EnumService, GovernmentProgramService} from '@core/services';
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
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {Signal} from '@core/models/signal';
import {FilterTcPivotsService} from '@core/services/filter-tc-pivots.service';

@Component({
  selector: 'app-pivot-table-page-component',
  templateUrl: './pivot-table-page-component.html',
  styleUrls: ['./pivot-table-page-component.scss'],
})
export class PivotTablePageComponent {
  locationFeatures: PaginatedList<LocationFeatures>;

  existingOperators: ExistingOperators;

  govPrograms: GovernmentProgram[];

  pageNumber = 1;

  itemsPerPage = 10;

  isOpenedAccordion = false;

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

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadPivotsTable().subscribe();
  }

  loadPivotsTable(): Observable<PaginatedList<LocationFeatures>> {
    this.spinner.show();
    return this.tcPivots.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(lcs => {
        this.locationFeatures = lcs;
        this.spinner.hide();
      })
    );
  }

  private buildForm(): void {
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

  private loadGovPrograms(): Observable<GovernmentProgram[]> {
    return this.govProgramsService.list().pipe(
      tap(govPrograms => {
        this.govPrograms = govPrograms;
      })
    );
  }

  private loadProviders(
    operators$: Observable<Operator[]>,
    controlName: string
  ): Observable<Operator[]> {
    return operators$.pipe(
      tap(response => {
        const control = this.fb.array([]);
        response.forEach(provider => {
          control.push(
            this.fb.group({
              [provider.id]: false,
            })
          );
        });

        this.filterForm.addControl(controlName, control);
      })
    );
  }

  private loadInternetProviders(): Observable<Operator[]> {
    return this.loadProviders(this.enumService.getInternetProvider(), 'internet').pipe(
      tap(response => {
        this.internetProviders = response;
      })
    );
  }

  private loadMobileProviders(): Observable<Operator[]> {
    return this.loadProviders(this.enumService.getMobileProvider(), 'mobile').pipe(
      tap(response => {
        this.mobileProviders = response;
      })
    );
  }

  private loadExistingOperators(): Observable<ExistingOperators> {
    return this.enumService.getExistingOperators().pipe(
      tap(response => {
        this.existingOperators = response;
      })
    );
  }
}
