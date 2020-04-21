import { Component, OnInit } from '@angular/core';
import { IProduct } from '../products-list/product-Interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = "Product Details";
  product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}

