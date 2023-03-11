import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductStateI } from 'src/app/products/model/product.model';

export const selectAuthState = createFeatureSelector<ProductStateI>('product');

export const selectProducts = createSelector(
  selectAuthState,
  (state) => state.products
);
export const selectTotalCount = createSelector(
  selectAuthState,
  (state) => state.totalProductsCount
);
