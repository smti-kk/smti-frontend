export abstract class ApiMapper<ShortModel, DetailModel, WriteModel> {

  public abstract mapShortApi(apiData): ShortModel;

  public abstract mapDetailApi(apiData): DetailModel;
}

export class DefaultMapper<ShortModel, DetailModel, WriteModel> extends ApiMapper<ShortModel, DetailModel, WriteModel> {

  mapShortApi(apiData): ShortModel {
    return apiData as ShortModel;
  }

  mapDetailApi(apiData): DetailModel {
    return apiData as DetailModel;
  }
}
