import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductI } from '../../models/product.model';
import * as cartActions from 'src/app/state/cart/cart.action';
import * as AuthSelector from 'src/app/state/auth/auth.selector';
import { CartItemI } from 'src/app/cart/model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: ProductI;
  constructor(private store: Store, private route: Router) {}

  addToCart() {
    let token = localStorage.getItem('token');
    if (token) {
      let cartItem: CartItemI = {
        item: this.product,
        quantity: 1,
      };
      this.store.dispatch(
        cartActions.addItemToCart({ item: cartItem, userId: 5 })
      );
    } else {
      this.route.navigate(['/auth/sign-in']);
    }
  }
}
