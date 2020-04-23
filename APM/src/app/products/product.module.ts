import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductDetailGuard } from '../guards/product-detail/product-detail.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailsComponent }
];
@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductModule { }

