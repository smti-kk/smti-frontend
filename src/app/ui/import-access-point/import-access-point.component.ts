import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IMPORT_ACCESS_POINT } from '@core/constants/api';
import { saveAs } from 'file-saver';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';

enum errorType {
  inFile = 'error',
  format = 'format-error',
  npp = 'npp-error',
  unexpected = 'unexpected',
  unknown = 'unknown',
}

interface CommonErrorUpload {
  type: errorType;
  message: string;
}

interface ErrorInUploadFile extends CommonErrorUpload {
  type: errorType.inFile;
  importSuccess: number;
  importFailure: number;
  file: File;
}

type ErrorUpload = ErrorInUploadFile | CommonErrorUpload;

@Component({
  selector: 'import-access-point-page',
  templateUrl: './import-access-point.component.html',
  styleUrls: ['./import-access-point.component.scss'],
})
export class ImportAccessPointComponent implements OnInit {
  public importAccessPointUrl = IMPORT_ACCESS_POINT;

  public buttons = [
    {
      label: 'ЕСПД',
      value: 'ESPD',
    },
    {
      label: 'СЗО',
      value: 'SMO',
    },
  ];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {}

  public saveFileError(file: File) {
    saveAs(file);
  }

  public isErrorInUploadFile = (
    error: ErrorUpload | null
  ): error is ErrorInUploadFile => {
    return error?.type === 'error';
  };

  public uploadFile = (options: NzUploadXHRArgs): Subscription => {
    const { data } = options;
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        formData.append(key, element);
      }
    }
    formData.append('file', options.postFile as File, options.file.name);
    return this.http
      .post(IMPORT_ACCESS_POINT, formData, {
        responseType: 'blob',
      })
      .subscribe({
        next: (res) => options.onSuccess(res, options.file, null),
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            const { headers, error: fileErrorDescription } = error;
            let errorDescription: ErrorUpload | null = null;

            switch (headers.get('import-message')) {
              case errorType.inFile:
                errorDescription = {
                  type: errorType.inFile,
                  importSuccess: parseInt(headers.get('import-success')) ?? 0,
                  importFailure: parseInt(headers.get('import-failure')) ?? 0,
                  file: new File(
                    [fileErrorDescription],
                    options.file.name.replace('.xls', ' (ошибки).xls')
                  ),
                  message: 'Найдены ошибки в файле.',
                };
                break;
              case errorType.format:
                errorDescription = {
                  type: errorType.format,
                  message: 'Неправильный тип файла.',
                };
                break;
              case errorType.npp:
                errorDescription = {
                  type: errorType.npp,
                  message: 'Не все "№ п/п" заполнены.',
                };
                break;
              case errorType.unexpected:
                errorDescription = {
                  type: errorType.unexpected,
                  message: 'Непредвиденная ошибка.',
                };
                break;
              default:
                errorDescription = {
                  type: errorType.unknown,
                  message: 'Неизвестная ошибка',
                };
                break;
            }
            return options.onError(errorDescription, options.file);
          }
          return options.onError(error, options.file);
        },
      });
  };
}
