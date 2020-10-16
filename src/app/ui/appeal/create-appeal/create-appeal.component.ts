import {Component, Inject, OnInit} from '@angular/core';
import {Operator} from '@api/dto/Operator';
import {MobileType} from '@api/dto/MobileType';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MapLocationsApi} from '@api/locations/MapLocationsApi';
import {map} from 'rxjs/operators';
import {MapLocation} from '@api/dto/MapLocation';
import {AppealReq} from '../../../swagger-api-generated/model/appealReq';
import {AppealRes} from '../../../swagger-api-generated/model/appealRes';

@Component({
  selector: 'app-create-appeal',
  templateUrl: './create-appeal.component.html',
  styleUrls: ['./create-appeal.component.scss']
})
export class CreateAppealComponent implements OnInit {

  appeal: AppealReq;
  operators: Operator[];
  mobileTypes$: Observable<MobileType[]>;
  action: 'EDIT' | 'CREATE';
  locations: MapLocation[];

  constructor(private operatorsApi: OperatorsApi,
              private mobileTypeApi: MobileTypeApi,
              private dialogRef: MatDialogRef<CreateAppealComponent>,
              private mapLocationsApi: MapLocationsApi,
              @Inject(MAT_DIALOG_DATA) public data: AppealRes) {
    if (data) {
      if(data.location) {
        this.appeal = {
          ...data,
          locationId: data.location.id
        }
      }else {
        this.appeal = {
          ...data
        }
      };
      this.action = 'EDIT';
    } else {
      this.appeal = {};
      this.action = 'CREATE';
    }
    this.operatorsApi.findAll().subscribe(operators => {
      this.operators = operators;
    });
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
    this.mobileTypes$ = this.mobileTypeApi.list();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareById(station1: { id: number }, station2: { id: number }): boolean {
    if (station1 === station2) {
      return true;
    }
    if (!station1 || !station2) {
      return false;
    }
    if (station1.id === station2.id) {
      return true;
    }
  }
}
