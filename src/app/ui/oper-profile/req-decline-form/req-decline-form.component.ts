import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-req-decline-form',
  templateUrl: './req-decline-form.component.html',
  styleUrls: ['./req-decline-form.component.scss']
})
export class ReqDeclineFormComponent implements OnInit {
  comment: string;

  constructor(public dialogRef: MatDialogRef<ReqDeclineFormComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
