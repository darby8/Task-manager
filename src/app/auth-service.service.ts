import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor() {}
   data=sessionStorage.getItem('present');
 
  loggedin:boolean=false;
  present:boolean=false;
 userLogedIn(){
    if(this.data=='true')
  this.present=true;
 }
 logIn(){
    return this.present
 }


}
