import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
