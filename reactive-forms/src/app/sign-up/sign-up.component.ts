import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

const ratingRage = (min: number, max: number): ValidatorFn =>
  (c: AbstractControl): { [key: string]: any } | null => {
    if (c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  }

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phone: '',
      rating: [null, ratingRage(2, 7)],
      notificationType: 'Email',
      catalog: [false],
      addressType: 'Home',
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '',
      zip: ''
    })
    const { notificationType, phone } = this.signUpForm.controls;
    notificationType.valueChanges.subscribe(val => {
      if (val === 'Phone') {
        phone.setValidators(Validators.required);
      } else {
        phone.clearValidators();
      }
      phone.updateValueAndValidity();
    })
  }

  onSubmit() {
    console.log(this.signUpForm.value, this.signUpForm)
  }

}
