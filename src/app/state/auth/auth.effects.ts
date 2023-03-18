import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TOKEN_LABEL, USER_LABEL } from 'src/app/utils/constants';
import * as AuthActions from './auth.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action) =>
        this.authService
          .signin(action.credentials.email, action.credentials.password)
          .pipe(
            tap(() => {
              this.toastr.success('Welcome to Marketplace!');
            }),
            map((loginSuccessResponse) =>
              AuthActions.loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => {
              this.toastr.error('Login Failed !');
              return of(AuthActions.loginFailure({ error }));
            })
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
          localStorage.setItem(
            USER_LABEL,
            JSON.stringify(loginSuccessResponse)
          );
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
