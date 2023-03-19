import { createAction, props } from '@ngrx/store';
import { CartItemI } from 'src/app/cart/model/cart.model';

export const addItemToCart = createAction(
  '[Cart Page] Add item to cart',
  props<{ item: CartItemI; userId: number }>()
);

export const addItemToCartSuccess = createAction(
  '[Cart Page] Sucess Add item to cart',
  props<{ item: CartItemI; id: number }>()
);

export const addItemToCartFailure = createAction(
  '[Cart Page] Failure Add item to cart',
  props<{ error: string }>()
);

export const updateCartItem = createAction(
  '[Cart Page] Update item to cart',
  props<{ id: number; item: CartItemI; quantityOperator: string }>()
);

export const removeItemFromCartRequest = createAction(
  '[Cart Page] Remove item from cart',
  props<{ cartItem: CartItemI }>()
);

export const removeItemFromCartSuccess = createAction(
  '[Cart Page] Remove item from cart Success',
  props<{ cartItem: CartItemI }>()
);

export const removeItemFromCartFailure = createAction(
  '[Cart Page] Remove item from cart Failure',
  props<{ error: string }>()
);

export const loadCartRequest = createAction(
  '[Cart Page] Request Load items to cart',
  props<{ userId: number }>()
);

export const loadCartSuccess = createAction(
  '[Cart Page] Load items to cart',
  props<{ items: CartItemI[] }>()
);

export const loadCartFailure = createAction(
  '[Cart Page] Failure Load items to cart',
  props<{ error: string }>()
);
