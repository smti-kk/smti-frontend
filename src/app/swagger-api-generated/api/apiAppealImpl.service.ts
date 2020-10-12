/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AppealReq} from '../model/appealReq';
import {AppealRes} from '../model/appealRes';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';
import {environment} from '../../../environments/environment';
import {Pageable} from "@api/dto/Pageable";


@Injectable({
  providedIn: 'root'
})
export class ApiAppealImplService {

  protected basePath = environment.API_BASE_URL;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * delete
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.delete<any>(`${this.basePath}/api/appeals/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  public findAllUsingGET(page: number, size: number, observe?: 'body', reportProgress?: boolean): Observable<Pageable<AppealRes[]>>;
  public findAllUsingGET(page: number, size: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Pageable<AppealRes[]>>>;
  public findAllUsingGET(page: number, size: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Pageable<AppealRes[]>>>;
  public findAllUsingGET(page: number, size: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Array<AppealRes>>(`${this.basePath}/api/appeals?page=${page}&size=${size}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   * getOne
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getOneUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<AppealRes>;
  public getOneUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AppealRes>>;
  public getOneUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AppealRes>>;
  public getOneUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getOneUsingGET.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<AppealRes>(`${this.basePath}/api/appeals/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   * updateOrCreate
   *
   * @param appeal appeal
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateOrCreateUsingPOST(appeal: AppealReq, observe?: 'body', reportProgress?: boolean): Observable<AppealRes>;
  public updateOrCreateUsingPOST(appeal: AppealReq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AppealRes>>;
  public updateOrCreateUsingPOST(appeal: AppealReq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AppealRes>>;
  public updateOrCreateUsingPOST(appeal: AppealReq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (appeal === null || appeal === undefined) {
      throw new Error('Required parameter appeal was null or undefined when calling updateOrCreateUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    headers = headers.set('Content-Type', 'multipart/form-data');

    const params = new HttpParams();
    const formData = new FormData();
    if (appeal.file) {
      formData.append('file', appeal.file);
    }
    if (appeal.responseFile) {
      formData.append('responseFile', appeal.responseFile);
    }
    if (appeal.id) {
      formData.append('id', appeal.id.toString());
    }
    formData.append('title', appeal.title);
    formData.append('status', appeal.status);
    formData.append('priority', appeal.priority);
    formData.append('level', appeal.level);
    if (appeal.locationId) {
      formData.append('locationId', appeal.locationId.toString());
    }
    formData.append('date', new Date(appeal.date).toISOString());
    const options = {
      params,
      reportProgress: true,
    };
    const req = new HttpRequest('POST', `${this.basePath}/api/appeals`, formData, options);
    return this.httpClient.request(req);
  }
}
