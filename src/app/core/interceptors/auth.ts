import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TOKEN_LABEL, USER_LABEL } from 'src/app/utils/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem(USER_LABEL) || '{}')[
      TOKEN_LABEL
    ];
    const modified = request.clone(
      token
        ? {
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
    return next.handle(modified);
  }
}
