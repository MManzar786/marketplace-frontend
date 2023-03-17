import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import * as ProductActions from 'src/app/state/products/product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap((action) =>
        this.productService.getAllProducts(action.pageNo, action.limit).pipe(
          map((successResponse: any) =>
            ProductActions.loadProductsSuccess({
              products: successResponse.data,
              totalProductsCount: successResponse.totalElements,
            })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadProductByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsByCategory),
      switchMap((action) =>
        this.productService
          .getProductsByCategory(action.pageNo, action.limit, action.category)
          .pipe(
            map((successResponse: any) =>
              ProductActions.loadProductsSuccess({
                products: successResponse.data,
                totalProductsCount: successResponse.totalElements,
              })
            ),
            catchError((error) =>
              of(ProductActions.loadProductsFailure({ error }))
            )
          )
      )
    )
  );

  loadProductBySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.seacrhProductsRequest),
      switchMap((action) =>
        this.productService
          .seacrhProducts(action.skip, action.limit, action?.searchString)
          .pipe(
            map((successResponse: any) =>
              ProductActions.seacrhProducts({
                products: successResponse.data,
                totalProductsCount: successResponse.totalElements,
              })
            ),
            catchError((error) =>
              of(ProductActions.loadProductsFailure({ error }))
            )
          )
      )
    )
  );
}
