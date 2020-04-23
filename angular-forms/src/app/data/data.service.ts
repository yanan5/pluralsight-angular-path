import { Injectable } from '@angular/core';
import { IUserSettings } from './UserSettings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: IUserSettings): Observable<IUserSettings> {
    return this.http.post<IUserSettings>('https://putsreq.com/61I2QabF0U8eanQnD0g5', userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(["Monthly", "Yearly", "Weekly", "LifeTime"])
  }
}
