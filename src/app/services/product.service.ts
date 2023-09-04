import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlBase = environment.urlBase;  
  constructor(private http: HttpClient) { }

  getProductsData() {
    return this.http.get(`${this.urlBase.apiabc}/api/product`);
  }

  saveProduct(product: Product) {
    return this.http.post<any>(`${this.urlBase.apiabc}/api/product`, product)
    .pipe(map(response => {
        return response;
    }));
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.urlBase.apiabc}/api/product/${id}`).pipe(map(response => {return response}))
  }

  updateProduct(id:any, product: Product) {
    return this.http.put(`${this.urlBase.apiabc}/api/product/${id}`, product).pipe(map(response=>{return response}));
  }

  getProductById(id:any) {
    return this.http.get(`${this.urlBase.apiabc}/api/product/${id}`).pipe(map(response=>{return response}));
  }

}
