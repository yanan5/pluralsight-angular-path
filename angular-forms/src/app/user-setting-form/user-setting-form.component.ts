import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/UserSettings';

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

}
