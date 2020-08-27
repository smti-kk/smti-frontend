import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IMPORT_LOCATION, IMPORT_TC_INTERNET, IMPORT_TC_PAYPHONE} from '@core/constants/api';
import {IMPORT_TC_ATS} from '../old/core/constants/api';

@Component({
  selector: 'import-tc-ats-page',
  templateUrl: './import-tc-ats.component.html',
  styleUrls: ['./import-tc-ats.component.scss']
})
export class ImportTcAtsComponent implements OnInit {

  public file: File;

  public answer: string;

  public successImport = false;

  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
  }

  public selectFile(event) {
    this.file = event.target.files[0];
    this.sendFile(this.file);
  }

  private sendFile(file: File) {

    this.http.post(IMPORT_TC_ATS, this.createForm(file), {
      responseType: 'text'
    })
      .subscribe(response => {
          this.successImport = true;
          this.answer = 'Импорт завершён успешно.';
        },
        error => {
          this.successImport = false;
          this.answer = error.error;
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
