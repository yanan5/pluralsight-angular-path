import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDetailGuard } from './guards/product-detail/product-detail.guard'

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
