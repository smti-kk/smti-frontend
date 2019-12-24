import {autoserializeAs} from 'cerialize';
import {Data} from '@angular/router';

export class Avstatus {

    @autoserializeAs('id')
    private readonly _id: number;

    @autoserializeAs('available')
    private readonly _available: boolean;

    @autoserializeAs('medium_speed_per_hour')
    private readonly _mediumSpeedPerHour: number;

    @autoserializeAs(Date, 'time_mark')
    private readonly _timeMark: Date;

    @autoserializeAs('access_point')
    private readonly _accessPointId: number;


    get id(): number {
        return this._id;
    }

    get available(): boolean {
        return this._available;
    }

    get mediumSpeedPerHour(): number {
        return this._mediumSpeedPerHour;
    }

    get timeMark(): Data {
        return this._timeMark;
    }

    get accessPointId(): number {
        return this._accessPointId;
    }

    toString() {
      if (this.available) {
        return 'Доступно';
      } else {
        return 'Недоступно';
      }
    }
}
