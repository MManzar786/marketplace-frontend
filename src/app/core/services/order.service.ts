import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemsI } from 'src/app/checkout/model/checkout.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get(`${environment.backendUrl}orders`);
  }

  addAnOrder(userId: number, orderItems: OrderItemsI[]) {
    return this.http.post(`${environment.backendUrl}orders`, {
      userId,
      orderItems,
    });
  }
}
