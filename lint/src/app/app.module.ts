import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { Orders2Component } from './orders2/orders2.component';
import { SearchBoxDirective } from './search-box.directive';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    Orders2Component,
    SearchBoxDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
