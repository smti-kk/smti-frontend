import {Observable} from "rxjs";
import {DLocationBase} from "../../api/dto/DLocationBase";
import {DLocationsService} from "./DLocationsService";
import {DLocationBaseApi} from "../../api/locations/DLocationBaseApi";

export class DLocationsServiceImpl implements DLocationsService {
  constructor(private dLocationBaseApi: DLocationBaseApi) {
  }

  all(): Observable<DLocationBase[]> {
    return this.dLocationBaseApi.getAll();
  }
}
