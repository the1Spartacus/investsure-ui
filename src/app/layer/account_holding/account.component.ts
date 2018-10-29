import { Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Holding } from '../../shared/models/holding.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { EventEmitter } from 'protractor';
import { PolicyService } from '../../shared/services/policy.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

// constractor
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private policyService: PolicyService ) {
    let RequestId: string;

    sessionStorage.clear();

    RequestId = this.activatedRoute.snapshot.params['RequestId'];
    const TradingPlatform = this.activatedRoute.snapshot.params['Broker'];

    const sessionRequestId: string = sessionStorage.getItem('RequestId');
    if (sessionRequestId === null || sessionRequestId === undefined) {
      sessionStorage.setItem('RequestId', RequestId);
    }
  }
  // declarations
  pending: string[];
  displayedColumns: string[] = ['position', 'share', 'value', 'totalNumShares', 'uninsured', 'pending', 'insured', 'insure', 'cancel', 'costs'];
  errorMessage: string;
  error1: boolean;
  error2: boolean;
  disableSubmitBtn: boolean;
  policydetail = this.policyService.getPolicyDetails();
  policyDetailData = new MatTableDataSource(this.policydetail.holdings);
  Total = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.policyDetailData.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.policyDetailData.filter = filterValue.trim().toLowerCase();
  }

  OnAutoRenewalChange() {

  }

  // functions
  // submit button function
  submit() {
      // console.log('policy  details', this.policydetail);
      this.policyService.savePolicyMovements(this.policydetail);

      // Check service response for HTTP 200
      // If successful, redirect to main page with original parameters
      this.router.navigate(['/insurance/RequestId/ABCD1234/ShareNet']);

      console.log('total is: ' + this.Total);
  }
  // oln change function
  onChangeValidation(row) {
    this.calculatePremium(row);
    this.error1 = this.numberToInsureError(row);
    this.error2 = this.numberToCancelError(row);
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
    this.disableSubmitBtn = false;
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
    this.disableSubmitBtn = false;
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
