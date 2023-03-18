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
  USER_LABEL,
  USER_ROLE,
} from 'src/app/utils/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  token$ = this.store.select(fromAuthSelector.selectToken);
  user$ = this.store.select(fromAuthSelector.selectUser);
  loginState$ = this.store.select(fromAuthSelector.selectState);
  isAdmin: boolean = false;
  cartItemsCount$!: Observable<any>;
  cartItems$!: Observable<ProductI>;
  constructor(
    private store: Store<fromAuthReducer.State>,
    private router: Router
  ) {}
  ngOnInit(): void {
    let loginSuccessResponse = JSON.parse(
      localStorage.getItem(USER_LABEL) || '{}'
    );
    if (Object.keys(loginSuccessResponse).length > 0) {
      this.store.dispatch(authActions.loginSuccess({ loginSuccessResponse }));
    }
    this.user$.subscribe((user) => {
      if (user) {
        this.cartItems$ = this.store.select(cartSelector.selectCartItems);
        this.cartItemsCount$ = this.store.select(
          cartSelector.selectCartItemsCount
        );
        this.store.dispatch(cartActions.loadCartRequest({ userId: user?.id }));
        this.isAdmin = user.role === USER_ROLE ? false : true;
      }
    });
  }
  onLogoutClick() {
    localStorage.clear();
    this.store.dispatch(authActions.logout());
    this.router.navigate(['/auth/sign-in']);
  }
}
