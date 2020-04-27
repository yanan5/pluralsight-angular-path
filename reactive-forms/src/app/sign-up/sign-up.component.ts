import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from "rxjs/operators";

const ratingRage = (min: number, max: number): ValidatorFn =>
  (c: AbstractControl): { [key: string]: any } | null => {
    if (c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  }

const emailMatcher = (control: AbstractControl): { [key: string]: any } | null => {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');

  if (email.value.trim() === confirmEmail.value.trim())
    return null;
  return { 'match': true }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailMessage: string;
  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address'
  }
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validators: emailMatcher }),
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
    const email = this.signUpForm.get('emailGroup.email');
    email.valueChanges
    .pipe(
      debounceTime(1000)
    ).subscribe(val => this.setMessage(email));

    notificationType.valueChanges
      .subscribe(val => {
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

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]
      ).join(' ')
    }
  }

}
