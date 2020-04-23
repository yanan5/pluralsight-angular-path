import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductDetailGuard } from '../guards/product-detail/product-detail.guard';

const routes: Routes = [
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
