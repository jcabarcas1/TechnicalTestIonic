import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private fAuth: AngularFireAuth,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.fAuth.authState.pipe(map(
      auth => {
        if (isNullOrUndefined(auth)) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      }
    ));

  }

}
