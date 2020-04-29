import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductEditComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class ProductModule { }

