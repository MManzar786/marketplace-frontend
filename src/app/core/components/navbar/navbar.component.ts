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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  token$ = this.store.select(fromAuthSelector.selectToken);
  user$ = this.store.select(fromAuthSelector.selectUser);
  cartItemsCount$!: Observable<any>;
  cartItems$!: Observable<ProductI>;
  constructor(private store: Store<fromAuthReducer.State>) {}
  ngOnInit(): void {
    // this.store
    //   .select(cartSelector.selectCartItems)
    //   .subscribe((items) => (this.cartItemsCount = 0));
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
    this.cartItemsCount$ = this.store.select(cartSelector.selectCartItemsCount);
  }
  onLogoutClick() {
    this.store.dispatch(authActions.logout());
  }
}
