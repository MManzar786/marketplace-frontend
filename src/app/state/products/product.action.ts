import { createAction, props } from '@ngrx/store';
import { ProductI } from 'src/app/products/models/product.model';

export const addProduct = createAction(
  '[Products Page] Add Product',
  props<{ data: ProductI }>()
);

export const removeProduct = createAction(
  '[Products Page] Remove Product',
  props<{ id: string }>()
);

// For products homepage
export const loadProducts = createAction(
  '[Product Page] Load Products',
  props<{ pageNo: number; limit: number; category?: number }>()
);

export const loadProductsByCategory = createAction(
  '[Product Page] Load Products By Category',
  props<{ pageNo: number; limit: number; category: number }>()
);

export const loadProductsSuccess = createAction(
  '[Products API] Product Load Success',
  props<{ products: ProductI[]; totalProductsCount: number }>()
);

export const loadProductsFailure = createAction(
  '[Products API] Product Load Failure',
  props<{ error: string }>()
);

// For Search
export const seacrhProductsRequest = createAction(
  '[Product Page] Request Load Products By Search',
  props<{
    skip: number;
    limit: number;
    searchString: string;
  }>()
);

export const seacrhProducts = createAction(
  '[Product Page] Load Products By Search',
  props<{ products: ProductI[]; totalProductsCount: number }>()
);
