import { createReducer, on } from '@ngrx/store';
import { CartItemI, CartStateI } from 'src/app/cart/model/cart.model';
import {
  ERROR_STATUS_LABEL,
  INCREMENT_OPERATOR,
  PENDING_STATUS_LABEL,
  SUCCESS_STATUS_LABEL,
} from 'src/app/utils/constants';
import {
  addItemToCartSuccess,
  loadCartFailure,
  loadCartSuccess,
  removeItemFromCartSuccess,
  updateCartItem,
} from './cart.action';

export const initialState: CartStateI = {
  cartItems: [],
  cartItemsCount: 0,
  error: null,
  status: PENDING_STATUS_LABEL,
};

const _cartReducer = createReducer(
  initialState,
  on(loadCartFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      status: ERROR_STATUS_LABEL,
    };
  }),

  on(loadCartSuccess, (state, { items }) => {
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return {
      ...state,
      cartItems: items,
      cartItemsCount: totalQuantity,
      error: null,
      status: ERROR_STATUS_LABEL,
    };
  }),

  on(addItemToCartSuccess, (state, { item, id }) => {
    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.product.id === item.product.id
    );
    if (existingCartItem) {
      const updatedCartItems = state.cartItems.map((cartItem) => {
        if (cartItem.product.id === item.product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });
      return {
        ...state,
        cartItems: updatedCartItems,
        cartItemsCount: state.cartItemsCount + 1,
        error: null,
        status: SUCCESS_STATUS_LABEL,
      };
    } else {
      let cartItem = updateIdInCart(item, id);
      return {
        ...state,
        cartItems: [...state.cartItems, cartItem],
        cartItemsCount: state.cartItemsCount + 1,
        error: null,
        status: SUCCESS_STATUS_LABEL,
      };
    }
  }),

  on(updateCartItem, (state, { item, quantityOperator }) => {
    const updatedCartItems = state.cartItems.map((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        return {
          ...cartItem,
          item: item.product,
          quantity: item.quantity,
          error: null,
          status: SUCCESS_STATUS_LABEL,
        };
      } else {
        return cartItem;
      }
    });

    return {
      ...state,
      cartItems: updatedCartItems,
      cartItemsCount:
        quantityOperator === INCREMENT_OPERATOR
          ? state.cartItemsCount + 1
          : state.cartItemsCount - 1,
      error: null,
      status: SUCCESS_STATUS_LABEL,
    };
  }),

  on(removeItemFromCartSuccess, (state, { cartItem }) => {
    return {
      ...state,
      cartItems: state.cartItems.filter(
        (item) => item.product.id !== cartItem.product.id
      ),
      cartItemsCount: state.cartItemsCount - cartItem.quantity,
      error: null,
      status: SUCCESS_STATUS_LABEL,
    };
  })
);

export function CartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
function updateIdInCart(cartItem: CartItemI, newId: number): CartItemI {
  return { ...cartItem, id: newId };
}
