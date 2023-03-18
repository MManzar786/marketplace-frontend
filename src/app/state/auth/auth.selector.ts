import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectState = createSelector(
  selectAuthState,
  (state) => state.loginState
);
