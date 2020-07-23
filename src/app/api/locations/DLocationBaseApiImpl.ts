import {Observable} from "rxjs";
import {DLocationBase} from "../dto/DLocationBase";
import {DLocationBaseApi} from "./DLocationBaseApi";
import {HttpClient} from "@angular/common/http";
import {DLOCATION_BASE_API} from "../../../environments/api.routes";

export class DLocationBaseApiImpl implements DLocationBaseApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getAll(): Observable<DLocationBase[]> {
    return this.httpClient.get<DLocationBase[]>(DLOCATION_BASE_API);
  }
}
