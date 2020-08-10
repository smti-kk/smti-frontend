import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MobileType} from '@api/dto/MobileType';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {Operators} from '@api/dto/Operators';
import {TcEdition, TechnicalCapabilityEdition} from '@service/dto/TechnicalCapabilityEdition';
import {Signal} from '@api/dto/Signal';
import {PostType} from '@api/dto/PostType';
import {Account} from '@service/account/Account';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';
import {forkJoin, Subscription} from 'rxjs';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {ActivatedRoute} from '@angular/router';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {AccountService} from '@service/account/AccountService';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {PostTypeApi} from '@api/post-type/PostTypeApi';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DetailLocations} from '@service/locations/DetailLocations';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mun-request',
  templateUrl: './mun-request.component.html',
  styleUrls: ['./mun-request.component.scss']
})
export class MunRequestComponent implements OnInit, OnDestroy {

  isEdition: boolean;
  mobileTypes: MobileType[];
  internetTypes: TrunkChannelType[];
  operators: Operators;
  tcs: TechnicalCapabilityEdition;
  tvTypes: Signal[];
  postTypes: PostType[];
  locationId: string;
  account$: Observable<Account>;
  archiveRequests: LocationFeatureEditingRequest[];
  private subscription: Subscription;

  constructor(private mobileTypeApi: MobileTypeApi,
              private activatedRoute: ActivatedRoute,
              private trunkChannelTypeApi: TrunkChannelTypeApi,
              private accountService: AccountService,
              private tvTypeApi: TvTypeApi,
              private postTypeApi: PostTypeApi,
              private operatorsApi: OperatorsApi,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<MunRequestComponent>,
              @Inject(MAT_DIALOG_DATA) locationId: number,
              private detailLocations: DetailLocations) {
    this.locationId = `${locationId}`;
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
    });
  }

  ngOnInit(): void {
    this.account$ = this.accountService.get();
  }

  onAddOrRemoveOperator(event: MatCheckboxChange, tcEdition: TcEdition, operatorId: number): void {
    if (event.checked) {
      tcEdition.add(operatorId, parseInt(this.locationId, 10));
    } else {
      tcEdition.remove(operatorId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.detailLocations.save(this.tcs, parseInt(this.locationId, 10)).subscribe(() => {
      window.location.reload();
    }, error => this.snackBar.open('Произошла ошибка, данные не сохранены'));
  }

  hasArchive(request: LocationFeatureEditingRequest): boolean {
    return !!request.featureEdits.find(r => !(r.action === 'UPDATE' && r.newValue && r.newValue.state === 'PLAN'));
  }
}
