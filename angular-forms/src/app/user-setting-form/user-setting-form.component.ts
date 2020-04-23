import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/UserSettings';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.scss']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings: IUserSettings = {
    name:null,
    emailOffers:null,
    interfaceType:null,
    subscriptionType:null,
    notes:null
  };
  userSettings: IUserSettings = { ...this.originalUserSettings }
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.valid, "is onSubmit")
  }

  onBlur(field: NgModel) {
    console.log('onBlur', field.valid)
  }

}
