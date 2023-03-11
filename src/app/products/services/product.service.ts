import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(skip: number, limit: number, category?: string) {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }
    return this.http.get(url);
  }
}
