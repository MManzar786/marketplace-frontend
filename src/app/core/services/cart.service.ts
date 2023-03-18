import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductI } from 'src/app/products/models/product.model';
import { USER_LABEL } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';
import { CartItemI } from '../../cart/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItemsByUserId(id: number) {
    return this.http.get(`${environment.backendUrl}carts/${id}`);
  }

  saveCartItems(cartItem: CartItemI, userId: number) {
    return this.http.post(`${environment.backendUrl}carts/add`, {
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
      userId: userId,
    });
  }
}
