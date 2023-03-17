import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[SignIn Component] Login Success',
  props<{ loginSuccessResponse: any }>()
);

export const loginFailure = createAction(
  '[SignIn Component] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
