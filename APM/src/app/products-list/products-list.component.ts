import { Component, OnInit } from '@angular/core';
import {IProduct} from './product-Interface';
import { ProductService } from '../service/product/product.service';

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
  products: IProduct[];
  filteredProducts: IProduct[];
  showImage: boolean = false;
  _filterText: string;
  currentRatingClicked: string;

  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredProducts = this._filterText ? this.getFilteredProducts(this._filterText) : this.products;
  }
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this._filterText ? this.getFilteredProducts(this._filterText) : this.products;
  }

  toggleImage(): void {
    this.showImage = !this.showImage
  }

  getFilteredProducts(filterText: string): IProduct[] {
    return this.products.filter(product => product.productName.toLowerCase().indexOf(filterText) !== -1)
  }

  onRatingClicked(value: string) {
    this.currentRatingClicked = value;
  }

}
