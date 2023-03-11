import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/products/model/product.model';
import * as cartActions from 'src/app/state/cart/cart.action';
import * as cartSelector from 'src/app/state/cart/cart.selector';
import { CartItemI } from '../model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItemI[]>;
  constructor(private store: Store) {}
  ngOnInit() {
    // this.store.dispatch(cartActions.loadCartRequest({ userId: 5 }));
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
  }
  removeFromCart(_t7: ProductI) {}
  checkout() {
    throw new Error('Method not implemented.');
  }
}
