import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductI } from '../../models/product.model';
import * as cartActions from 'src/app/state/cart/cart.action';
import * as AuthSelector from 'src/app/state/auth/auth.selector';
import { CartItemI } from 'src/app/cart/model/cart.model';
import { Router } from '@angular/router';
import { TOKEN_LABEL, USER_LABEL } from 'src/app/utils/constants';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: ProductI;
  constructor(private store: Store, private route: Router) {}

  addToCart() {
    let token = localStorage.getItem(TOKEN_LABEL);
    let user = JSON.parse(localStorage.getItem(USER_LABEL) || '{}');
    if (token && Object.keys(user).length > 0) {
      let cartItem: CartItemI = {
        product: this.product,
        quantity: 1,
      };
      this.store.dispatch(
        cartActions.addItemToCart({ item: cartItem, userId: user.id })
      );
    } else {
      this.route.navigate(['/auth/sign-in']);
    }
  }
}
