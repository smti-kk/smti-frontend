import {Component, OnDestroy, OnInit} from '@angular/core';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {MobileType} from '@api/dto/MobileType';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {Operators} from '@api/dto/Operators';
import {TcEdition, TechnicalCapabilityEdition} from '@service/dto/TechnicalCapabilityEdition';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {forkJoin, Subscription} from 'rxjs';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {PostTypeApi} from '@api/post-type/PostTypeApi';
import {Signal} from '@api/dto/Signal';
import {PostType} from '@api/dto/PostType';
import {DetailLocations} from '@service/locations/DetailLocations';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '@service/account/AccountService';
import {Account} from '@service/account/Account';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FeatureEdit} from '@api/dto/FeatureEdit';
import {MoveToArchiveDialog} from '../../features-page/move-to-archive-dialog/MoveToArchiveDialog';
import {FeaturesComparingService} from '@service/features-comparing/FeaturesComparingService';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {SelectAreaItem} from '@service/dto/SelectAreaItem';

@Component({
  selector: 'location-page',
  templateUrl: 'location-page.html',
  styleUrls: ['location-page.scss']
})
export class LocationPage implements OnInit, OnDestroy {
  isEdition: boolean;
  mobileTypes: MobileType[];
  internetTypes: TrunkChannelType[];
  operators: Operators;
  tcs: TechnicalCapabilityEdition;
  tvTypes: Signal[];
  postTypes: PostType[];
  locationId: number;
  account$: Observable<Account>;
  archiveRequests: LocationFeatureEditingRequest[];
  planRequests: LocationFeatureEditingRequest[];
  pageArchive = 0;
  pagePlan = 0;
  size = 10;

  private subscription: Subscription;
  isPlanEdition = false;
  isLocationEdition = false;
  selectAreaItem: SelectAreaItem;

  constructor(private mobileTypeApi: MobileTypeApi,
              private activatedRoute: ActivatedRoute,
              private trunkChannelTypeApi: TrunkChannelTypeApi,
              private accountService: AccountService,
              private readonly featuresService: FeaturesComparingService,
              public dialog: MatDialog,
              public httpClient: HttpClient,
              private tvTypeApi: TvTypeApi,
              private postTypeApi: PostTypeApi,
              private operatorsApi: OperatorsApi,
              private readonly requestsService: ApiFeaturesRequests,
              private snackBar: MatSnackBar,
              private detailLocations: DetailLocations) {
    this.locationId = parseInt(activatedRoute.snapshot.params.id, 10);
    this.isEdition = true;
    this.subscription = forkJoin([
      mobileTypeApi.list(),
      operatorsApi.get(),
      trunkChannelTypeApi.list(),
      tvTypeApi.list(),
      postTypeApi.list(),
      detailLocations.location(this.locationId),
    ]).subscribe(([
                    mobileTypes,
                    operators,
                    internetTypes,
                    tvTypes,
                    postTypes,
                    location,
                  ]) => {
      this.mobileTypes = mobileTypes;
      this.operators = operators;
      this.internetTypes = internetTypes;
      this.tvTypes = tvTypes;
      this.postTypes = postTypes;
      this.tcs = location;
      this.selectAreaItem = {id: location.locationParent.id, label: location.locationParent.type + ' ' + location.locationParent.name};
    });
    this.requestsService.archive(this.locationId, this.pageArchive, this.size).subscribe(requests => {
      this.archiveRequests = requests.content;
    });
    this.requestsService.plan(this.locationId, this.pagePlan, this.size).subscribe(requests => {
      this.planRequests = requests.content;
    });
  }

  ngOnInit(): void {
    this.account$ = this.accountService.get();
  }

  onChange(tcs: TechnicalCapabilityEdition): void {
  }

  onAddOrRemoveOperator(event: MatCheckboxChange, tcEdition: TcEdition, operatorId: number): void {
    if (event.checked) {
      tcEdition.add(operatorId, this.locationId);
    } else {
      tcEdition.remove(operatorId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    if (!this.correctChangeGovProg()) {
      this.snackBar.open('При изменении гос/программы должны быть указаны год и наименование программы');
    } else {
      this.detailLocations.save(this.tcs, this.locationId).subscribe(() => {
        window.location.reload();
      }, error => this.snackBar.open('Произошла ошибка, данные не сохранены'));
    }
  }

  correctChangeGovProg(): boolean {
    return this.tcChangeGovProg(this.tcs.cellular) &&
      this.tcChangeGovProg(this.tcs.internet) &&
      this.tcChangeGovProg(this.tcs.tv) &&
      this.tcChangeGovProg(this.tcs.telephone) &&
      this.tcChangeGovProg(this.tcs.post) &&
      this.tcChangeGovProg(this.tcs.payphone) &&
      this.tcChangeGovProg(this.tcs.radio) &&
      this.tcChangeGovProg(this.tcs.infomat);
  }

  tcChangeGovProg(tcs: TcEdition): boolean {
    let result = true;
    Object.values(tcs.tcs).forEach(value => {
      if (!((value.governmentDevelopmentProgram === null || value.governmentDevelopmentProgram === undefined)
        && (value.govYearComplete === null || value.govYearComplete === undefined)
        || value.governmentDevelopmentProgram !== null && value.governmentDevelopmentProgram !== undefined
        && value.govYearComplete !== null && value.govYearComplete !== undefined)) {
        result = false;
      }
    });
    return result;
  }

  hasArchive(request: LocationFeatureEditingRequest): boolean {
    return !!request.featureEdits.find(r => !(r.action === 'UPDATE' && r.newValue && r.newValue.state === 'PLAN'));
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map(tvOrRadioType => tvOrRadioType.name).join(', ');
  }

  onScrollDownArchive(): void {
    this.pageArchive = this.pageArchive + 1;
    this.requestsService.archive(this.locationId, this.pageArchive, this.size).subscribe(requests => {
      this.archiveRequests = [...this.archiveRequests, ...requests.content];
    });
  }

  onScrollDownPlan(): void {
    this.pagePlan = this.pagePlan + 1;
    this.requestsService.plan(this.locationId, this.pagePlan, this.size).subscribe(requests => {
      this.planRequests = [...this.planRequests, ...requests.content];
    });
  }

  approveEdit(edit: FeatureEdit): void {
    const dialogRef = this.dialog.open(MoveToArchiveDialog, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tcId = edit.newValue ? edit.newValue.id : edit.tc.id;
        this.featuresService.makeItActive(this.locationId, tcId).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  deleteLocation(): void {
    this.detailLocations.delete(this.locationId).subscribe(() => {
      window.location.pathname = '/locations';
    });
  }

  reload(): void {
    window.location.reload();
  }

  getUrl(locationId: number, population: number, locationParent: number): string {
    return '/api/detail-locations?id=' + locationId + '&population=' + population + '&area=' + locationParent;
  }
}
