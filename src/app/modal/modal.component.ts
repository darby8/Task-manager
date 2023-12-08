import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { taskData } from '../taskdata';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  todayDate: any;
  taskArr: taskData[] = [];
  isdata: boolean = false;
  findArray: []=[];
  passingEmail = {};
  ngOnInit() {
    if (this.data.name) {
      this.isdata = true;
      this.modal.get('name')?.setValue(this.data.name);
      this.modal.get('description')?.setValue(this.data.description);
      this.modal.get('date')?.setValue(this.data.date);
      this.modal.get('priority')?.setValue(this.data.priority);
    }
    this.todayDate=new Date()
  }
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
      date: string;
      priority: string;
      id: number;
      email: string;
    },
   
  ) {}
  public find: any;
  public modal = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),
    priority: new FormControl('', [Validators.required]),
  });

  addTask(data: any) {
    if (this.modal.invalid) {
      this.modal.markAllAsTouched();
    } else {
      var info: any = new taskData();
      info = this.modal.value;

      info['createdOn'] = new Date();
      info['status'] = 'pending';
      info['email'] = this.data.email;
      info['id'] = new Date().getTime();
      if (localStorage.getItem('task')) {
        let data: any = localStorage.getItem('task');
        this.taskArr = JSON.parse(data);       
        if (this.isdata) {
          let findArray = this.taskArr.findIndex(
            (item: any) => item.id == this.data.id );
         
          this.taskArr[findArray].name = this.modal.controls.name.value;
          console.log("name")
          this.taskArr[findArray].description =
            this.modal.controls.description.value;
          this.taskArr[findArray].date = this.modal.controls.date.value;
          this.taskArr[findArray].priority = this.modal.controls.priority.value;
    
          localStorage.setItem('task', JSON.stringify(this.taskArr));
          this.dialogRef.close(info);
        } else {
          this.taskArr.push(info);
          localStorage.setItem('task', JSON.stringify(this.taskArr));
          this.dialogRef.close(info);
        }
      } else {
        this.taskArr.push(info);
        localStorage.setItem('task', JSON.stringify(this.taskArr));
        this.dialogRef.close(info);
      }
    }
  }

  get name() {
    return this.modal.get('name');
  }
  get description() {
    return this.modal.get('description');
  }
  get date() {
    return this.modal.get('date');
  }
  get priority() {
    return this.modal.get('priority');
  }
}
