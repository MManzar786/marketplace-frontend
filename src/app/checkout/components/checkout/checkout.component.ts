import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItemI } from 'src/app/cart/model/cart.model';
import * as cartSelector from 'src/app/state/cart/cart.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems$!: Observable<CartItemI[]>;
  totalPrice: number = 0;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
  }
  getTotalPrice(item: CartItemI): void {
    this.totalPrice += item.quantity * item.product.price;
  }
}
