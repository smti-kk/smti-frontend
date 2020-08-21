import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IMPORT_LOCATION, IMPORT_TC_INTERNET, IMPORT_TC_TV} from '@core/constants/api';

@Component({
  selector: 'import-tc-tv-page',
  templateUrl: './import-tc-tv.component.html',
  styleUrls: ['./import-tc-tv.component.scss']
})
export class ImportTcTvComponent implements OnInit {

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
    debugger;
    this.http.post(IMPORT_TC_TV, this.createForm(file), {
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
