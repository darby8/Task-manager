import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from '../data';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  showPassword: boolean = false;
  passingEmail={};
  constructor(private route: Router, private _Activatedroute: ActivatedRoute) {}
  public isdata: boolean = false;
  ngOnInit() {
    if (localStorage.getItem('data')) {
      this.isdata = true;
    }
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z" "]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z@1-9.]*'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[A-Za-z0-9]+$'),
    ]),
  });
  public arr: data[] = [];
  isPresent: boolean = false;

  signUp() {
    let info: any = new data();
    info = this.signUpForm.value;
    info['id'] = new Date().getTime();
    if (this.isdata == true) {
      let item: any = localStorage.getItem('data');
      this.arr = JSON.parse(item);
      if (this.arr.some((person) => person.email === info.email)) {
        this.isPresent = true;
      } else {
        this.isPresent = false;
        this.arr.push(info);
        localStorage.setItem('data', JSON.stringify(this.arr));
      }
    } else {
      this.arr.push(info);
      localStorage.setItem('data', JSON.stringify(this.arr));
      this.signUpForm.reset();
    }
    this.route.navigate(['/home'], {
      queryParams: { email: info.email },
    });
  }
  toggle() {
    var pass = this.signUpForm.value;

    this.showPassword = !this.showPassword;
  }
  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
}
