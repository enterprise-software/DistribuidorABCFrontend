import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  products!: Array<Product>;
  loading = false;  
  constructor(private productService: ProductService,
    private router: Router){}

  ngOnInit() {
    this.fetchProductData();
  }

  fetchProductData() {
    this.loading = true;    
    this.productService.getProductsData().subscribe(
      (result: any) => {
        this.products = result;
        this.loading = false;
      }
    );
  }

  deleteProduct(productId:any) {
    this.loading = true;
    this.productService.deleteProduct(productId).subscribe( {
      next: data => {
        this.loading = false;
        console.log(data)
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
        this.router.navigate(['/']);
      }
    });
  }

  goToEdit(product: Product) {
    console.log(`Product to edit ${JSON.stringify(product)}`);
    this.router.navigate(['/admin-product-edit', product.productId]);
  }
}
