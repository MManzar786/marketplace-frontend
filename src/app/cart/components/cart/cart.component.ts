import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
export class CartComponent implements AfterViewInit {
  cartItems$!: Observable<CartItemI[]>;
  cartItemsCount$!: Observable<number>;
  totalPrice: number = 0;

  constructor(
    private store: Store,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cartItemsCount$ = this.store.select(cartSelector.selectCartItemsCount);
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
    this.cartItems$.subscribe((cartItems) => {
      cartItems.forEach((cartItem) => {
        this.totalPrice += cartItem.product.price * cartItem.quantity;
      });
    });
    this.changeDetection.detectChanges();
  }

  updateCartItem(operator: string, item: CartItemI) {
    switch (operator) {
      case INCREMENT_OPERATOR:
        {
          let quantity = item.quantity + 1;
          let cartItem = {
            product: item.product,
            quantity: quantity,
            id: item.id,
          };
          this.store.dispatch(
            cartActions.updateCartItem({
              id: cartItem.id,
              item: cartItem,
              quantityOperator: INCREMENT_OPERATOR,
            })
          );
        }
        break;

      default:
        let quantity = item.quantity - 1;
        let cartItem = {
          product: item.product,
          quantity: quantity,
          id: item.id,
        };
        this.store.dispatch(
          cartActions.updateCartItem({
            id: item.id,
            item: cartItem,
            quantityOperator: DECREMENT_OPERATOR,
          })
        );
    }
  }

  removeFromCart(cartItem: CartItemI) {
    this.store.dispatch(cartActions.removeItemFromCartRequest({ cartItem }));
  }
}
