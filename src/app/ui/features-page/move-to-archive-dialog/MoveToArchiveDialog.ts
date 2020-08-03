import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'move-to-archive-dialog',
  template: `
    <h4 mat-dialog-title>Сделать данную тех.возможность кекущей?</h4>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Отмена</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Да</button>
    </div>
  `
})
export class MoveToArchiveDialog {

  constructor(
    public dialogRef: MatDialogRef<MoveToArchiveDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
