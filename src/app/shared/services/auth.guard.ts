import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isValidRequest:  boolean;
  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute ) {

                this.activatedRoute.params.subscribe(val => {
                  this.accountService.AuthenticateRequest(val.RequestId, val.Broker)
                  .subscribe( data => {
                      console.log(' verify account ', data);
                      this.isValidRequest = data.Data.IsValidRequest;
                      sessionStorage.setItem('req_token', data.Data.RequestToken);
                  },
                   error => {
                    console.log(' verify account error', error);
                   });
                });
              }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isValidRequest === false) {
      return true;
    } else {
        this.router.navigate(['**']);
        return false;
    }
  }
}
