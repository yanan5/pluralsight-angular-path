import { Component, OnInit } from '@angular/core';
import { IProduct } from '../products-list/product-Interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = "Product Details";
  product: IProduct;
  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`
    this.productService.getProduct(id).subscribe(
      product => this.product = product
    )
  }

}

