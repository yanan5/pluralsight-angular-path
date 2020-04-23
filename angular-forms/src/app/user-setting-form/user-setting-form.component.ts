import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/UserSettings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.scss']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings: IUserSettings = {
    name: null,
    emailOffers: null,
    interfaceType: null,
    subscriptionType: null,
    notes: null
  };
  userSettings: IUserSettings = { ...this.originalUserSettings }
  postError: boolean;
  postErrorMessage: any;
  subscriptionTypes: Observable<Array<String>>;

  constructor(
    private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes()
  }

  onSubmit(form: NgForm) {
    console.log(form.valid, "is onSubmit")
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        data => console.log("success", data),
        error => this.onHttpError(error)
      )
    } else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above error";
    }
  }

  onBlur(field: NgModel) {
    console.log('onBlur', field.valid)
  }

  onHttpError(error: HttpErrorResponse) {
    console.log("error", error);
    this.postError = true;
    this.postErrorMessage = error.message;
  }
}
