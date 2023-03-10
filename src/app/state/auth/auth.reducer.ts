import { createReducer, on } from '@ngrx/store';
import { loginFailure, loginSuccess, logout } from './auth.actions';

// TODO
// 'any' must be change to interface
export interface State {
  token: string | null;
  user: any;
  loginError?: string;
}

export const initialState: State = {
  token: null,
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      token: loginSuccessResponse.data.accessToken,
      user: loginSuccessResponse.data,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      token: null,
      user: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: null,
      user: null,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
