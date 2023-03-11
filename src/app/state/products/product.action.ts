import { createAction, props } from '@ngrx/store';
import { ProductI } from 'src/app/products/model/product.model';

export const addProduct = createAction(
  '[Products Page] Add Product',
  props<{ data: ProductI }>()
);

export const removeProduct = createAction(
  '[Products Page] Remove Product',
  props<{ id: string }>()
);

export const loadProducts = createAction(
  '[Product Page] Load Products',
  props<{ skip: number; limit: number }>()
);

export const loadProductsSuccess = createAction(
  '[Products API] Product Load Success',
  props<{ products: ProductI[]; totalProductsCount: number }>()
);

export const loadProductsFailure = createAction(
  '[Products API] Product Load Failure',
  props<{ error: string }>()
);
