import { Component, OnInit } from '@angular/core';
import {IProduct} from './product-Interface';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageHeight: number = 50;
  imageMargin: number = 2;
  products: IProduct[] = [{
    "productId": 1,
    "productName": "Leaf Rake",
    "productCode": "GDN-0011",
    "releaseDate": "March 19, 2019",
    "description": "Leaf rake with 48-inch wooden handle.",
    "price": 19.95,
    "starRating": 3.2,
    "imageUrl": "assets/images/leaf_rake.png"
  },
  {
    "productId": 2,
    "productName": "Garden Cart",
    "productCode": "GDN-0023",
    "releaseDate": "March 18, 2019",
    "description": "15 gallon capacity rolling garden cart",
    "price": 32.99,
    "starRating": 4.2,
    "imageUrl": "assets/images/garden_cart.png"
  }];
  showImage: boolean = false;
  filterText: string;
  constructor() { }

  ngOnInit(): void {
    console.log("PRODUCTSLIST ngOnInit")
  }

  toggleImage(): void {
    this.showImage = !this.showImage
  }

}
