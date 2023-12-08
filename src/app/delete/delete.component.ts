import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
    constructor(
  public dialogRef: MatDialogRef<Dialog>){};
  del: boolean = false;
  delete() {
    this.del = true;
    this.dialogRef.close(this.del);
  }
}
