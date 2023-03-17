import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectRole = createSelector(
  selectAuthState,
  (state) => state.role
);
