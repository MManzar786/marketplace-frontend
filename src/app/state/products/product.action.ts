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
  props<{ skip: number; limit: number; category?: string }>()
);

export const loadProductsByCategory = createAction(
  '[Product Page] Load Products By Category',
  props<{ skip: number; limit: number; category: string }>()
);

export const loadProductsSuccess = createAction(
  '[Products API] Product Load Success',
  props<{ products: ProductI[]; totalProductsCount: number }>()
);

export const loadProductsFailure = createAction(
  '[Products API] Product Load Failure',
  props<{ error: string }>()
);

export const seacrhProductsRequest = createAction(
  '[Product Page] Request Load Products By Search',
  props<{
    skip: number;
    limit: number;
    searchString: string;
    selectedCategory?: string;
  }>()
);

export const seacrhProducts = createAction(
  '[Product Page] Load Products By Search',
  props<{ products: ProductI[]; totalProductsCount: number }>()
);
