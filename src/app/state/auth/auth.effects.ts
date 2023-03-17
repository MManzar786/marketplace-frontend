import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  ROLE_LABEL,
  TOKEN_LABEL,
  USER_ID_LABEL,
} from 'src/app/utils/constants';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action) =>
        this.authService
          .signin(action.credentials.email, action.credentials.password)
          .pipe(
            map((loginSuccessResponse) =>
              AuthActions.loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          localStorage.setItem(TOKEN_LABEL, loginSuccessResponse.token);
          localStorage.setItem(ROLE_LABEL, loginSuccessResponse.role);
          localStorage.setItem(USER_ID_LABEL, loginSuccessResponse.id);
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/auth/sign-in']);
        })
      ),
    { dispatch: false }
  );
}
