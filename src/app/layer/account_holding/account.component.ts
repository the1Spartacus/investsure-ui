import { Component, ViewChild, OnInit  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Holding } from '../../shared/models/holding.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { PolicyService } from '../../shared/services/policy.service';
import { PolicyDetail } from '../../shared/models/policyDetail.model';
import { HoldingCache } from 'src/app/shared/models/holding.cache';
import { isNullOrUndefined } from 'util';
import { policyDetail } from '../../shared/mockData/mockHolding';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // declarations
  // pending: string[];
  displayedColumns: string[];
  errorMessage: string;
  disableSubmitBtn: boolean;
  policydetail: PolicyDetail = {} as PolicyDetail;
  policyDetailData: MatTableDataSource<Holding>;
  Total = 0;
  HoldingsCount: number;
  Counter = 0;
  PolicyAgreed: boolean;
  resp: string;
  // isPolicyAgreed: boolean;
// constractor
  constructor(private activatedRoute: ActivatedRoute, private policyService: PolicyService ) {
    let RequestId: string;

   // activatedRoute.params.subscribe(val => {
      console.log('acctive route');
      // put the code from `ngOnInit` here
     // console.log(val.RequestId);
      this.policydetail = this.policyService.getPolicyDetails();
      this.PolicyAgreed = this.policydetail.PolicyExist;
      this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.holdings);
      this.HoldingsCount = this.policydetail.holdings.length;
   // });

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
  }
  applyFilter(filterValue: string) {
    this.policyDetailData.filter = filterValue.trim().toLowerCase();
  }

  // functions
  // submit button function
  async submit() {
       this.resp = await this.policyService.savePolicyMovements({...this.policydetail});

      if (this.resp === '200') {
        // this.router.navigate(['insurance/RequestId/ABCD123/ShareNet']);
        this.policydetail = this.policyService.getPolicyDetails();
        this.policyDetailData = new MatTableDataSource<Holding>(this.policydetail.holdings);
       }
      this.policyDetailData.paginator = this.paginator;
      console.log('auto renewal ' + this.policydetail.policy.IsAutoRenewal);
      console.log('total is: ' + this.Total);
      this.Total = 0;
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

  AddHoldingHandler(holdingEmpty: boolean) {
    console.log(holdingEmpty);
    console.log(HoldingCache.NewHolding);
    const newHolding: Holding = HoldingCache.NewHolding;
    newHolding.IsNewHolding = true;

    console.log('Validating Num Of Shares:: ', newHolding.NumberOfShares);
    if (isNullOrUndefined(newHolding.NumberOfShares) || isNaN(newHolding.NumberOfShares)) {
        console.log('Going in here');
        return;
    }

    const index: number = this.findHolding(newHolding);

    if (index > -1) {
      console.log('Holding Exist');
      this.policydetail.holdings[index].NumberOfShares += +newHolding.NumberOfShares;
      this.policydetail.holdings[index].UninsuredShares += +newHolding.NumberOfShares;
      this.policydetail.holdings[index].Value += +newHolding.NumberOfShares * newHolding.StockPrice;
    } else {

      console.log('Holding Does Not Exist');
      newHolding.Premium = 0;
      newHolding.NumberOfSharesToInsure = 0;
      newHolding.NumberOfSharesToCancel = 0;
      newHolding.PendingShares = 0;
      newHolding.InsuredShares = 0;
      newHolding.NumberOfShares = +newHolding.NumberOfShares;
      newHolding.UninsuredShares = +newHolding.UninsuredShares;
      newHolding.HoldingNumber = 0;
      newHolding.Value = newHolding.NumberOfShares * newHolding.StockPrice;
      this.policyDetailData.data.push(newHolding);
      this.policyDetailData = new MatTableDataSource<Holding>(this.policyDetailData.data);
      this.HoldingsCount = this.policydetail.holdings.length;
    }
    console.log(this.policyDetailData.data);
    this.policyDetailData.paginator = this.paginator;
  }


  findHolding(_holding: Holding) {
    for (let index = 0; index < this.policydetail.holdings.length; index++) {
      if (this.policydetail.holdings[index].ISINCode === _holding.ISINCode &&
          this.policydetail.holdings[index].IsNewHolding === _holding.IsNewHolding) {
        return index;
      }
    }

    return -1;
  }
   policyWordingHandler($event) {
    this.PolicyAgreed = $event;
  }
}
