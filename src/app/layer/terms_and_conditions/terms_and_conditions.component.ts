import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../shared/services/policy.service';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../shared/services/account.service';
import { PolicyCache } from 'src/app/shared/policy.cache';


@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms_and_conditions.component.html',
  styleUrls: ['./terms_and_conditions.component.css']
})

export class TermsAndConditionsComponent {
  policyAgreed: boolean;
  RequestId: string;
  Broker: string;

  constructor(private activatedRoute: ActivatedRoute,
              private policyService: PolicyService,
              private router: Router,
              private accountService: AccountService) {

    activatedRoute.params.subscribe(val => {

      console.log('acctive route');

      console.log(val.RequestId);
      this.RequestId = val.RequestId;
      this.Broker = val.Broker;

      this.accountService.AuthenticateRequest(val.RequestId, val.Broker)
      .subscribe( data => {
          console.log(' verify account ', data);
          const isValidRequest = data.Data.IsValidRequest;
          if ( isValidRequest) {
            sessionStorage.setItem('req_token', data.Data.RequestToken);
            this.policyService.getPolicyDetails(val.RequestId, val.Broker)
            .subscribe(policyResponse => {
              // console.log(' policy details ', policyDetails);
              PolicyCache.addItem({RequestId: val.RequestId, DataItem: policyResponse.Data});
            });
          } else {
            //  route to an unathorized page
            this.router.navigate(['/unauthorized']);
          }
      },
       error => {
        console.log(' verify account error', error);
       });
    });

      // this.policyAgreed = this.policyService.DoesPolicyExist();

  }

  accept() {
        this.router.navigate(['/insurance/RequestId/' + this.RequestId + '/' + this.Broker]);
        // console.log('terms and conditions ' + this.policyService.DoesPolicyExist());
  }

}
