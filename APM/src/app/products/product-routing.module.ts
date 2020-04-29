import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductDetailGuard } from '../guards/product-detail/product-detail.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from '../product-edit.guard';

const routes: Routes = [
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailsComponent },
  {
    path: "products/:id/edit",
    canDeactivate: [ProductEditGuard], component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
