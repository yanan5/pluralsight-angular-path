import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ConvertToSpacesPipe } from '../shared/pipes/convert-to-spaces.pipe';
import { StarComponent } from '../shared/star/star.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

import { ProductDetailGuard } from '../guards/product-detail/product-detail.guard';

const routes: Routes = [
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailsComponent }
];
@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    StarComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
