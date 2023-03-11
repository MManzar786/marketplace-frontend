import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductI } from '../model/product.model';
import * as cartActions from 'src/app/state/cart/cart.action';
import { CartItemI } from 'src/app/cart/model/cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  // TODO
  @Input() product!: ProductI;
  constructor(private store: Store) {}

  addToCart() {
    let cartItem: CartItemI = {
      item: this.product,
      quantity: 1,
    };
    this.store.dispatch(
      cartActions.addItemToCart({ item: cartItem, userId: 5 })
    );
  }
}
