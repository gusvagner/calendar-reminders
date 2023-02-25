import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html'
})
export class DeleteWarningComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteWarningComponent>,
  ) { }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
