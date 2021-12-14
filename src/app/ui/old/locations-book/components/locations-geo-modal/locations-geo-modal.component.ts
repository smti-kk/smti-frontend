import { LocalityBookPageComponent } from './../../pages/locality-book-page/locality-book.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  templateUrl: './locations-geo-modal.component.html',
  styleUrls: ['./locations-geo-modal.component.scss'],
})
export class LocationsGeoModalComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = [
    'lat',
    'lng',
  ];


  constructor(
    public dialogRef: MatDialogRef<LocalityBookPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [[number, number]]
  ) {
    this.dataSource = new MatTableDataSource<any>(this.data);

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
