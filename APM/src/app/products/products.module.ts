import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConvertToSpacesPipe } from './shared/pipes/convert-to-spaces.pipe';
import { StarComponent } from './shared/star/star.component';
@NgModule({
  declarations: [
    ProductsListComponent, 
    ProductDetailsComponent,
    ConvertToSpacesPipe,
    StarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductsListComponent,
    ProductDetailsComponent
  ]
})
export class ProductsModule { }
