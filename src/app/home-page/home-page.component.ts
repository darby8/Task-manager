import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { DeleteComponent } from '../delete/delete.component';
import { CompleteTaskComponent } from '../complete-task/complete-task.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public data: any;
  arr: any[] = [];
  public searchs: boolean = false;
  filterData: any = [];
  complete: any[] = [];
  finishedTask: any[] = [];
  toDoTask: any[] = [];
  passingEmail: any;
  check: boolean = true;
  isAlreadyLogin:boolean=false
  constructor(
    private dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private router:Router,
    private service:AuthServiceService,
    private cd:ChangeDetectorRef
  ) {}
  ngOnInit() {
   var pre=sessionStorage.getItem('present')

    this._Activatedroute.queryParams.subscribe((paramMap) => {
      this.passingEmail = paramMap['email'];
    
      
    });
    if (localStorage.getItem('task')) {
      var data: any = localStorage.getItem('task');
      let arr: any[] = JSON.parse(data);
      this.toDoTask = arr.filter((item) => item.email == this.passingEmail);
      this.filterData = this.toDoTask;
    }
    let find = this.toDoTask.filter((item) => item.status == 'complete');
    this.finishedTask = find;
  }

  createTask() {
    const dialogref = this.dialog.open(ModalComponent, {
      data: {
        email: this.passingEmail,
      },
    });
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.toDoTask.push(result);
      }
    });
  }
  edit(id: number) {
    let find = this.toDoTask.find((item) => item.id == id);
    const dialogref = this.dialog.open(ModalComponent, {
      data: {
        name: find.name,
        description: find.description,
        date: find.date,
        priority: find.priority,
        id: find.id,
      },
    });
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        var data: any = localStorage.getItem('task');
        this.toDoTask = JSON.parse(data);
      }
    });
  }
  delete(id: number) {
    const dialogref = this.dialog.open(DeleteComponent, {});
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        let find = this.toDoTask.findIndex((item) => item.id == id);
        this.toDoTask.splice(find, 1);
        localStorage.setItem('task', JSON.stringify(this.toDoTask));
      }
    });
  }
  search() {
    // if (this.data =="") {
    //   this.filterData = this.toDoTask;
    // } else {
    //   if (this.data.toUpperCase()) {
    //     console.log(this.data)
    //     let filteredArray = this.toDoTask.filter(
    //       (item) =>
    //         item.name.includes(this.data.toLowerCase(this.data)) ||
    //         item.description.includes(this.data.toLowerCase(this.data))
    //     );
    //     console.log(this.data)
    //     this.filterData = filteredArray;
    //   }
    // }
    if (this.data === '') {
      this.filterData = this.toDoTask;
    } else {
      if (this.data.toUpperCase() || this.data.toLowerCase()) {
        let filteredArray = this.toDoTask.filter(
          (item) =>
            item.name.toLowerCase().includes(this.data.toLowerCase()) ||
            item.description.toLowerCase().includes(this.data.toLowerCase())
        );
        this.filterData = filteredArray;
      }
    }
  }
present:any;
  finishTask(value:any,id: number,) {
    console.log(value)
     value.source.checked = !value.source.checked;
    const dialogref = this.dialog.open(CompleteTaskComponent, {});
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.cd.markForCheck()
        let find = this.toDoTask.findIndex((item) => item.id == id);
        this.finishedTask.push(this.toDoTask[find]);
        this.toDoTask[find].status = 'complete';
        localStorage.setItem('task', JSON.stringify(this.toDoTask));
      }
    });
  }
}
