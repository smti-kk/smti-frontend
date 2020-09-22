import {Component, Inject, OnInit} from '@angular/core';
import {Operator} from '@api/dto/Operator';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TrunkChannel} from '@api/dto/TrunkChannel';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {MapLocationsApi} from '@api/locations/MapLocationsApi';
import {TrunkChannelType} from '@api/dto/TrunkChannelType';
import {MapLocation} from '@api/dto/MapLocation';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-create-trunk-channel',
  templateUrl: './create-trunk-channel.component.html',
  styleUrls: ['./create-trunk-channel.component.scss']
})
export class CreateTrunkChannelComponent implements OnInit {

  trunkChannel: TrunkChannel;
  operators$: Observable<Operator[]>;
  trunkChannelTypes$: Observable<TrunkChannelType[]>;
  action: 'EDIT' | 'CREATE';
  locations: MapLocation[];
  govPrograms$: Observable<GovProgram[]>;

  constructor(private operatorsApi: OperatorsApi,
              private trunkChannelTypeApi: TrunkChannelTypeApi,
              private mapLocationsApi: MapLocationsApi,
              private govProgramService: GovProgramService,
              private dialogRef: MatDialogRef<CreateTrunkChannelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrunkChannel) {
    if (data) {
      this.trunkChannel = {...data};
      this.action = 'EDIT';
    } else {
      this.trunkChannel = {
        locationStart: null,
        locationEnd: null,
        commissioning: null,
        completed: null,
        decommissioning: null,
        id: null,
        operator: null,
        program: null,
        typeTrunkChannel: null
      };
      this.action = 'CREATE';
    }
    this.mapLocationsApi.getLocations().pipe(
      map(l => l.sort((l1, l2) => {
        if (l1.name > l2.name) {
          return 1;
        } else {
          return -1;
        }
      }))
    ).subscribe(locations => this.locations = locations);
  }

  ngOnInit(): void {
    this.operators$ = this.operatorsApi.findAll();
    this.trunkChannelTypes$ = this.trunkChannelTypeApi.list();
    this.govPrograms$ = this.govProgramService.list();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareById(station1: { id: number }, station2: { id: number }): boolean {
    if (station1 === station2) {
      return true;
    }
    if (station1 === null || station2 === null) {
      return false;
    }
    if (station1.id === station2.id) {
      return true;
    }
  }
}
