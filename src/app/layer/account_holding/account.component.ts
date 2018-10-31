import { Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Holding } from '../../shared/models/holding.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { PolicyService } from '../../shared/services/policy.service';
import { PolicyDetail } from '../../shared/models/policyDetail.model';
import { promise } from 'protractor';
import { Policy } from '../../shared/models/policy.model';
import { Investor } from '../../shared/models/investor.model';
import { Account } from '../../shared/models/account.model';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // declarations
  pending: string[];
  displayedColumns: string[];
  errorMessage: string;
  disableSubmitBtn: boolean;
  policydetail: PolicyDetail = {} as PolicyDetail;
  policyDetailData: MatTableDataSource<Holding>;
  Total = 0;


// constractor
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private policyService: PolicyService ) {
    let RequestId: string;

    activatedRoute.params.subscribe(val => {
      // put the code from `ngOnInit` here
      console.log(val.RequestId);
      this.policydetail = this.policyService.getPolicyDetails();
      this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.holdings);
    });

    console.log('constructor');
    this.displayedColumns = ['position', 'share', 'value', 'totalNumShares', 'uninsured', 'pending', 'insured', 'insure', 'cancel', 'costs'];



    sessionStorage.clear();

    RequestId = this.activatedRoute.snapshot.params['RequestId'];
    const TradingPlatform = this.activatedRoute.snapshot.params['Broker'];

    const sessionRequestId: string = sessionStorage.getItem('RequestId');
    if (sessionRequestId === null || sessionRequestId === undefined) {
      sessionStorage.setItem('RequestId', RequestId);
    }
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    console.log('init method');
    this.policyDetailData.paginator = this.paginator;

    // if (this.policydetail === null) {
    //   this.policydetail = this.policyService.getPolicyDetails();
    // }
  }

  applyFilter(filterValue: string) {
    this.policyDetailData.filter = filterValue.trim().toLowerCase();
  }

  // functions
  // submit button function
  async submit() {
      // console.log('policy  details', this.policydetail);
      // let respCode: string;

      const resp = await this.policyService.savePolicyMovements({...this.policydetail});

      if (resp === '200') {
        // this.router.navigate(['insurance/RequestId/ABCD123/ShareNet']);
        this.policydetail = this.policyService.getPolicyDetails();
        this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.holdings);
      }

      console.log('auto renewal ' + this.policydetail.policy.IsAutoRenewal);
      console.log('total is: ' + this.Total);
  }
  // oln change function
  onChangeValidation(row) {
    this.calculatePremium(row);
  }

  cancelDisable(row): boolean {
    const holding = <Holding>row;
    if (holding.NumberOfSharesToInsure > 0) {
      holding.MovementType = 'BUY';
    }

    if (holding.NumberOfSharesToInsure > 0 || holding.NumberOfSharesToInsure < 0 || holding.InsuredShares <= 0 ) {

      return true;
    }
  }
  insureDisable(row): boolean {
    const holding = <Holding>row;
    if (holding.NumberOfSharesToCancel > 0) {
      holding.MovementType = 'CANCEL';
    }

    if (holding.NumberOfSharesToCancel > 0 || holding.NumberOfSharesToCancel < 0 || holding.UninsuredShares <= 0 ) {
      return true;
    }
  }

  numberToInsureError(row) {
    const holdings = <Holding>row;
    if ( holdings.NumberOfSharesToInsure > holdings.UninsuredShares) {
      this.errorMessage = 'error you can not insure more than your uninsured share';
      console.log(this.errorMessage);
      return true;
    } else if (holdings.NumberOfSharesToInsure  < 0) {
      this.errorMessage = 'error you can not insure less than 0';
      console.log(this.errorMessage);
      return true;
    }
  }

  numberToCancelError(row) {
    const holdings = <Holding>row;
    if ( holdings.NumberOfSharesToCancel > holdings.InsuredShares) {
      this.errorMessage = 'error you can not cancel more than your insured shares';
      console.log(this.errorMessage );
      return true;
      } else if (holdings.NumberOfSharesToCancel < 0) {
      this.errorMessage = 'error you can not cancel less than 0';
      console.log(this.errorMessage );
      return true;
    }
  }

  calculatePremium(row) {
    const holding = <Holding>row;

    if (this.numberToInsureError(row)) {
      holding.Premium = 0;
    } else {
      holding.Premium = holding.StockRate * (holding.StockPrice / 100.00) * holding.NumberOfSharesToInsure;
      this.Total = this.Total + holding.Premium;
    }
  }
}
