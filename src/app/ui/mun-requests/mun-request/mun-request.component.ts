import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {LocationFeatureEditingRequest} from '@api/dto/LocationFeatureEditingRequest';
import {MobileType} from '@api/dto/MobileType';
import {Operators} from '@api/dto/Operators';
import {PostType} from '@api/dto/PostType';
import {Signal} from '@api/dto/Signal';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {PostTypeApi} from '@api/post-type/PostTypeApi';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {Account} from '@service/account/Account';
import {AccountService} from '@service/account/AccountService';
import {TcEdition, TechnicalCapabilityEdition} from '@service/dto/TechnicalCapabilityEdition';
import {DetailLocations} from '@service/locations/DetailLocations';
import {forkJoin, Subscription} from 'rxjs';

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
  locationId: number;
  account$: Observable<Account>;
  archiveRequests: LocationFeatureEditingRequest[];
  comm = new FormControl();
  
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
    this.locationId = locationId;
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
    this.comm.setValue('');
  }

  ngOnInit(): void {
    this.account$ = this.accountService.get();
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
    this.detailLocations.saveWithComment(this.tcs, this.locationId, this.comm.value.substr(0, 255)).subscribe(() => {
      window.location.reload();
    }, error => this.snackBar.open('Произошла ошибка, данные не сохранены'));
  }

  hasArchive(request: LocationFeatureEditingRequest): boolean {
    return !!request.featureEdits.find(r => !(r.action === 'UPDATE' && r.newValue && r.newValue.state === 'PLAN'));
  }
}
