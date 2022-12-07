import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  IMPORT_ACCESS_POINT,
  IMPORT_LOCATION,
  IMPORT_TC_INTERNET,
  IMPORT_TC_PAYPHONE,
  IMPORT_TRUNK_CHANNEL,
} from '@core/constants/api';
import { saveAs } from 'file-saver';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'import-access-point-page',
  templateUrl: './import-access-point.component.html',
  styleUrls: ['./import-access-point.component.scss'],
})
export class ImportAccessPointComponent implements OnInit {
  public file: File;

  public fileError: File = null;

  public answer: string;

  public successImport = false;

  public importSuccess = 0;

  public importFailure = 0;

  public importAccessPointUrl = IMPORT_ACCESS_POINT;

  public buttons = [
    {
      label: 'ЕСПД',
      value: 'ESPD'
    },
    {
      label: 'СЗО',
      value: 'SMO'
    }
  ]

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {}

  public selectFile(event) {
    this.file = event.target.files[0];
    this.sendFile(this.file);
  }

  public saveFileError() {
    let name: string;
    if (this.file === null) {
      name = 'Ошибки импорта.xlsx';
    } else {
      name = this.file.name.replace('.xls', ' (ошибки).xls');
    }
    saveAs(this.fileError, decodeURI(name));
  }

  private sendFile(file: File) {
    this.http
      .post(IMPORT_ACCESS_POINT, this.createForm(file), {
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          this.answer = 'Импорт завершён успешно.';
          this.successImport = true;
          this.fileError = null;
        },
        (error) => {
          if (error.headers.get('import-message') === 'error') {
            this.answer = 'Найдены ошибки в файле.';
            this.importSuccess = error.headers.get('import-success');
            this.importFailure = error.headers.get('import-failure');
            this.fileError = error.error;
          } else if (error.headers.get('import-message') === 'format-error') {
            this.answer = 'Неправильный тип файла.';
            this.fileError = null;
          } else if (error.headers.get('import-message') === 'npp-error') {
            this.answer = 'Не все "№ п/п" заполнены.';
            this.fileError = null;
          } else if (error.headers.get('import-message') === 'unexpected') {
            this.answer = 'Непредвиденная ошибка.';
            this.fileError = null;
          }
          this.successImport = false;
        }
      );
  }

  private createForm(file: File): FormData {
    const form = new FormData();
    form.append('file', file, file.name);
    return form;
  }

  public getFileName() {
    return this.file ? this.file.name : null;
  }

  getContext(files: NzUploadFile[]) {
    const res =  files.map((file) => ({
      name: file.name,
      status: file.status,
      answer: 'ok',
      errors: {
        importSuccess: 10,
        importError: 20,
        file: 'gg',
      },
    }));
    console.log(res);
    return res
  }
  hasErrorInFile(file: NzUploadFile) {
    if (file.error instanceof HttpErrorResponse) {
      console.log(file.error);

      return {
        importSuccess: 10,
        importFailure: 20,
        file: 'gg',
      }
    }
    return null;
  }

  getAnswerMessage(file: NzUploadFile) {}
}
