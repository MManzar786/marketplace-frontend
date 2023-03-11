import { createReducer, on } from '@ngrx/store';
import { ProductStateI } from 'src/app/products/model/product.model';
import {
  ERROR_STATUS_LABEL,
  PENDING_STATUS_LABEL,
  SUCCESS_STATUS_LABEL,
} from 'src/app/utils/constants';
import {
  loadProductsByCategory,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.action';

export const initialState: ProductStateI = {
  products: [],
  totalProductsCount: 0,
  error: null,
  status: PENDING_STATUS_LABEL,
};
const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products, totalProductsCount }) => {
    return {
      ...state,
      products: products,
      totalProductsCount: totalProductsCount,
      error: null,
      status: SUCCESS_STATUS_LABEL,
    };
  }),

  on(loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      status: ERROR_STATUS_LABEL,
    };
  })
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
