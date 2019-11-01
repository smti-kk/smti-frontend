import { BaseModel } from '../models/base-model';

export abstract class ApiMapper<ShortModel extends BaseModel,
  DetailModel extends BaseModel,
  WriteModel extends BaseModel> {

  public abstract mapShortApi(apiData): ShortModel;
  public abstract mapDetailApi(apiData): DetailModel;
}

export class DefaultMapper<ShortModel extends BaseModel,
  DetailModel extends BaseModel,
  WriteModel extends BaseModel> extends ApiMapper<ShortModel, DetailModel, WriteModel> {

  mapShortApi(apiData): ShortModel {
    return apiData as ShortModel;
  }

  mapDetailApi(apiData): DetailModel {
    return apiData as DetailModel;
  }
}
