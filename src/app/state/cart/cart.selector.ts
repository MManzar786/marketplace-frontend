import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartStateI } from 'src/app/cart/model/cart.model';

export const selectCartState = createFeatureSelector<any>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.cartItems
);

export const selectCartItemsCount = createSelector(
  selectCartState,
  (state) => state.cartItemsCount
);
