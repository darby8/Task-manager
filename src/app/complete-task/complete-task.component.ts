import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.css'], 
})
export class CompleteTaskComponent { 
    check:boolean=true;
    isFinished:boolean=false
  constructor(public dialogRef: MatDialogRef<Dialog>) {}
  confirm() {
    
    this.isFinished = true;
    this.dialogRef.close(this.isFinished);
  }
  onclick(){
    this.dialogRef.close( this.check=false)
}
}
