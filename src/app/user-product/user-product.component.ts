import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {
  products!: Array<Product>;
  constructor(private productService: ProductService){}

  ngOnInit() {
    this.fetchProductData();
  }

  fetchProductData() {
    this.productService.getProductsData().subscribe(
      (result: any) => {
        this.products = result;
      }
    );
  }

}
