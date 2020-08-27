import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IMPORT_ACCESS_POINT, IMPORT_LOCATION, IMPORT_TC_INTERNET, IMPORT_TC_PAYPHONE} from '@core/constants/api';

@Component({
  selector: 'import-access-point-page',
  templateUrl: './import-access-point.component.html',
  styleUrls: ['./import-access-point.component.scss']
})
export class ImportAccessPointComponent implements OnInit {

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

    this.http.post(IMPORT_ACCESS_POINT, this.createForm(file), {
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
