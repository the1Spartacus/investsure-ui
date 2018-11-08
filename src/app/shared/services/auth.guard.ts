import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['account/RequestId/ABCD123/ShareNet']);
    return false;
  }
}
