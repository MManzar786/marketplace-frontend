import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN_LABEL } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem(TOKEN_LABEL)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
