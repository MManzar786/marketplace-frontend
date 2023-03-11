import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { CartService } from 'src/app/cart/service/cart.service';
import { ProductService } from 'src/app/products/services/product.service';
import * as cartActions from 'src/app/state/cart/cart.action';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}
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
          catchError((error) => of(cartActions.loadCartFailure({ error })))
        )
      )
    )
  );

  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addItemToCart),
      mergeMap((action) =>
        this.cartService.saveCartItems(action.item, action.userId).pipe(
          map(() =>
            cartActions.addItemToCartSuccess({
              item: action.item,
            })
          ),
          catchError((error) => of(cartActions.loadCartFailure({ error })))
        )
      )
    )
  );
}
