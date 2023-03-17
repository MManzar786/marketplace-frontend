import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(pageNo: number, limit: number) {
    return this.http.get(
      `${environment.backendUrl}products?page=${pageNo}&size=${limit}`
    );
  }

  getProductsByCategory(pageNo: number, limit: number, category: number) {
    return this.http.get(
      `${environment.backendUrl}products/category?category=${category}&page=${pageNo}&size=${limit}`
    );
  }

  seacrhProducts(pageNo: number, limit: number, searchStr: string) {
    return this.http.get(
      `${environment.backendUrl}products?title=${searchStr}&page=${pageNo}&size=${limit}`
    );
  }

  addProducts(formData: FormData) {
    return this.http.post(`${environment.backendUrl}products/add`, formData);
  }
}
