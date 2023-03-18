import { createReducer, on } from '@ngrx/store';
import { loginSuccessResponseI } from 'src/app/auth/model/auth.model';
import { loginFailure, loginSuccess, logout } from './auth.actions';

// TODO
// 'any' must be change to interface
export interface State {
  token: string | null;
  user: loginSuccessResponseI | null;
  loginError?: string;
  loginState: boolean;
}

export const initialState: State = {
  token: null,
  user: null,
  loginState: false,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      token: loginSuccessResponse.token,
      user: loginSuccessResponse,
      loginState: true,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      token: null,
      user: null,
      loginState: false,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: null,
      user: null,
      loginState: false,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
