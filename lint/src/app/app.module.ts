import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { Orders2Component } from './orders2/orders2.component';
import { SearchBoxDirective } from './search-box.directive';
import { MyDirDirective } from './shared/my-dir.directive';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    Orders2Component,
    SearchBoxDirective,
    MyDirDirective
  ],
  imports: [
    BrowserModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
