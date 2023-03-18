import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const modified = request.clone(
      token
        ? {
            setHeaders: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json',
              // 'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              // 'Access-Control-Allow-Headers':
              //   'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        : {}
    );
    return next.handle(modified);
  }
}
