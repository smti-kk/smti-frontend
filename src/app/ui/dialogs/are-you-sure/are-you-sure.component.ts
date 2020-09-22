import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AreYouSureComponent>,
              @Inject(MAT_DIALOG_DATA) public title: string) {
  }

  ngOnInit(): void {
  }

}
