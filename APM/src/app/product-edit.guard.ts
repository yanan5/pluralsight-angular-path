import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const productName = component.productForm.get('productName').value || 'New Product';
    return confirm(`Navigate away and lose all changes to ${productName}?`);
  }
}
