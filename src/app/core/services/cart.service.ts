import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductI } from 'src/app/products/models/product.model';
import { CartItemI } from '../../cart/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItemsByUserId(id: number) {
    return this.http.get(` https://dummyjson.com/carts/user/${id}`);
  }

  saveCartItems(cartItems: CartItemI, userId: number) {
    return this.http.post(`https://dummyjson.com/carts/add`, {
      userId: userId,
      products: [{ id: cartItems.item.id, quantity: 1 }],
    });
  }
}
