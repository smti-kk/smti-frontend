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
  locationId: string;
  account$: Observable<Account>;
  private subscription: Subscription;

  constructor(private mobileTypeApi: MobileTypeApi,
              private activatedRoute: ActivatedRoute,
              private trunkChannelTypeApi: TrunkChannelTypeApi,
              private accountService: AccountService,
              private tvTypeApi: TvTypeApi,
              private postTypeApi: PostTypeApi,
              private operatorsApi: OperatorsApi,
              private detailLocations: DetailLocations) {
    this.locationId = activatedRoute.snapshot.params.id;
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

  onChange(tcs: TechnicalCapabilityEdition): void {
    console.log(tcs);
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
    console.log(this.tcs);
    this.detailLocations.save(this.tcs, parseInt(this.locationId, 10)).subscribe();
  }
}
