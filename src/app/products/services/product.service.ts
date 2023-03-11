import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  loadProducts(skip: number, limit: number) {
    return this.http.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
  }
}
