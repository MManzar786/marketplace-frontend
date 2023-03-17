import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import * as fromAuthSelector from '../../../state/auth/auth.selector';
import * as fromAuthReducer from '../../../state/auth/auth.reducer';
import * as authActions from '../../../state/auth/auth.actions';
import * as cartActions from '../../../state/cart/cart.action';
import * as cartSelector from '../../../state/cart/cart.selector';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/products/models/product.model';
import { Router } from '@angular/router';
import {
  ROLE_LABEL,
  TOKEN_LABEL,
  USER_ID_LABEL,
} from 'src/app/utils/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  token$ = this.store.select(fromAuthSelector.selectToken);
  role$ = this.store.select(fromAuthSelector.selectRole);
  loginState$ = this.store.select(fromAuthSelector.selectState);
  tokenExist: boolean = false;
  cartItemsCount$!: Observable<any>;
  cartItems$!: Observable<ProductI>;
  constructor(
    private store: Store<fromAuthReducer.State>,
    private router: Router
  ) {}
  ngOnInit(): void {
    let userId: string | null = localStorage.getItem(USER_ID_LABEL);
    if (userId) {
      this.store.dispatch(
        cartActions.loadCartRequest({ userId: parseInt(userId) })
      );
    }
    this.cartItemsCount$ = this.store.select(cartSelector.selectCartItemsCount);
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
    let token: string | null = localStorage.getItem(TOKEN_LABEL);
    let role: string | null = localStorage.getItem(ROLE_LABEL);
    if (token && role) {
      let res: any = { token, role };
    }
  }
  onLogoutClick() {
    localStorage.clear();
    this.store.dispatch(authActions.logout());
    this.router.navigate(['/auth/sign-in']);
  }
}
