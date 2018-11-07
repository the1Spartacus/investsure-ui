import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../shared/services/policy.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms_and_conditions.component.html',
  styleUrls: ['./terms_and_conditions.component.css']
})

export class TermsAndConditionsComponent {
  policyAgreed: boolean;

  constructor(private activatedRoute: ActivatedRoute, private policyService: PolicyService, private router: Router) {

    activatedRoute.params.subscribe(val => {
      console.log('acctive route');
      // put the code from `ngOnInit` here
      console.log(val.RequestId);
      this.policyAgreed = this.policyService.DoesPolicyExist();

      if (this.policyAgreed === true) {
        this.router.navigate(['/insurance/RequestId/:RequestId/:Broker']);
        console.log('terms and conditions ' + this.policyService.DoesPolicyExist());
      }
    });
  }
}
