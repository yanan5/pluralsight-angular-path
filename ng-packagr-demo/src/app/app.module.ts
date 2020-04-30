import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {MyFirstLibModule} from 'my-first-lib';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyFirstLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
