import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from '../data';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  show: boolean = false;
  isPassword: boolean = false;
  constructor(private route: Router, private service:AuthServiceService) {}
  isPresent: boolean = true;
  arr: data[] = [];
  ngOnInit() {
    sessionStorage.removeItem('present')
    if (localStorage.getItem('data')) {
      let item: any = localStorage.getItem('data');
      this.arr = JSON.parse(item);
    }
   
  }

  images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1100/950`
  );

  public login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isLogedIn: boolean = false;
  onSubmit() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
    } else {
      let info = this.login.value; 
      if (this.arr.some((person) => person.email === info.email)) {
        if (this.arr.some((person) => person.password === info.password)) { 
            sessionStorage.setItem('present',JSON.stringify(this.isPresent))
            this.service.userLogedIn()
             this.route.navigate(['home'], {
               queryParams: { email: info.email },
             });    
       
     } else {
          this.isPassword = true;        
        }
       
      } else {
        this.isPresent = false;
      }
    }
  }
  toggle() {
    this.show = !this.show;
  }

  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  toggleShow() {
    this.show = !this.show;
  }
}
