import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/products/models/product.model';
import * as cartActions from 'src/app/state/cart/cart.action';
import * as cartSelector from 'src/app/state/cart/cart.selector';
import {
  DECREMENT_OPERATOR,
  INCREMENT_OPERATOR,
} from 'src/app/utils/constants';
import { CartItemI } from '../../model/cart.model';

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

  updateCartItem(operator: string, item: CartItemI) {
    switch (operator) {
      case INCREMENT_OPERATOR:
        {
          let quantity = item.quantity + 1;
          let cartItem = { item: item.item, quantity: quantity };
          this.store.dispatch(
            cartActions.updateCartItem({
              item: cartItem,
              quantityOperator: INCREMENT_OPERATOR,
            })
          );
        }
        break;

      default:
        let quantity = item.quantity - 1;
        let cartItem = { item: item.item, quantity: quantity };
        this.store.dispatch(
          cartActions.updateCartItem({
            item: cartItem,
            quantityOperator: DECREMENT_OPERATOR,
          })
        );
    }
  }

  removeFromCart(cartItem: CartItemI) {
    this.store.dispatch(cartActions.removeItemFromCart({ cartItem }));
  }
  checkout() {
    throw new Error('Method not implemented.');
  }
}
