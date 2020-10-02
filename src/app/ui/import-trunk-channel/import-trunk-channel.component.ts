import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IMPORT_LOCATION, IMPORT_TC_INTERNET, IMPORT_TC_PAYPHONE} from '@core/constants/api';
import {IMPORT_TRUNK_CHANNEL} from '../old/core/constants/api';
import {saveAs} from 'file-saver';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import {map} from 'rxjs/operators';

@Component({
  selector: 'import-tc-trunk-channel-page',
  templateUrl: './import-trunk-channel.component.html',
  styleUrls: ['./import-trunk-channel.component.scss']
})
export class ImportTrunkChannelComponent implements OnInit {

  public file: File;

  public fileError: File = null;

  public answer: string;

  public successImport = false;

  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
  }

  public selectFile(event) {
    this.file = event.target.files[0];
    this.sendFile(this.file);
  }

  public saveFileError() {
    let name: string;
    if (this.file === null) {
      name = 'Ошибки импорта.xlsx';
    } else {
      name = this.file.name;
    }
    saveAs(this.fileError, decodeURI(name));
  }

  private sendFile(file: File) {
    this.http.post(IMPORT_TRUNK_CHANNEL, this.createForm(file), {responseType: 'blob'})
      .subscribe(response => {
            this.answer = 'Импорт завершён успешно.';
            this.successImport = true;
            this.fileError = null;
        },
        error => {
          if (error.headers.get('import-message') === 'error') {
            this.answer = 'Найдены ошибки в файле.';
            this.fileError = error.error;
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
}
