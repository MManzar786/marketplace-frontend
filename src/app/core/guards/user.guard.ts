import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  ROLE_LABEL,
  TOKEN_LABEL,
  USER_LABEL,
  USER_ROLE,
} from 'src/app/utils/constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let role = JSON.parse(localStorage.getItem(USER_LABEL) || '{}')[ROLE_LABEL];
    if (role === USER_ROLE) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
