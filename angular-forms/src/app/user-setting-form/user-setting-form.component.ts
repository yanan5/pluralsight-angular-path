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
    emailOffers: "Off",
    interfaceType: null,
    subscriptionType: null,
    notes: null
  };
  userSettings: IUserSettings = { ...this.originalUserSettings }
  postError: boolean;
  postErrorMessage: any;
  subscriptionTypes: Observable<Array<String>>;
  startDate: Date;
  mytime: any;
  max = 10;
  rate = 7;
  overStar: number | undefined;
  percent: number;


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


  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}
