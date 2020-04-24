import { Component, OnInit } from '@angular/core';
import { ISignUp } from '../models/sign-up';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  singUpForm:ISignUp = {
    firstName: '',
    lastName: '',
    email: '',
    catalog: false,
    addressType: '',
    streetAddressOne: '',
    streetAddressTwo: '',
    city: '',
    state: '',
    zip: ''

  };
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      console.log(form)
    }
    console.log(form)
  }

}
