import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import * as cartActions from 'src/app/state/cart/cart.action';
import {
  CartItemAddResponseI,
  CartItemDeleteResponseI,
} from 'src/app/cart/model/cart.model';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  loadCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.loadCartRequest),
      switchMap((action) =>
        this.cartService.getCartItemsByUserId(action.userId).pipe(
          map((successResponse: any) =>
            cartActions.loadCartSuccess({
              items: successResponse,
            })
          ),
          catchError((error) => {
            this.toastr.error('Error loading cart');
            return of(cartActions.loadCartFailure({ error }));
          })
        )
      )
    )
  );

  deleteCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.removeItemFromCartRequest),
      mergeMap((action) =>
        this.cartService.deleteCartItemsByCartId(action.cartItem.id).pipe(
          tap(() => {
            this.toastr.success('Item Deleted from cart successfully');
          }),
          map(() =>
            cartActions.removeItemFromCartSuccess({ cartItem: action.cartItem })
          ),
          catchError((error) => {
            this.toastr.error('Error deleting item from cart');
            return of(cartActions.loadCartFailure({ error }));
          })
        )
      )
    )
  );

  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addItemToCart),
      mergeMap((action) =>
        this.cartService.saveCartItems(action.item, action.userId).pipe(
          tap(() => {
            this.toastr.success('Item added to cart successfully');
          }),
          map((response) =>
            cartActions.addItemToCartSuccess({
              item: action.item,
              id: response.cartItem.id,
            })
          ),
          catchError((error) => {
            this.toastr.error('Error adding item to cart');
            return of(cartActions.loadCartFailure({ error }));
          })
        )
      )
    )
  );
}
